 import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "./ChatBox.css";
import { useParams } from "react-router-dom";
import axios from "axios";

// Connect to your Socket.io server
const socket = io("https://afsanaproject-production.up.railway.app");

const ChatBox = ({ userId }) => {
  const { receiverId } = useParams(); // Dynamic from route
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [offset, setOffset] = useState(0);
  const messageEndRef = useRef(null);
  // Format message object from server
  const formatMessage = (msg) => ({
    senderId: msg.senderId || msg.sender_id,
    content: msg.content || msg.message,
    timestamp: msg.timestamp,
  });   

  // Register and join room on mount
  useEffect(() => {
    if (userId && receiverId) {
      socket.emit("registerUser", userId);
      socket.emit("joinRoom", { user_id: userId, other_user_id: receiverId });

      const chatId = [userId, receiverId].sort((a, b) => a - b).join("_");
      socket.emit("getChatHistory", {
        chatId,
        limit: 50,
        offset: 0,
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [userId, receiverId]);

  // Listen for socket events
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) =>
        Array.isArray(msg)
          ? [...prev, ...msg.map(formatMessage)]
          : [...prev, formatMessage(msg)]
      );
    });

    socket.on("chatHistory", ({ messages: oldMessages }) => {
      const formatted = oldMessages.map(formatMessage);
    //   console.log(formatMessage)
      setMessages((prev) => [...formatted, ...prev]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("chatHistory");
    };
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message (no local push)
 const sendMessage = () => {
  if (!message.trim()) return;

  const newMsg = {
    sender_id: userId,
    receiver_id: receiverId,
    message,
  };

  socket.emit("sendMessage", newMsg);
  setMessage(""); // clear input
};

  // Load older messages
  const loadOlderMessages = () => {
    const chatId = [userId, receiverId].sort((a, b) => a - b).join("_");
    const nextOffset = offset + 50;

    socket.emit("getChatHistory", {
      chatId,
      limit: 50,
      offset: nextOffset,
    });

    setOffset(nextOffset);
  };
//  console.log("message",messages)
  return (
    <div className="chat-container">
      <div className="chat-header">{userId==1? <span>Chat with admin</span>: <span>Chat with User {receiverId}</span> } </div>
{/* 
      <button onClick={loadOlderMessages} className="load-more">
        Load Older Messages
      </button> */}

      <div className="chat-messages">
        {messages.map((m, i) => (
            
          <div
            key={i}
            className={`message ${
              m.senderId == userId ? "sent" : "received"
            }`}
          >{console.log(m.senderId)}
            {m.content}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;

 import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "./ChatBox.css";
import { useParams } from "react-router-dom";
import axios from "axios";

// Connect to your Socket.io server
const socket = io("http://192.168.1.21:3002");

const ChatBox = ({ userId }) => {
  const { receiverId } = useParams(); // Dynamic from route
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);

  // Register user on mount
  useEffect(() => {
    socket.emit("registerUser", userId); // Register user socket
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      console.log("Received from socket:", msg);
      // Handle both single message and array of messages
      setMessages((prev) =>
        Array.isArray(msg)
          ? [...prev, ...msg.map(formatMessage)]
          : [...prev, formatMessage(msg)]
      );
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Normalize message shape
  const formatMessage = (msg) => ({
    senderId: msg.senderId || msg.sender_id,
    content: msg.content || msg.message,
  });

  // Auto-scroll
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMsg = {
      sender_id: userId,
      receiver_id: receiverId,
      message,
    };

    // Send via socket
    socket.emit("sendMessage", newMsg);

    // Add to local state
    setMessages((prev) => [
      ...prev,
      { senderId: userId, content: message },
    ]);
    setMessage("");

    // Save in DB
    try {
      const res = await axios.post(
        "http://192.168.1.21:3002/api/chat/send",
        newMsg
      );
      console.log(res.data);
    } catch (error) {
      console.error("Message save error:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat with {receiverId}</div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`message ${
              m.senderId === userId ? "sent" : "received"
            }`}
          >
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

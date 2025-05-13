import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "./ChatBox.css";
import { useParams } from "react-router-dom";
import ChatList from "./ChatList";

const ChatBox = ({ userId }) => {
  const { receiverId } = useParams(); // Dynamic from route
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [socket, setSocket] = useState(null);
  const messageEndRef = useRef(null);

  // Format message object from server
  const formatMessage = (msg) => ({
    senderId: msg.senderId || msg.sender_id,
    content: msg.content || msg.message,
    timestamp: msg.timestamp,
  });

  // Connect and join room when userId & receiverId available
  useEffect(() => {
    if (userId && receiverId) {
      const newSocket = io("https://afsanaproject-production.up.railway.app");
      setSocket(newSocket);

      newSocket.emit("registerUser", userId);
      newSocket.emit("joinRoom", {
        user_id: userId,
        other_user_id: receiverId,
      });

      const chatId = [userId, receiverId].sort((a, b) => a - b).join("_");
      newSocket.emit("getChatHistory", {
        chatId,
        limit: 50,
        offset: 0,
      });

      return () => newSocket.disconnect();
    }
  }, [userId, receiverId]);

  // Listen for incoming messages and history
  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) =>
        Array.isArray(msg)
          ? [...prev, ...msg.map(formatMessage)]
          : [...prev, formatMessage(msg)]
      );
    });

    socket.on("chatHistory", ({ messages: oldMessages }) => {
      const formatted = oldMessages.map(formatMessage);
      setMessages((prev) => [...formatted, ...prev]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("chatHistory");
    };
  }, [socket]);

  // Scroll to bottom on new message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = () => {
    if (!message.trim() || !socket) return;

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
    if (!socket) return;
    const chatId = [userId, receiverId].sort((a, b) => a - b).join("_");
    const nextOffset = offset + 50;

    socket.emit("getChatHistory", {
      chatId,
      limit: 50,
      offset: nextOffset,
    });

    setOffset(nextOffset);
  };

  return (
    <div style={{display:"flex"}}>
      <div>{userId==1&&<ChatList userId={userId}/>}</div>
    <div className="chat-container">
      <div className="chat-header">
        {userId != 1 ? (
          <span>Chat with admin</span>
        ) : (
          <span>Chat with {localStorage.getItem("receiver_name")}</span>
        )}
      </div>

      {/* Uncomment if you want to load older messages */}
      {/* <button onClick={loadOlderMessages} className="load-more">
        Load Older Messages
      </button> */}

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`message ${m.senderId == userId ? "sent" : "received"}`}
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
    </div>
  );
};

export default ChatBox;

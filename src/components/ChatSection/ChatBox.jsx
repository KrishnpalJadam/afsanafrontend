import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "./ChatBox.css";
import { useParams } from "react-router-dom";
import ChatList from "./ChatList";

const ChatBox = ({ userId }) => {
  const { receiverId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [offset, setOffset] = useState(0);
  const socketRef = useRef(null);
  const messageEndRef = useRef(null);

  const formatMessage = (msg) => ({
    id: msg._id || `${msg.senderId || msg.sender_id}-${msg.timestamp}`,
    senderId: msg.senderId || msg.sender_id,
    content: msg.content || msg.message,
    timestamp: msg.timestamp,
  });

  // Avoid duplicates by message ID
  const addUniqueMessages = (incomingMessages) => {
    setMessages((prev) => {
      const existingIds = new Set(prev.map((m) => m.id));
      const uniqueMessages = incomingMessages.filter((m) => !existingIds.has(m.id));
      return [...prev, ...uniqueMessages];
    });
  };

  useEffect(() => {
    if (userId && receiverId) {
      if (socketRef.current) socketRef.current.disconnect();

      const socket = io("https://afsana-backend-production.up.railway.app", {
        forceNew: true,
      });

      socketRef.current = socket;
      setMessages([]);
      setOffset(0);

      socket.emit("registerUser", userId);
      socket.emit("joinRoom", {
        user_id: userId,
        other_user_id: receiverId,
      });

      const chatId = [userId, receiverId].sort((a, b) => a - b).join("_");
      socket.emit("getChatHistory", {
        chatId,
        limit: 50,
        offset: 0,
      });

      return () => socket.disconnect();
    }
  }, [userId, receiverId]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handleReceiveMessage = (msg) => {
      const formatted = Array.isArray(msg)
        ? msg.map(formatMessage)
        : [formatMessage(msg)];

      // Add only messages from others
      const filtered = formatted.filter((m) => m.senderId !== userId);
      addUniqueMessages(filtered);
    };

    const handleChatHistory = ({ messages: oldMessages }) => {
      const formatted = oldMessages.map(formatMessage);
      addUniqueMessages(formatted);
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("chatHistory", handleChatHistory);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("chatHistory", handleChatHistory);
    };
  }, [userId, receiverId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // const sendMessage = () => {
  //   const socket = socketRef.current;
  //   if (!message.trim() || !socket) return;

  //   const newMsg = {
  //     sender_id: userId,
  //     receiver_id: receiverId,
  //     message,
  //     timestamp: new Date().toISOString(),
  //   };

  //   socket.emit("sendMessage", newMsg);
  //   setMessage("");
  // };

  const sendMessage = () => {
  const socket = socketRef.current;
  if (!message.trim() || !socket) return;

  const newMsg = {
    sender_id: userId,
    receiver_id: receiverId,
    message,
    timestamp: new Date().toISOString(),
  };

  // Emit to server
  socket.emit("sendMessage", newMsg);

  // Optimistic UI update
  const formatted = {
    id: `${userId}-${newMsg.timestamp}`,
    senderId: userId,
    content: newMsg.message,
    timestamp: newMsg.timestamp,
  };

  setMessages((prev) => [...prev, formatted]);
  setMessage("");
};

  const loadOlderMessages = () => {
    const socket = socketRef.current;
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
    <div className="p-2" style={{ display: "flex" }}>
      <div><ChatList userId={userId} /></div>
      <div className="chat-container">
        <div className="chat-header">
          {userId == 1 ? (
            <span>Chat with admin</span>
          ) : (
            <span>Chat with {localStorage.getItem("receiver_name")}</span>
          )}
        </div>

        <div className="chat-messages">
          {messages.map((m, i) => (
            <div
              key={m.id}
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

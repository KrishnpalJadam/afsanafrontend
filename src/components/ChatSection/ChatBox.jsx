import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "./ChatBox.css";
import { useParams } from "react-router-dom";
import ChatList from "./ChatList";

const ChatBox = ({ userId }) => {
  const { receiverId } = useParams(); // from route
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

  // Connect socket and join room when userId & receiverId change
  useEffect(() => {
    if (userId && receiverId) {
      // Clean up previous socket
      if (socket) {
        socket.emit("leaveRoom", {
          user_id: userId,
          other_user_id: receiverId,
        });
        socket.disconnect();
      }

      // Reset state
      setMessages([]);
      setOffset(0);

      const newSocket = io("https://ssknf82q-3001.inc1.devtunnels.ms", {
        forceNew: true,
      });
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

      return () => newSocket.disconnect(); // cleanup
    }
  }, [userId, receiverId]);

  // Listen to socket events
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

  // Scroll to bottom on message update
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
    setMessage("");
  };

  // Load older messages (optional)
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
    <div style={{ display: "flex" }}>
      <div> <ChatList userId={userId} /></div>
      <div className="chat-container">
        <div className="chat-header">
          {userId == 1 ? (
            <span>Chat with admin</span>
          ) : (
            <span>Chat with {localStorage.getItem("receiver_name")}</span>
            //  <span></span>
          )}
        </div>

        {/* Uncomment if needed */}
        {/* <button onClick={loadOlderMessages} className="load-more">Load Older Messages</button> */}

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

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChatBox.css";

const ChatHistory = ({ userId }) => {
  const [chatUsers, setChatUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      const res = await axios.get(`/api/chats/${userId}`);
      setChatUsers(res.data);
    };
    fetchChats();
  }, [userId]);

  const openChat = (otherUserId) => {
    navigate(`/chat/${otherUserId}`);
  };

  return (
    <div className="chat-history-container">
      <h4>Previous Chats</h4>
      <ul className="chat-user-list">
        {chatUsers?.map((chat, i) => (
          <li key={i} className="chat-user-item" onClick={() => openChat(chat._id)}>
            <div><strong>User:</strong> {chat._id}</div>
            <div className="last-msg">{chat.lastMessage.content}</div>
            <div className="timestamp">{new Date(chat.lastMessage.timestamp).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory;

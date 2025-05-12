 import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../interceptors/axiosInterceptor";

const ChatList = ({ userId }) => {
  const [chatList, setChatList] = useState([]);
  const [userDetails, setUserDetails] = useState({}); // State to store user details (name and id)
  const navigate = useNavigate();

  // Fetch chat list on component mount
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await axios.get(`http://192.168.1.21:3002/api/chats/getChatList/${userId}`);
        if (response.data.success) {
          setChatList(response.data.chatList);

          // Fetch user details (name and id) for each chat
          const details = {};
          for (let chat of response.data.chatList) {
            const user = await getUserDetails(chat.chatId);
            details[chat.chatId] = user;
          }
          setUserDetails(details);
        }
      } catch (err) {
        console.error("Error fetching chat list:", err.message);
      }
    };

    fetchChatList();
  }, [userId]);

  // Function to fetch user details (full_name and id) based on chatId
  const getUserDetails = async (chatId) => {
    let [first, second] = chatId.split("_");
    first = parseInt(first);
    second = parseInt(second);

    try {
      const response = await api.get(`auth/getUser/${second}`); // Fetch user by receiverId (second part of chatId)
      if (response.data.user) {
        return { full_name: response.data.user.full_name, id: response.data.user.id };
      }
    } catch (err) {
      console.error("Error fetching user data:", err.message);
      return { full_name: "Unknown User", id: "Unknown ID" };
    }
  };

  const openChat = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="chat-list">
      <h3>Your Chats</h3>
      {chatList.length > 0 ? (
        chatList.map((chat, index) => (
          <div key={index} className="chat-item" onClick={() => openChat(userDetails[chat.chatId]?.id)}>
            {/* Display user full name and id */}
            <p>Chat with: {userDetails[chat.chatId]?.full_name || "Loading..."}</p>
            
            <p>Last Message Time: {new Date(chat.lastMessageTime).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No chats available</p>
      )}
    </div>
  );
};

export default ChatList;

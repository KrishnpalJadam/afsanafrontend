 import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../interceptors/axiosInterceptor";
import "./ChatBox.css"; // Make sure to import the CSS file

const ChatList = ({ userId }) => {
  const [chatList, setChatList] = useState([]);
  const [userDetails, setUserDetails] = useState({}); // State to store user details (name, id, photo)
  const navigate = useNavigate();

  // Fetch chat list on component mount
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await axios.get(`https://afsanaproject-production.up.railway.app/api/chats/getChatList/${userId}`);
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

  // Function to fetch user details (full_name, id, and photo) based on chatId
  const getUserDetails = async (chatId) => {
    let [first, second] = chatId.split("_");
    first = parseInt(first);
    second = parseInt(second);

    try {
      const response = await api.get(`auth/getUser/${second}`); // Fetch user by receiverId (second part of chatId)
      if (response.data.user) {
        return { full_name: response.data.user.full_name, id: response.data.user.id, profile_photo: response.data.user.photo };
      }
    } catch (err) {
      console.error("Error fetching user data:", err.message);
      return { full_name: "Unknown User", id: "Unknown ID", profile_photo: "" };
    }
  };

  const openChat = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div >
      <h3>Your Chats</h3>
      {chatList.length > 0 ? (
        chatList.map((chat, index) => (
          <div
            key={index}
            className="chat-item"
            onClick={() => {
              localStorage.setItem("receiver_name", userDetails[chat.chatId]?.full_name);
              openChat(userDetails[chat.chatId]?.id);
            }}
          >
            {/* Profile image with fallback */}
            <img
              src={userDetails[chat.chatId]?.profile_photo || "https://via.placeholder.com/50"}
              alt="Profile"
              className="profile-img"
              crossOrigin=""
            />
            <div className="chat-details">
              <p className="user-name">{userDetails[chat.chatId]?.full_name || "Loading..."}</p>
              <p className="last-message-time">{new Date(chat.lastMessageTime).toLocaleString()}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No chats available</p>
      )}
    </div>
  );
};

export default ChatList;

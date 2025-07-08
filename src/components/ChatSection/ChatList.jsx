import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../interceptors/axiosInterceptor";
import "./ChatBox.css"; // Make sure to import the CSS file
import BASE_URL from "../../Config";

const ChatList = ({ userId }) => {
  const [chatList, setChatList] = useState([]);
  const [userDetails, setUserDetails] = useState({}); // State to store user details (name, id, photo)
  const [counselors, setCounselors] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("login");

  // Fetch chat list on component mount
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await axios.get(
          `https://afsana-backend-production.up.railway.app/api/chats/getChatList/${userId}`
        );
        if (response.data.success) {
          console.log("chatList", response.data.chatList)
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

  // Fetch counselor list
  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const res = await api.get(`${BASE_URL}auth/getusersByRole/counselor`);
        console.log(res.data)
        setCounselors(res.data); // Store counselors data
      } catch (err) {
        console.error("Failed to fetch counselors", err);
      }
    };

    fetchCounselors();
  }, []);

  // Function to fetch user details (full_name, id, and photo) based on chatId
  const getUserDetails = async (chatId) => {
    let [first, second] = chatId.split("_");
    first = parseInt(first);
    second = parseInt(second);
    let id1 = ""
    if (userId == first) {
      id1 = second
    }
    else {
      id1 = first
    }

    try {
      const response = await api.get(`auth/getUser/${id1}`); // Fetch user by receiverId (second part of chatId)
      if (response.data.user) {
        return {
          full_name: response.data.user.full_name,
          id: response.data.user.id,
          profile_photo: response.data.user.photo,
        };
      }
    } catch (err) {
      console.error("Error fetching user data:", err.message);
      return { full_name: "Unknown User", id: "Unknown ID", profile_photo: "" };
    }
  };

  const openChat = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  const handleCounselorSelect = (e) => {
    const counselorId = e.target.value;
    if (counselorId) {
      const selectedCounselor = counselors.find(
        (counselor) => counselor.id === parseInt(counselorId)
      );
      // You can now open chat with the selected counselor
      if (selectedCounselor) {
        // console.log(selectedCounselor)
        localStorage.setItem("receiver_name", selectedCounselor?.full_name);
        openChat(`${selectedCounselor?.id}`);
      }
      else {
        openChat("1");
      }
    }
  };

  return (
    <div className="container p-4">
      <h3>Your Chats</h3>
      {/* Counselor Select dropdown */}
      <div>
        {role === "student" && (
          <div className="counselor-select">
            <label htmlFor="counselor-select">Choose Admin or Counselor to Chat:</label>
            <select id="counselor-select" onChange={handleCounselorSelect}>
              <option value="">Select to chat</option>
              <option value="1">Admin</option>
              {counselors.length > 0 ? (
                counselors.map((counselor) => (
                  <option key={counselor.id} value={counselor.id}>
                    {counselor.full_name}
                  </option>
                ))
              ) : (
                <option disabled>Loading counselors...</option>
              )}
            </select>
          </div>
        )}
      </div>


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
           
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnBfB52cT5We6HCyYO5QMjSNP1sYzeelLDJloXKKhBQSntRowtvMNsLEeJ0yzUAOtGA1g&usqp=CAU"
              alt="Profile"
              className="profile-img"
              crossorigin=""
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

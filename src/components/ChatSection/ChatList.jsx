// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import api from "../../interceptors/axiosInterceptor";
// import "./ChatBox.css"; // Make sure to import the CSS file
// import BASE_URL from "../../Config";

// const ChatList = ({ userId }) => {
//   const [chatList, setChatList] = useState([]);
//   const [userDetails, setUserDetails] = useState({}); // State to store user details (name, id, photo)
//   const [counselors, setCounselors] = useState([]);
//    const [ student , setStudent] = useState ([])
//   const navigate = useNavigate();
//   const role = localStorage.getItem("login");

//   // Fetch chat list on component mount
//   useEffect(() => {
//     const fetchChatList = async () => {
//       try {
//         const response = await axios.get(
//           // `https://afsana-backend-production.up.railway.app/api/chats/getChatList/${userId}`
//           `${BASE_URL}chats/getChatList/${userId}`

//         );
//         if (response.data.success) {
//           console.log("chatList", response.data.chatList)
//           setChatList(response.data.chatList);

//           // Fetch user details (name and id) for each chat
//           const details = {};
//           for (let chat of response.data.chatList) {
//             const user = await getUserDetails(chat.chatId);
//             details[chat.chatId] = user;
//           }
//           setUserDetails(details);
//         }
//       } catch (err) {
//         console.error("Error fetching chat list:", err.message);
//       }
//     };

//     fetchChatList();
//   }, [userId]);

//   // Fetch counselor list
//   useEffect(() => {
//     const fetchCounselors = async () => {
//       try {
//         const res = await api.get(`${BASE_URL}auth/getusersByRole/counselor`);
//         console.log(res.data)
//         setCounselors(res.data); // Store counselors data
//       } catch (err) {
//         console.error("Failed to fetch counselors", err);
//       }
//     };

//     fetchCounselors();
//   }, []);
//    useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const counselorId = localStorage.getItem("counselor_id"); // or sessionStorage if you're using that
//         if (!counselorId) {
//           console.error("Counselor ID not found in localStorage");
//           return;
//         }

//         const res = await api.get(`${BASE_URL}auth/getAssignedStudents/${counselorId}`);
//         console.log("Fetched students:", res.data);
//         setStudent(res.data); // Store student data
//       } catch (err) {
//         console.error("Failed to fetch assigned students", err);
//       }
//     };

//     fetchStudent();
//   }, []);

//   // Function to fetch user details (full_name, id, and photo) based on chatId
//   const getUserDetails = async (chatId) => {
//     let [first, second] = chatId.split("_");
//     first = parseInt(first);
//     second = parseInt(second);
//     let id1 = ""
//     if (userId == first) {
//       id1 = second
//     }
//     else {
//       id1 = first
//     }

//     try {
//       const response = await api.get(`auth/getUser/${id1}`); // Fetch user by receiverId (second part of chatId)
//       if (response.data.user) {
//         return {
//           full_name: response.data.user.full_name,
//           id: response.data.user.id,
//           profile_photo: response.data.user.photo,
//         };
//       }
//     } catch (err) {
//       console.error("Error fetching user data:", err.message);
//       return { full_name: "Unknown User", id: "Unknown ID", profile_photo: "" };
//     }
//   };

//   const openChat = (chatId) => {
//     navigate(`/chat/${chatId}`);
//   };

//   const handleCounselorSelect = (e) => {
//     const counselorId = e.target.value;
//     if (counselorId) {
//       const selectedCounselor = counselors.find(
//         (counselor) => counselor.id === parseInt(counselorId)
//       );
//       // You can now open chat with the selected counselor
//       if (selectedCounselor) {
//         // console.log(selectedCounselor)
//         localStorage.setItem("receiver_name", selectedCounselor?.full_name);
//         openChat(`${selectedCounselor?.id}`);
//       }
//       else {
//         openChat("1");
//       }
//     }
//   };

//    const handleStudentSelect = (e) => {
//     const studentId = e.target.value;
//     if (studentId) {
//       const selectedStudent = student.find(
//         (studentid) => studentid.id === parseInt(studentId)
//       );
//       // You can now open chat with the selected counselor
//       if (selectedStudent) {
//         // console.log(selectedCounselor)
//         localStorage.setItem("receiver_name", selectedStudent?.full_name);
//         openChat(`${selectedStudent?.id}`);
//       }
//       else {
//         openChat("1");
//       }
//     }
//   };


//   return (
//     <div className="container p-4">
//       <h3>Your Chats</h3>
//       {/* Counselor Select dropdown */}
//       <div>
//         {role === "student" && (
//           <div className="counselor-select">
//             <label htmlFor="counselor-select">Choose Admin or Counselor to Chat:</label>
//             <select id="counselor-select" onChange={handleCounselorSelect}>
//               <option value="">Select to chat</option>
//               <option value="1">Admin</option>
//               {counselors.length > 0 ? (
//                 counselors.map((counselor) => (
//                   <option key={counselor.id} value={counselor.id}>
//                     {counselor.full_name}
//                   </option>
//                 ))
//               ) : (
//                 <option disabled>Loading counselors...</option>
//               )}
//             </select>
//           </div>
//         )}
//          {role === "counselor" && (
//          <div className="counselor-select">
//       <label htmlFor="counselor-select">Choose Admin or Student to Chat:</label>
//       <select id="counselor-select" onChange={handleStudentSelect}>
//         <option value="">Select to chat</option>
//         <option value="1">Admin</option>
//         {student.length > 0 ? (
//           student.map((students) => (
//             <option key={students.id} value={students.id}>
//               {students.full_name} ({students.role})
//             </option>
//           ))
//         ) : (
//           <option disabled>Loading students...</option>
//         )}
//       </select>
//     </div>
//         )}
//       </div>


//       {chatList.length > 0 ? (
//         chatList.map((chat, index) => (
//           <div
//             key={index}
//             className="chat-item"
//             onClick={() => {
//               localStorage.setItem("receiver_name", userDetails[chat.chatId]?.full_name);
//               openChat(userDetails[chat.chatId]?.id);
//             }}
//           >
//             {/* Profile image with fallback */}
//             <img
           
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnBfB52cT5We6HCyYO5QMjSNP1sYzeelLDJloXKKhBQSntRowtvMNsLEeJ0yzUAOtGA1g&usqp=CAU"
//               alt="Profile"
//               className="profile-img"
//               crossorigin=""
//             />
//             <div className="chat-details">
//               <p className="user-name">{userDetails[chat.chatId]?.full_name || "Loading..."}</p>
//               <p className="last-message-time">{new Date(chat.lastMessageTime).toLocaleString()}</p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No chats available</p>
//       )}
//     </div>
//   );
// };

// export default ChatList;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../interceptors/axiosInterceptor";
import "./ChatBox.css";
import BASE_URL from "../../Config";
import { FiSearch, FiPlus } from "react-icons/fi";
import "./ChatList.css"

const ChatList = ({ userId }) => {
  const [chatList, setChatList] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [counselors, setCounselors] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddMenu, setShowAddMenu] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("login");

  // Fetch chat list
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        // Fetch single chats
        const singleChatResponse = await axios.get(
          `${BASE_URL}chats/getChatList/${userId}`
        );
        
        // Fetch group chats
        const groupChatResponse = await axios.get(
          `${BASE_URL}chats/getGroupChats/${userId}`
        );

        if (singleChatResponse.data.success && groupChatResponse.data.success) {
          const allChats = [
            ...singleChatResponse.data.chatList,
            ...groupChatResponse.data.groupChats
          ];
          setChatList(allChats);

          // Fetch user details
          const details = {};
          for (let chat of singleChatResponse.data.chatList) {
            const user = await getUserDetails(chat.chatId);
            details[chat.chatId] = user;
          }
          
          // Add group chat details
          for (let group of groupChatResponse.data.groupChats) {
            details[group.chatId] = {
              full_name: group.groupName,
              id: group.chatId,
              profile_photo: group.groupPhoto || "default_group_photo_url",
              isGroup: true,
              members: group.members
            };
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
        setCounselors(res.data);
      } catch (err) {
        console.error("Failed to fetch counselors", err);
      }
    };
    fetchCounselors();
  }, []);

  // Fetch student list
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const counselorId = localStorage.getItem("counselor_id");
        if (counselorId) {
          const res = await api.get(`${BASE_URL}auth/getAssignedStudents/${counselorId}`);
          setStudents(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch assigned students", err);
      }
    };
    fetchStudents();
  }, []);

  const getUserDetails = async (chatId) => {
    if (chatId.startsWith('group_')) {
      const group = chatList.find(g => g.chatId === chatId);
      return {
        full_name: group?.groupName || "Group Chat",
        id: chatId,
        profile_photo: group?.groupPhoto || "default_group_photo_url",
        isGroup: true,
        members: group?.members || []
      };
    }

    let [first, second] = chatId.split("_");
    first = parseInt(first);
    second = parseInt(second);
    let id1 = userId == first ? second : first;

    try {
      const response = await api.get(`auth/getUser/${id1}`);
      if (response.data.user) {
        return {
          full_name: response.data.user.full_name,
          id: response.data.user.id,
          profile_photo: response.data.user.photo,
          isGroup: false
        };
      }
    } catch (err) {
      console.error("Error fetching user data:", err.message);
      return { 
        full_name: "Unknown User", 
        id: "Unknown ID", 
        profile_photo: "",
        isGroup: false
      };
    }
  };

  const openChat = (chatId, isGroup = false) => {
    navigate(`/chat/${chatId}`, { state: { isGroup } });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredChats = chatList.filter(chat => {
    const details = userDetails[chat.chatId];
    if (!details) return false;
    return details.full_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const createNewGroup = async () => {
    const groupName = prompt("Enter group name:");
    if (groupName) {
      try {
        const response = await api.post(`${BASE_URL}chats/createGroup`, {
          name: groupName,
          creatorId: userId,
          members: [userId]
        });
        if (response.data.success) {
          // Refresh chat list
          const updatedResponse = await axios.get(
            `${BASE_URL}chats/getGroupChats/${userId}`
          );
          setChatList([...chatList, ...updatedResponse.data.groupChats]);
          setShowAddMenu(false);
          openChat(response.data.group.id, true);
        }
      } catch (err) {
        console.error("Error creating group:", err);
      }
    }
  };

  const addMemberToGroup = async (groupId) => {
    // Only admin and counselor can add members
    if (role !== "admin" && role !== "counselor") return;
    
    const memberId = prompt("Enter user ID to add:");
    if (memberId) {
      try {
        const response = await api.post(`${BASE_URL}chats/addToGroup`, {
          groupId,
          userId: memberId
        });
        if (response.data.success) {
          // Refresh group info
          const updatedResponse = await axios.get(
            `${BASE_URL}chats/getGroupChats/${userId}`
          );
          setChatList(updatedResponse.data.groupChats);
        }
      } catch (err) {
        console.error("Error adding member:", err);
      }
    }
  };

  return (
    <div className="chat-list-container">
      <div className="chat-list-header">
        <h3>Messages</h3>
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="chat-actions">
        <div className="add-button" onClick={() => setShowAddMenu(!showAddMenu)}>
          <FiPlus />
          <span>Add</span>
          {showAddMenu && (
            <div className="add-menu" style={{width:"121px"}}>
              <div onClick={createNewGroup}>New Group</div>
              {role === "admin" || role === "counselor" ? (
                <div onClick={() => navigate("/add-user")}>Add User</div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <div className="recent-chats">
        <h4>Recent Chats</h4>
        {filteredChats.length > 0 ? (
          filteredChats.map((chat, index) => (
            <div
              key={index}
              className={`chat-item ${userDetails[chat.chatId]?.isGroup ? 'group-chat' : ''}`}
              onClick={() => {
                localStorage.setItem("receiver_name", userDetails[chat.chatId]?.full_name);
                openChat(chat.chatId, userDetails[chat.chatId]?.isGroup);
              }}
            >
              <img
                src={userDetails[chat.chatId]?.profile_photo || 
                  (userDetails[chat.chatId]?.isGroup ? 
                    "default_group_photo_url" : 
                    "default_user_photo_url")}
                alt="Profile"
                className="profile-img"
                crossOrigin="anonymous"
              />
              <div className="chat-details">
                <div className="chat-info">
                  <p className="user-name">
                    {userDetails[chat.chatId]?.full_name || "Loading..."}
                  </p>
                  <p className="last-message-time">
                    {new Date(chat.lastMessageTime).toLocaleString()}
                  </p>
                </div>
                {userDetails[chat.chatId]?.isGroup && 
                  (role === "admin" || role === "counselor") && (
                    <button 
                      className="add-member-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addMemberToGroup(chat.chatId);
                      }}
                    >
                      Add Member
                    </button>
                  )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-chats">No chats available</p>
        )}
      </div>
    </div>
  );
};

export default ChatList;
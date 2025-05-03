import React, { useState } from "react";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ChatBox = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { text: "Hello! How are you?", sender: "bot" },
    { text: "I'm doing great! What about you?", sender: "user" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    setMessages([...messages, { text: newMessage, sender: "user" }]);
    setNewMessage("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Thanks for your message!", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="d-flex flex-column mt-4 vh-100 vw-99"  >
      <div className="card shadow-lg border-0">
        {/* Header */}
        <div className="border p-2 shadow-lg d-flex justify-content-between">
          <div className="d-flex gap-2 ">
            <div>
              <img
                src="https://th.bing.com/th/id/OIP.fCD7A28NN9-1jJebLiavggHaKU?rs=1&pid=ImgDetMain"
                alt=""
                style={{ width: "60px", height: "60px", borderRadius: "50%" }}
              />
            </div>
            <div>
              <h4 className="mb-0">Jone Deo</h4>
              <p className="mt-1 text-muted">Today at 12:45</p>
            </div>
          </div>

          <div className="border-black d-flex justify-content-end">
            <button
             style={{height:"30px"}}
              onClick={() => navigate(-1)}
              className="btn btn-light border border-dark btn-sm px-2 py-1 small"
            >
              <FaArrowLeft className="me-2" />
              Back
            </button>
          </div>
        </div>

        {/* Chat Body */}
        <div
          className="card-body overflow-auto p-3"
          style={{ height: "380px" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex ${
                msg.sender === "user"
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <div
                className={`p-2 rounded text-white my-1`}
                style={{
                  backgroundColor:
                    msg.sender === "user" ? "#4a4949" : "#007bff",
                  maxWidth: "75%",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="card-footer bg-light d-flex">
          <button className="btn btn-light border me-2">
            <FaSmile />
          </button>
          <input
            type="text"
            className="form-control border-0"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn btn-primary ms-2" onClick={sendMessage}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

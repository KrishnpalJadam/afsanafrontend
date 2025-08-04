// import React, { useState } from "react";
// import "./ChatbotMain.css"; // Move your CSS into this file

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const toggleChat = () => {
//     setIsOpen((prev) => !prev);
//   };

//   const sendMessage = () => {
//     const trimmed = input.trim();
//     if (!trimmed) return;

//     setMessages((prev) => [...prev, { text: trimmed, sender: "user" }]);
//     setInput("");

//     // Simulate bot reply
//     setTimeout(() => {
//       setMessages((prev) => [...prev, { text: "Checking now!", sender: "bot" }]);
//     }, 500);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <>
//       {/* Chat Toggle Button */}
//       <div className="chat-toggle" onClick={toggleChat}>
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
//           alt="Chat"
//           width="40"
//         />
//       </div>

//       {/* Chat Panel */}
//       <div className={`chat-panel ${isOpen ? "" : "hidden"}`}>
//         <div className="chat-header">
//           <h4>Chat Support</h4>
//           <button className="close-btn" onClick={toggleChat}>
//             ×
//           </button>
//         </div>

//         <div className="chat-container">
//           {messages.map((msg, index) => (
//            <div
//   key={index}
//   className={`message-wrapper ${msg.sender === "user" ? "align-right" : "align-left"}`}
// >
//   <div className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}>
//     {msg.text}
//   </div>
// </div>
//           ))}
//         </div>

//         <div className="chat-input">
//           <textarea
//             placeholder="Type your message..."
//             rows="1"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyPress}
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Chatbot;


import React, { useState, useRef, useEffect } from 'react';
import './ChatbotMain.css';
import BASE_URL from '../../Config';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');

    try {
      const response = await fetch(`${BASE_URL}aichat/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      const botReply = data.reply || 'Sorry, I did not understand that.';
      setMessages(prev => [...prev, { type: 'bot', text: botReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'bot', text: 'Error: Unable to get response.' }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Suggested questions
  const suggestedQuestions = [
    "what is the admission process?",
    "how can i apply to a university?",
    "how do i track my application view?",
    "where do i upload documents?",
    "how to pay fees?",
      "how do i track visa process?",
      "what is student decision?",
       "what is task management?",
        "i need help",
         "how i connect to you"
  ];

  // Handler for suggested question click
  const handleSuggestedClick = async (question) => {
    setMessages(prev => [...prev, { type: 'user', text: question }]);
    try {
      const response = await fetch(`${BASE_URL}aichat/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: question }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      const botReply = data.reply || 'Sorry, I did not understand that.';
      setMessages(prev => [...prev, { type: 'bot', text: botReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'bot', text: 'Error: Unable to get response.' }]);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="chat-toggle" onClick={toggleChat}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
          alt="Chat"
          width="40"
        />
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="chat-panel">
          <div className="chat-header">
            <h4 className='text-white'>Chat Support</h4>
            <button className="close-btn btn-sm" onClick={toggleChat}>
              ×
            </button>
          </div>

          <div className="chat-container" ref={chatContainerRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: 8
                }}
              >
                <div
                  className={msg.type === 'user' ? 'user-message' : 'bot-message'}
                  style={{
                    maxWidth: '70%',
                    padding: '8px 14px',
                    borderRadius: '18px',
                    background: msg.type === 'user' ? '#007bff' : '#f1f0f0',
                    color: msg.type === 'user' ? '#fff' : '#222',
                    fontSize: 15,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.07)',
                    borderBottomRightRadius: msg.type === 'user' ? 0 : 18,
                    borderBottomLeftRadius: msg.type === 'user' ? 18 : 0,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Suggested Questions - now above input, single line, scrollable if needed */}
          <div className="suggested-questions" style={{
            margin: '8px 0',
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: 4
          }}>
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                className="suggested-question-btn"
                style={{
                  padding: '5px 12px',
                  borderRadius: '16px',
                  border: '1px solid #ccc',
               
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontSize: 13
                }}
                onClick={() => handleSuggestedClick(q)}
              >
                {q}
              </button>
            ))}
          </div>

          <div className="chat-input">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              rows="1"
              onKeyDown={handleKeyPress}
              style={{ fontSize: 15 }}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
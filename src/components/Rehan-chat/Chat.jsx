

import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import io from 'socket.io-client';
import axios from 'axios';
import './Chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BASE_URL from '../../Config';

const Socket_URL = "http://localhost:3009";
const socket = io(Socket_URL, { transports: ['websocket'] });

const ChatAppLayout = () => {
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [allChats, setAllChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupMembers, setGroupMembers] = useState([]);
    const messagesEndRef = useRef(null);

    const currentUserId = localStorage.getItem("user_id");
    const currentCId = localStorage.getItem("counselor_id");
    const currentUserRole = localStorage.getItem("role");
    const student_id = localStorage.getItem("student_id");

    const getCurrentRoleWiseId = () => {
        if (currentUserRole === "student") return student_id;
        if (currentUserRole === "counselor") return currentCId;
        return currentUserId;
    };

    useEffect(() => {
        const userId = getCurrentRoleWiseId();
        if (userId) socket.emit("join", userId);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (currentUserRole === "counselor") await fetchgetAssignedStudents();
            else if (currentUserRole === "student") await fetchgetAssignedcounselor();
            else await fetchUserDetails();
        };
        fetchData();
    }, []);

    useEffect(() => {
        socket.on('messages', setChatHistory);
        socket.on('new_message', msg => {
            const currentId = getCurrentRoleWiseId();
            if (msg.group_id || msg.sender_id === currentId || msg.receiver_id === currentId) {
                setChatHistory(prev => [...prev, msg]);
                fetchUserDetails();
            }
        });


        return () => {
            socket.off('messages');
            socket.off('new_message');
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const fetchUserDetails = async () => {
        try {
            const res = await axios.get(`${BASE_URL}userdetails?userId=${currentUserId}`);
            const fetchedUsers = (res.data.users || []).map(u => ({ ...u, type: 'user' }));
            const fetchedGroups = (res.data.groups || []).map(g => ({ ...g, type: 'group' }));
            const merged = [...fetchedUsers, ...fetchedGroups].sort((a, b) => {
                return new Date(b.last_message_time) - new Date(a.last_message_time);
            });
            setUsers(fetchedUsers);
            setGroups(fetchedGroups);
            setAllChats(merged);

        } catch (err) {
            console.error('User/Group fetch error:', err);
        }
    };

    const formatDateLabel = (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const isSameDay = (d1, d2) =>
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();

        if (isSameDay(date, today)) return "Today";
        if (isSameDay(date, yesterday)) return "Yesterday";

        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const fetchgetAssignedStudents = async () => {
        try {
            const res = await axios.get(`${BASE_URL}getAssignedStudents?counselor_id=${currentCId}`);
            const fetchedUsers = (res.data.users || []).map(u => ({ ...u, type: 'user' }));
            const fetchedGroups = (res.data.groups || []).map(g => ({ ...g, type: 'group' }));
            const merged = [...fetchedUsers, ...fetchedGroups].sort((a, b) => {
                return new Date(b.last_message_time) - new Date(a.last_message_time);
            });
            setUsers(fetchedUsers);
            setGroups(fetchedGroups);
            setAllChats(merged);

        } catch (err) {
            console.error('User/Group fetch error:', err);
        }
    };

    const fetchgetAssignedcounselor = async () => {
        try {
            const res = await axios.get(`${BASE_URL}getAssignedcounselor?student_id=${student_id}`);
            const fetchedUsers = (res.data.users || []).map(u => ({ ...u, type: 'user' }));
            const fetchedGroups = (res.data.groups || []).map(g => ({ ...g, type: 'group' }));

            const merged = [...fetchedUsers, ...fetchedGroups].sort((a, b) => {
                return new Date(b.last_message_time) - new Date(a.last_message_time);
            });
            setUsers(fetchedUsers);
            setGroups(fetchedGroups);
            setAllChats(merged);

        } catch (err) {
            console.error('User/Group fetch error:', err);
        }
    };

    const openChat = (chat) => {
        setSelectedChat(chat);
        setChatHistory([]);

        const sender_id = getCurrentRoleWiseId();
        let receiver_id = null;
        let group_id = null;

        if (chat.type === 'group') {
            group_id = chat.id;
            socket.emit("join", chat.id);
        } else {
            if (currentUserRole === 'admin') {
                receiver_id = chat.student_id || chat.counselor_id || chat.id;
            } else if (currentUserRole === 'counselor') {
                receiver_id = chat.student_id || chat.id;
            } else if (currentUserRole === 'student') {
                receiver_id = chat.counselor_id || chat.id;
            } else {
                receiver_id = chat.id;
            }
        }

        const payload = group_id ? { group_id } : { sender_id, receiver_id };
        socket.emit('get_messages', payload);
    };
    const deleteGroup = async (groupId) => {
        try {
            const res = await axios.delete(`${BASE_URL}deletegroup/${groupId}`);
            if (res.data.success) {
                alert("Group deleted successfully");
                fetchUserDetails();
                if (selectedChat?.id === groupId) {
                    setSelectedChat(null);
                    setChatHistory([]);
                }
            }
        } catch (err) {
            console.error("Group delete failed", err);
            alert("You are not authorized to delete this group");
        }
    };

    const handleSendMessage = () => {
        if (!message.trim() || !selectedChat) return;

        const sender_id = getCurrentRoleWiseId();
        let receiver_id = null;
        let group_id = null;

        if (selectedChat.type === 'group') {
            group_id = selectedChat.id;
        } else {
            if (currentUserRole === 'admin') {
                receiver_id = selectedChat.student_id || selectedChat.counselor_id || selectedChat.id;
            } else if (currentUserRole === 'counselor') {
                receiver_id = selectedChat.student_id || selectedChat.id;
            } else if (currentUserRole === 'student') {
                receiver_id = selectedChat.counselor_id || selectedChat.id;
            } else {
                receiver_id = selectedChat.id;
            }
        }

        const payload = {
            message,
            sender_id,
            type: 'text',
            group_id,
            receiver_id: selectedChat.type === 'user' ? receiver_id : null,
        };

        socket.emit('send_message', payload);
        setMessage('');
    };

    const handleCreateGroup = async () => {
        try {
            const roleWiseId = getCurrentRoleWiseId();
            const selectedIds = groupMembers.map(u => u.value);

            // ✅ Always include admin ID (1)
            if (!selectedIds.includes(1)) selectedIds.push(1);

            const payload = {
                group_name: groupName,
                user_ids: selectedIds.join(','), // e.g., "1,3,5"
                created_by: roleWiseId,
            };

            await axios.post(`${BASE_URL}creategroup`, payload);
            setShowGroupModal(false);
            setGroupName('');
            setGroupMembers([]);
            fetchUserDetails();
        } catch (err) {
            console.error('Create group failed:', err);
        }
    };


    const userOptions = users.map(u => ({ value: u.id, label: u.full_name }));

    return (
        <div className="container-fluid vh-100 d-flex flex-column p-3">
            <div className="d-flex flex-grow-1 overflow-hidden">
                <div className="sidebar bg-light border-end p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold mb-0">Chats</h5>
                        <Button variant="primary" size="sm" onClick={() => setShowGroupModal(true)}>+ Group</Button>
                    </div>
                    {allChats.map((chat) => (
                        <div
                            key={`${chat.type}-${chat.id}`}
                            className={`user-item-card ${selectedChat?.id === chat.id && selectedChat?.type === chat.type ? 'border border-success bg-darkblue' : ''}`}
                        >
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center" onClick={() => openChat(chat)} style={{ cursor: 'pointer' }}>
                                    <div className="me-2 fs-4">{chat.type === 'user' ? '👤' : '👥'}</div>
                                    <div>
                                        <div className="text-nowrap fw-bold" style={{ fontSize: '14px' }}>
                                            {chat.type === 'user' && chat.id === currentUserId ? 'You' : `${chat.full_name || chat.group_name} ${chat.type === "user" ? `(${chat?.role})` : ""}`}
                                        </div>
                                        <div className="text-muted small">{chat.type}</div>
                                    </div>
                                </div>


                                {currentUserId == 1 && chat?.group_name && (
                                    <Button variant="danger" size="sm" onClick={() => deleteGroup(chat.id)}>🗑️</Button>
                                )}

                            </div>
                        </div>
                    ))}

                </div>

                <div className="chat-area d-flex flex-column flex-grow-1">
                    {selectedChat ? (
                        <>
                            <div className="chat-header px-4 py-3 border-bottom">
                                <h5 className="mb-0">
                                    Chat with {selectedChat.type === 'group' ? selectedChat.group_name : selectedChat.full_name}
                                </h5>
                            </div>
                            <div className="chat-history flex-grow-1 overflow-auto p-3">
                                {(() => {
                                    let lastDate = null;

                                    return chatHistory.map((msg, idx) => {
                                        const messageDate = new Date(msg.created_at);
                                        const formattedDate = formatDateLabel(messageDate);

                                        const isNewDate = !lastDate || new Date(lastDate).toDateString() !== messageDate.toDateString();
                                        lastDate = messageDate;

                                        const isSender = String(msg.sender_id) === String(getCurrentRoleWiseId());

                                        return (
                                            <React.Fragment key={idx}>
                                                {isNewDate && (
                                                    <div className="text-center my-2">
                                                        <span className="badge bg-secondary">{formattedDate}</span>
                                                    </div>
                                                )}
                                                <div className={`message-bubble ${isSender ? 'message-right' : 'message-left'}`}>
                                                    <div>{msg.message}</div>
                                                    <div className="timestamp text-black">
                                                        <strong>{!isSender ? `${msg.sender_name || 'Unknown'}, ` : ''}</strong>
                                                        {new Date(msg.created_at).toLocaleTimeString('en-US', {
                                                            hour: 'numeric',
                                                            minute: '2-digit',
                                                            hour12: true
                                                        })}
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        );
                                    });
                                })()}

                                <div ref={messagesEndRef} />
                            </div>
                            <div className="border-top p-3 d-flex">
                                <input
                                    className="form-control me-2"
                                    placeholder="Type your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <Button className="btn-darkblue" disabled={!message.trim()} onClick={handleSendMessage}>Send</Button>
                            </div>
                        </>
                    ) : (
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                            <div className="text-center">
                                <h3>Welcome to Messaging 💬</h3>
                                <p>Select a user or group to start chatting.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Modal show={showGroupModal} onHide={() => setShowGroupModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter group name"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Select Members</Form.Label>
                            <Select
                                isMulti
                                options={userOptions}
                                value={groupMembers}
                                onChange={setGroupMembers}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowGroupModal(false)}>Cancel</Button>
                    <Button className="btn-darkblue" onClick={handleCreateGroup}>Create</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ChatAppLayout;
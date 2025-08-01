import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import io from 'socket.io-client';
import axios from 'axios';
import './Chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BASE_URL from '../../Config';
const Socket_URL = "https://afsana-backend-production.up.railway.app"
const socket = io(Socket_URL, { transports: ['websocket'] });

console.log("Socket_URL", Socket_URL);
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
    const currentUserRole = localStorage.getItem("role");

    const student_id = localStorage.getItem("student_id");
    useEffect(() => {
        const fetchData = async () => {
            if (currentUserRole === "counselor") {
                await fetchgetAssignedStudents();
            } else if (currentUserRole === "student") {
                await fetchgetAssignedcounselor()
            } else {
                await fetchUserDetails();
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        socket.on('messages', setChatHistory);
        socket.on('new_message', msg => setChatHistory(prev => [...prev, msg]));
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
                const nameA = a.full_name || a.group_name;
                const nameB = b.full_name || b.group_name;
                return nameA.localeCompare(nameB);
            });
            setUsers(fetchedUsers);
            setGroups(fetchedGroups);
            setAllChats(merged);
        } catch (err) {
            console.error('User/Group fetch error:', err);
        }
    };
    const fetchgetAssignedStudents = async () => {
        try {
            const res = await axios.get(`${BASE_URL}getAssignedStudents?counselor_id=${currentUserId}`);
            const fetchedUsers = (res.data.users || []).map(u => ({ ...u, type: 'user' }));
            const fetchedGroups = (res.data.groups || []).map(g => ({ ...g, type: 'group' }));
            const merged = [...fetchedUsers, ...fetchedGroups].sort((a, b) => {
                const nameA = a.full_name || a.group_name;
                const nameB = b.full_name || b.group_name;
                return nameA.localeCompare(nameB);
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
                const nameA = a.full_name || a.group_name;
                const nameB = b.full_name || b.group_name;
                return nameA.localeCompare(nameB);
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
        const payload = chat.type === 'group'
            ? { group_id: chat.id }
            : { sender_id: currentUserId, receiver_id: chat.id };
        socket.emit('get_messages', payload);
    };

    const handleSendMessage = () => {
        if (!message.trim() || !selectedChat) return;
        const payload = {
            message,
            sender_id: currentUserId,
            type: 'text',
            group_id: selectedChat.type === 'group' ? selectedChat.id : null,
            receiver_id: selectedChat.type === 'user' ? selectedChat.id : null,
        };
        socket.emit('send_message', payload);
        setMessage('');
    };

    const handleCreateGroup = async () => {
        try {
            const selectedIds = groupMembers.map(u => u.value);
            if (!selectedIds.includes(currentUserId)) selectedIds.push(currentUserId);
            const payload = {
                group_name: groupName,
                user_ids: selectedIds.join(','),
                created_by: currentUserId,
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

    console.log("chathistory", chatHistory);
    return (
        <div className="container-fluid vh-100 d-flex flex-column p-3">
            <div className="d-flex flex-grow-1 overflow-hidden">
                {/* Sidebar */}
                <div className="sidebar bg-light border-end p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold mb-0">Chats</h5>
                        <Button variant="primary" size="sm" onClick={() => setShowGroupModal(true)}>+ Group</Button>
                    </div>
                    {allChats.map((chat) => (
                        <div
                            key={`${chat.type}-${chat.id}`}
                            className={`user-item-card ${selectedChat?.id === chat.id && selectedChat?.type === chat.type ? 'border border-success bg-darkblue' : ''}`}
                            onClick={() => openChat(chat)}
                        >
                            <div className="d-flex align-items-center">
                                <div className="me-2 fs-4">{chat.type === 'user' ? '👤' : '👥'}</div>
                                <div>
                                    <div className="text-nowrap" style={{ fontWeight: 'bold', fontSize: '14px' }}>
                                        {chat.type === 'user' && chat.id === currentUserId ? 'You' : `${chat.full_name || chat.group_name} ${chat.type == "user" ? `(${chat?.role})` : ""}`}
                                    </div>
                                    <div className="text-muted small">{chat.type}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat Area */}
                <div className="chat-area d-flex flex-column flex-grow-1">
                    {selectedChat ? (
                        <>
                            <div className="chat-header px-4 py-3 border-bottom">
                                <h5 className="mb-0">
                                    Chat with {selectedChat.type === 'group' ? selectedChat.group_name : selectedChat.full_name}
                                </h5>
                            </div>
                            <div className="chat-history flex-grow-1 overflow-auto p-3">
                                {chatHistory.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`message-bubble ${msg.sender_id === currentUserId ? 'message-right' : 'message-left'}`}
                                    >
                                        <div>{msg.message}</div>
                                        <div className="timestamp">
                                            <strong className='text-black'>{msg.sender_id !== currentUserId ? `${msg.sender_name || 'User'}, ` : ''}</strong>
                                            {new Date(msg.created_at).toLocaleTimeString('en-US', {
                                                hour: 'numeric',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </div>

                                    </div>
                                ))}
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
                                <Button className="btn-darkblue" onClick={handleSendMessage}>Send</Button>
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

            {/* Group Modal */}
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
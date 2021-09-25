import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import CardHeader from '../../../../components/UI/Cards/CardHeader/CardHeader';
import AdminLayout from '../../../../components/AllAdmin/Administrator/AdminLayout/AdminLayout';
import CitizenConversations from './CitizenConversations/CitizenConversations';
import CitizenMessage from './CitizenMessage/CitizenMessage';
import { Context } from '../../../../context/Context';

import './CitizenChatReport.module.css';
import classes from './CitizenChatReport.module.css';

const CitizenChatReport = ( props ) => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [chatMessages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();
    const { user } = useContext(Context);
    const scrollRef = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages(prev => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user.data.user._id);
        socket.current.on("getUsers", user => {
            console.log(user);
        });
    }, [user]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/api/conversations/" + user?.data?.user?._id);
                setConversations(res.data);
                // console.log(res);
            } catch(err) {
                console.log(err);
            }
        };

        getConversations();
    }, [user?.data?.user?._id]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("/api/messages/" + currentChat?._id);
                setMessages(res.data);
                //console.log(res);
            } catch(err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }

        try {
            const res = await axios.post("/api/messages/", message);
            setMessages([...chatMessages, res.data]);
        } catch(err) {
            console.log(err);
        }
    };

    console.log(currentChat);
    
    return(
        <React.Fragment>
            <AdminLayout>
                <div className={classes.AdminMessages}>
                    <CardHeader>
                        <h2 className={classes.Text}>Messages</h2>
                    </CardHeader>
                </div>
                <div className={classes.Messenger}>
                    <div className={classes.AdminChatMenu}>
                        <input
                            placeholder="Search messages"
                            className={classes.AdminChatMenuSearch}
                        />
                        {conversations.map(c => (
                            <div onClick={() => setCurrentChat(c)}>
                                <CitizenConversations conversation={c} currentUser={user}  />
                            </div>
                        ))}
                    </div>
                    <div className={classes.AdminChat}>
                        <div className={classes.AdminChatWrapper}>
                            <div className={classes.AdminChatBoxTop}>
                                {
                                    chatMessages.map(m => (
                                        <div>
                                            <CitizenMessage messages={m} own={m.sender === user?.user?._id} />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={classes.AdminChatBoxBottom}>
                                <textarea
                                    className={classes.ChatMessageInput}
                                    placeholder="Write something..."
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}
                                ></textarea>
                                <button className={classes.ChatSubmitButton} onClick={handleSubmit}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </React.Fragment>
    );

};

export default CitizenChatReport;

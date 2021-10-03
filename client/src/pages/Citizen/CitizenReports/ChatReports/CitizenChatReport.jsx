import React, { useState, useRef, useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import CardHeader from '../../../../components/UI/Cards/CardHeader/CardHeader';
import AdminLayout from '../../../../components/AllAdmin/Administrator/AdminLayout/AdminLayout';
import CitizenConversations from './CitizenConversations/CitizenConversations';
import CitizenMessage from './CitizenMessage/CitizenMessage';
import { Context } from '../../../../context/Context';

import './CitizenChatReport.module.css';
import classes from './CitizenChatReport.module.css';
import CitizenChatOnline from './ChatOnline/CitizenChatOnline';

const CitizenChatReport = ( props ) => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [chatMessages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [allAdmins, setAllAdmins] = useState([]);
    const [admin, setAdmin] = useState([]);
    const socket = useRef();
    const { user } = useContext(Context);
    const scrollRef = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8800");
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            });
        });
    }, []);

    // useEffect(() => {
    //     const sendRequest = async () => {
    //         const response = await fetch('/api/admin');
    //         const responseData = await response.json();
    //         setAllAdmins(responseData);
    //        // console.log(responseData)
    //     }
    //     sendRequest();
    // }, []);

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages(prev => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user.data.user._id);
        socket.current.on("getUsers", users => {
            console.log(users);
        });
    }, [user]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/api/conversations/" + user.data?.user?._id);
                setConversations(res.data);
                // console.log(res);
            } catch(err) {
                console.log(err);
            }
        };

        getConversations();
    }, [user.data]);

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
            sender: user.data.user._id,
            text: newMessage,
            conversationId: currentChat._id
        }

        const receiverId = currentChat.members.find(member => member !== user.data?.user?._id);

        socket.current.emit("sendMessage", {
            senderId: user.data?.user?._id,
            receiverId,
            text: newMessage 
        });

        try {
            const res = await axios.post("/api/messages/", message);
            setMessages([...chatMessages, res.data]);
        } catch(err) {
            console.log(err);
        }
    };

    
    // const createConversation = async (e) => {
    //     e.preventDefault();
    //     const message = {
    //         sender: user.data.user._id,
    //         text: newMessage,
    //         conversationId: currentChat._id
    //     }

    //     const currentSender = user.data.user._id;
    //     const receiverId = currentChat.members.find(member => member !== user.data.user._id);

    //     socket.current.emit("sendMessage", {
    //         senderId: user.data.user._id,
    //         receiverId,
    //         text: newMessage 
    //     });

        

    //     try {
    //         const resConvo = await axios.post('/api/conversations/', {currentSender, receiverId});
    //         console.log(resConvo);

    //     } catch (err){
    //         console.log(err);
    //     }
    // }

    // console.log(user.data.user._id);
    
    return(
        <React.Fragment>
            <div className={classes.Container}>
                <div className={classes.AdminMessages}>
                    <CardHeader>
                        <h2 className={classes.Text}>Messages</h2>
                    </CardHeader>
                </div>
                {/* List of chats */}
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
                    {/* Chatbox */}
                    <div className={classes.AdminChat}>
                        
                        <div className={classes.AdminChatWrapper}>
                            { currentChat ?
                                <>
                                <div className={classes.AdminChatBoxTop}>
                                {
                                    chatMessages.map(m => (
                                        <div>
                                            <CitizenMessage messages={m} own={m.sender === user.data?.user?._id} />
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
                                </> 
                                : 
                                <div className={classes.EmptyConvo}>
                                    <p className={classes.EmptyConvoText}>Open a conversation</p>
                                </div>
                            }
                        </div> 
                        
                    </div>
                    {/* Admins */}
                    <div className={classes.AdminList}>
                        <CitizenChatOnline
                            admin={admin}
                            currentId={user.data.user._id}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div> 
        </React.Fragment>
    );

};

export default CitizenChatReport;

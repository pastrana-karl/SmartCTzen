import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import AdminLayout from '../AdminLayout/AdminLayout';
import AdminConversations from './AdminConversations/AdminConversations';
import AdminMessage from './AdminMessage/AdminMessage';

import classes from './AdminMessages.module.css';

const AdminMessages = ( props ) => {
    const [conversations, setConversations] = useState([]);
    const socket = useRef(io("ws://localhost:8900"));
    // const { user } = useContext(AdminAuthContext);

    // useEffect(() => {
    //     socket.current.emit("addUser", user._id);
    // }, [user]);
    //insert this code soon:
    //const { user } = useContext(AuthContext)

    // useEffect(() => {
    //     const getConversations = async () => {
    //         try {
    //             const res = await axios.get("/conversations/" + user._id);
    //             setConversations(res.data);
    //             console.log(res);
    //         } catch(err) {
    //             console.log(err);
    //         }
    //     };

    //     getConversations();
    // }, [user._id]);
    return (
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
                        <AdminConversations />
                        <AdminConversations />
                        <AdminConversations />
                    </div>
                    <div className={classes.AdminChat}>
                        <div className={classes.AdminChatWrapper}>
                            <div className={classes.AdminChatBoxTop}>
                                {/* {conversations.map(conversation => {
                                    <AdminMessage conversation={conversation} currentUser={user} />
                                })} */}
                                
                                <AdminMessage />
                                <AdminMessage own />
                                <AdminMessage />
                                <AdminMessage own />
                                <AdminMessage />
                                <AdminMessage own />
                                <AdminMessage />
                                
                            </div>
                            <div className={classes.AdminChatBoxBottom}>
                                <textarea
                                    className={classes.ChatMessageInput}
                                    placeholder="Write something..."
                                ></textarea>
                                <button className={classes.ChatSubmitButton}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </React.Fragment>
    );
};

export default AdminMessages;
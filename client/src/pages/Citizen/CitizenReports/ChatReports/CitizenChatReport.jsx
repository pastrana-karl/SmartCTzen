import React from 'react';
import { useState } from 'react';
import { Card, Row, Col, Form, Button, Container } from 'react-bootstrap';
import CardHeader from '../../../../components/UI/Cards/CardHeader/CardHeader';
import AdminLayout from '../../../../components/AllAdmin/Administrator/AdminLayout/AdminLayout';
import AdminConversations from '../../../../components/AllAdmin/Administrator/AdminMessages/AdminConversations/AdminConversations';
import AdminMessage from '../../../../components/AllAdmin/Administrator/AdminMessages/AdminMessage/AdminMessage';
import { Link } from 'react-router-dom';
import './CitizenChatReport.module.css';
// import classes from '../../../../components/AllAdmin/Administrator/AdminMessages/AdminMessages.module.css';
import classes from './CitizenChatReport.module.css'

const CitizenChatReport = ( props ) => {
    const [conversations, setConversations] = useState([]);
        // <div className={own ? classes.MessageOwn : classes.Message }>
        //     <div className={classes.MessageTop}>
        //         <img
        //             className={classes.MessageImg}
        //             src="https://images.pexels.com/photos/1165999/pexels-photo-1165999.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        //             alt=""
        //         />
        //         <p className={classes.MessageText}>
        //         Hello! This is me This real!
        //         </p>
        //     </div>
        //     <div className={classes.MessageBottom}>
        //     1 hour ago
        //     </div>
        // </div>
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

export default CitizenChatReport;

import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import AdminLayout from '../AdminLayout/AdminLayout';
import AdminConversations from './AdminConversations/AdminConversations';
import AdminMessage from './AdminMessage/AdminMessage';
import { Context } from '../../../../context/Context';

import classes from './AdminMessages.module.css';

const AdminMessages = ( props ) => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [chatMessages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();
    const { aUser } = useContext(Context);
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

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", aUser.data.user._id);
        socket.current.on("getUsers", aUser => {
            console.log(aUser);
        });
    }, [aUser]);
    // insert this code soon:
    // const { user } = useContext(Context)

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/api/conversations/" + aUser.data.user._id);
                // const res = await axios.get("/api/conversations/" + aUser.data?.user?._id);
                setConversations(res.data);
                //console.log(res);
            } catch(err) {
                console.log(err);
            }
        };

        getConversations();
    }, [aUser.data.user._id]);

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

    // console.log(currentChat);
   
    // console.log(aUser.data.user._id);
   const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: aUser.data.user._id,
            text: newMessage,
            conversationId: currentChat._id
        };

        const receiverId = currentChat.members.find(member => member !== aUser.data.user._id);
        
        socket.current.emit("sendMessage", {
            senderId: aUser.data.user._id,
            receiverId,
            text: newMessage
        });

        console.log(receiverId);

        try {
            const res = await axios.post("/api/messages/", message);
            setMessages([...chatMessages, res.data]);
        } catch(err) {
            console.log(err);
        }

        Array.from(document.querySelectorAll("textarea")).forEach(
            input => (input.value = ""),
            setNewMessage(''),
        );
    };

    // useEffect(() => {
        
    // }, []);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [chatMessages])


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
                        {
                            conversations.map(c => (
                                <div onClick={() => setCurrentChat(c)}>
                                    <AdminConversations conversation={c} currentUser={aUser.data?.user}  />
                                </div>
                            ))
                        }
                        {/* <AdminConversations /> */}
                    </div>
                    <div className={classes.AdminChat}>
                        <div className={classes.AdminChatWrapper}>
                            {
                                <>
                                    <div className={classes.AdminChatBoxTop}>
                                        {chatMessages.map(m => (
                                            <div ref={scrollRef}>
                                                <AdminMessage messages={m} own={m.sender === aUser.data.user?._id} />
                                            </div>
                                        ))}
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
                            }
                        </div>
                    </div> 
                </div>
            </AdminLayout>
        </React.Fragment>
    );
};

export default AdminMessages;
// import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client';

// import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
// import AdminLayout from '../AdminLayout/AdminLayout';
// import AdminConversations from './AdminConversations/AdminConversations';
// import AdminMessage from './AdminMessage/AdminMessage';
// import { Context } from '../../../../context/Context';

// import classes from './AdminMessages.module.css';

// const AdminMessages = ( props ) => {
//     const [conversations, setConversations] = useState([]);
//     const [currentChat, setCurrentChat] = useState(null);
//     const [chatMessages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [arrivalMessage, setArrivalMessage] = useState(null);
//     const socket = useRef();
//     const { aUser } = useContext(Context);
//     const scrollRef = useRef();

//     useEffect(() => {
//         socket.current = io("ws://localhost:8800");
//         socket.current.on("getMessage", data => {
//             setArrivalMessage({
//                 sender: data.senderId,
//                 text: data.text,
//                 createdAt: Date.now()
//             }); 
//         });
//     }, []);

//     useEffect(() => {
//         arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
//         setMessages(prev => [...prev, arrivalMessage])
//     }, [arrivalMessage, currentChat]);

//     useEffect(() => {
//         socket.current.emit("addUser", aUser.data.user._id);
//         socket.current.on("getUsers", aUser => {
//             console.log(aUser);
//         });
//     }, [aUser]);
//     // insert this code soon:
//     // const { user } = useContext(Context)

//     useEffect(() => {
//         const getConversations = async () => {
//             try {
//                 const res = await axios.get("/api/conversations/" + aUser.data?.user?._id);
//                 setConversations(res.data);
//                 //console.log(res);
//             } catch(err) {
//                 console.log(err);
//             }
//         };

//         getConversations();
//     }, [aUser.data.user._id]);

//     useEffect(() => {
//         const getMessages = async () => {
//             try {
//                 const res = await axios.get("/api/messages/" + currentChat?._id);
//                 setMessages(res.data);
//                 //console.log(res);
//             } catch(err) {
//                 console.log(err);
//             }
//         };
//         getMessages();
//     }, [currentChat]);

//     // console.log(currentChat);
   
//     // console.log(aUser.data.user._id);
//    const handleSubmit = async (e) => {
//         e.preventDefault();
//         const message = {
//             sender: aUser.data.user._id,
//             text: newMessage,
//             conversationId: currentChat._id
//         };

//         const receiverId = currentChat.members.find(member => member !== aUser.data.user._id);
        
//         socket.current.emit("sendMessage", {
//             senderId: aUser.data.user._id,
//             receiverId,
//             text: newMessage
//         });

//         try {
//             const res = await axios.post("/api/messages/", message);
//             setMessages([...chatMessages, res.data]);
//         } catch(err) {
//             console.log(err);
//         }
//         // window.location.reload(false);
//     };

//     // useEffect(() => {
        
//     // }, []);

//     useEffect(() => {
//         scrollRef.current?.scrollIntoView({
//             behavior: "smooth"
//         });
//     }, [chatMessages])

//     console.log(chatMessages);

//     return (
//         <React.Fragment>
//             <AdminLayout>
//                 <div className={classes.AdminMessages}>
//                     <CardHeader>
//                         <h2 className={classes.Text}>Messages</h2>
//                     </CardHeader>
//                 </div>
//                 <div className={classes.Messenger}>
//                     <div className={classes.AdminChatMenu}>
//                         <input
//                             placeholder="Search messages"
//                             className={classes.AdminChatMenuSearch}
//                         />
//                         {
//                             conversations.map(c => (
//                                 <div onClick={() => setCurrentChat(c)}>
//                                     <AdminConversations conversation={c} currentUser={aUser.data?.user}  />
//                                 </div>
//                             ))
//                         }
//                         {/* <AdminConversations /> */}
//                     </div>
//                     <div className={classes.AdminChat}>
//                         <div className={classes.AdminChatWrapper}>
//                             {
//                                 <>
//                                     <div className={classes.AdminChatBoxTop}>
//                                         {chatMessages.map(m => (
//                                             <div ref={scrollRef} >
//                                                 <AdminMessage messages={m} own={m.sender === aUser.data.user?._id} key={m._id}/>
//                                             </div>
//                                         ))}
//                                     </div>
//                                     <div className={classes.AdminChatBoxBottom}>
//                                         <textarea
//                                             className={classes.ChatMessageInput}
//                                             placeholder="Write something..."
//                                             onChange={(e) => setNewMessage(e.target.value)}
//                                             value={newMessage}
//                                         ></textarea>
//                                         <button className={classes.ChatSubmitButton} onClick={handleSubmit}>Send</button>
//                                     </div>
//                                 </>
//                             }
//                         </div>
//                     </div> 
//                 </div>
//             </AdminLayout>
//         </React.Fragment>
//     );
// };

// export default AdminMessages;
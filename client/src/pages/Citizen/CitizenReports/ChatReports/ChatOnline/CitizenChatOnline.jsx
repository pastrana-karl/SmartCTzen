import axios from 'axios';
import React, { useEffect, useState } from 'react';

import classes from './CitizenChatOnline.module.css';

const CitizenChatOnline = ({admin, currentId, setCurrentChat}) => {
    const [allAdmins, setAllAdmins] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState([]);

    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch('/api/admin');
            const responseData = await response.json();
            setAllAdmins(responseData);
           // console.log(responseData)
        }
        sendRequest();
    }, []);

    const handleClick = async (user) => {
        try {
            const res = await axios.get(`/api/conversations/${currentId}/${user._id}` );
            setCurrentChat(res.data);
            console.log(res.data);

            if (res.data !== null) {
                return;
            } else {
                const newConvo = await axios.post('/api/conversations/', {
                    senderID: currentId,
                    receiverID: user._id
                });
                console.log(newConvo.data.savedConversation);
            }


        } catch (err) {
            console.log(err);
        }
    }

    return ( 
        <div className={classes.ChatOnline}>
            {allAdmins.map((admin) => (
            <div className={classes.ChatOnlineAdmin} key={admin._id}  onClick={() => handleClick(admin)}> 
                <div className={classes.ChatOnlineImageContainer}>
                <img 
                    className={classes.ChatOnlineImage}
                    src={admin.profilePic} 
                />
                <div className={classes.ChatOnlineBadge}></div>
                </div>
                <span className={classes.ChatOnlineName}>{admin.username}</span>
            </div>
            ))}
        </div>
    );
};

export default CitizenChatOnline;


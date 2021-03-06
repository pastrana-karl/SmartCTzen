import axios from 'axios';
import React, { useEffect, useState } from 'react';

import classes from './CitizenChatOnline.module.css';

const CitizenChatOnline = ({admin, currentId, setCurrentChat}) => {
    const [allAdmins, setAllAdmins] = useState([]);


    //Gets all admins
    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch('/api/admin/?onlineStatus=true');
            const responseData = await response.json();
            setAllAdmins(responseData);
        }
        sendRequest();
    }, []);

    const handleClick = async (user) => {
        try {
            const res = await axios.get(`/api/conversations/${currentId}/${user._id}` );
            setCurrentChat(res.data);

            if (res.data !== null) {
                return;
            } else {
                await axios.post('/api/conversations/', {
                    senderID: currentId,
                    receiverID: user._id
                });
            }


        } catch (err) {
            console.log(err);
        }
    }

    return ( 
        <div className={classes.ChatOnline}>
            {/* Display Admins */}
            {allAdmins && allAdmins.map((admin) => (
            <div className={classes.ChatOnlineAdmin} key={admin._id}  onClick={() => handleClick(admin)}> 
                <div className={classes.ChatOnlineImageContainer}>
                <img 
                    className={classes.ChatOnlineImage}
                    src={admin.profilePic} 
                    alt =""
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


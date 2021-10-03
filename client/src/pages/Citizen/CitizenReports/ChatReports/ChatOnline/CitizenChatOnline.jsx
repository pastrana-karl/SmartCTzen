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

    // useEffect(() => {
    //     setSelectedAdmin(allAdmins.filter(a => admin.includes(a._id)));
    // }, [admin]);

   //console.log(selectedAdmin);

    const handleClick = async (user) => {
        try {
            const res = await axios.get(`/api/conversations/${currentId}/${user._id}` );
            setCurrentChat(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    } 

   //console.log(allAdmins);

    return ( 
        <div className={classes.ChatOnline}>
            {allAdmins.map((admin) => (
            <div className={classes.ChatOnlineAdmin} key={admin._id}  onClick={() => handleClick(admin)}> 
                <div className={classes.ChatOnlineImageContainer}>
                <img 
                    className={classes.ChatOnlineImage}
                    src="https://images.pexels.com/photos/7322511/pexels-photo-7322511.jpeg?cs=srgb&dl=pexels-koolshooters-7322511.jpg&fm=jpg" 
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


import axios from 'axios';
import React, { useEffect, useState } from 'react';

import classes from './CitizenChatOnline.module.css';

const CitizenChatOnline = ({currentId, setCurrentChat}) => {
    const [allAdmins, setAllAdmins] = useState();


    //Gets all admins
    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch('/api/admin');
            const responseData = await response.json();
            setAllAdmins(responseData);
            //console.log(responseData)
        }
        sendRequest();
    }, []);

    const handleClick = async (user) => {
        try {
            const res = await fetch(`/api/conversations/${currentId}/${user._id}` );
            //setCurrentChat(res)
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

   //console.log(allAdmins);

    return ( 
        <div className={classes.ChatOnline}>
            {/* Display Admins */}
            {allAdmins && allAdmins.map((admin) => (
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


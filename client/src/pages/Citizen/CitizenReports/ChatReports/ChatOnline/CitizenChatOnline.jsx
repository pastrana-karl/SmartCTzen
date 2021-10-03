import axios from 'axios';
import React, { useEffect, useState } from 'react';

import classes from './CitizenChatOnline.module.css';

const CitizenChatOnline = ({currentId, setCurrentChat}) => {
    const [allAdmins, setAllAdmins] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch('/api/admin');
            const responseData = await response.json();
            setAllAdmins(responseData);
            // console.log(responseData.data)
        }
        sendRequest();
    }, []);

    const handleClick = async (user) => {
        try {
            const res = await axios.get(`/api/conversations/${currentId}/${user._id}` );
            //const resData = await res.json();
            setCurrentChat(res)
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

   //console.log(allAdmins);

    return ( 
        <div className={classes.ChatOnline}>
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


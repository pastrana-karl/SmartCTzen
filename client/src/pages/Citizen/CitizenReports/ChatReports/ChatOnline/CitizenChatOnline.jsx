import axios from 'axios';
import React, { useEffect, useState } from 'react';

import classes from './CitizenChatOnline.module.css';

const CitizenChatOnline = () => {
    const [allAdmins, setAllAdmins] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch('/api/admin');
            const responseData = await response.json();
            setAllAdmins(responseData);
            //console.log(responseData)
        }
        sendRequest();
    }, []);

   // console.log(allAdmins);

    return ( 
        <div className={classes.ChatOnline}>
            {allAdmins && allAdmins.map((admin) => (
            <div className={classes.ChatOnlineAdmin} key={admin._id}> 
                <div className={classes.ChatOnlineImageContainer}>
                <img 
                    className={classes.ChatOnlineImage}
                    src="https://images.pexels.com/photos/7322511/pexels-photo-7322511.jpeg?cs=srgb&dl=pexels-koolshooters-7322511.jpg&fm=jpg" 
                />
                <div className={classes.ChatOnlineBadge}></div>
                </div>
                <span className={classes.ChatOnlineName}>Josh Holmes</span>
            </div>
            ))}
        </div>
    );
};

export default CitizenChatOnline;


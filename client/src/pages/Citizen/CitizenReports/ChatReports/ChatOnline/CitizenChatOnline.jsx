import React from 'react';

import classes from './CitizenChatOnline.module.css';

const CitizenChatOnline = () => {
    return ( 
        <div className={classes.ChatOnline}>
            <div className={classes.ChatOnlineAdmin}>
                <div className={classes.ChatOnlineImageContainer}>
                    <img 
                        className={classes.ChatOnlineImage}
                        src="https://images.pexels.com/photos/7322511/pexels-photo-7322511.jpeg?cs=srgb&dl=pexels-koolshooters-7322511.jpg&fm=jpg" 
                    />
                    <div className={classes.ChatOnlineBadge}></div>
                </div>
                <span className={classes.ChatOnlineName}>Josh Holmes</span>
            </div>
        </div>
    );
};

export default CitizenChatOnline;


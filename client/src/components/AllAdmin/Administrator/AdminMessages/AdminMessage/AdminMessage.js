import React from 'react';
import { format } from 'timeago.js';

import classes from './AdminMessage.module.css';

const AdminMessage = ({messages, own }) => {
    console.log(messages);
    
    return (
        <div className={own ? classes.MessageOwn : classes.Message }>
            <div className={classes.MessageTop}>
                <img
                    className={classes.MessageImg}
                    src="https://images.pexels.com/photos/1165999/pexels-photo-1165999.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                    alt=""
                />
                <p className={classes.MessageText}>
                {messages.text}
                </p>
            </div>
            <div className={classes.MessageBottom}>
            {format(messages.createdAt)}
            </div>
        </div>
    );
}

export default AdminMessage;
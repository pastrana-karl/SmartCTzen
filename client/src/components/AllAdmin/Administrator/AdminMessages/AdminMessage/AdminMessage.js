import React from 'react';
import { format } from 'timeago.js';

import classes from './AdminMessage.module.css';

const AdminMessage = ({messages, own }) => {
    // console.log(messages);
    
    return (
        <div className={own ? classes.MessageOwn : classes.Message }>
            <div className={classes.MessageTop}>
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
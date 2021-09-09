import React from 'react';

import classes from './AdminConversations.module.css';

const AdminConversations = () => {
    return(
        <div className={classes.AdminConversations}>
            <img 
                className={classes.AdminConversationsImg} 
                src="https://images.pexels.com/photos/1165999/pexels-photo-1165999.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" 
                alt="sample-image" />
            <span className={classes.ConversationName}>Sample Test</span>
        </div>
    )
}

export default AdminConversations
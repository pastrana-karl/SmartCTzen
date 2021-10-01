import axios from 'axios';
import React, { useEffect, useState } from 'react';

import classes from './AdminConversations.module.css';

const AdminConversations = ({conversation, currentUser}) => {
    //insert soon
    const [citizenUser, setCitizenUser] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find(m => m !== currentUser._id);
        
        // console.log("current user is " + currentUser.user._id);

        const getUser = async () => {
            try {
                const res = await axios.get('/api/citizen/' + friendId);
                setCitizenUser(res.data);
                // console.log(res);
            } catch(err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentUser, conversation]);

    //console.log(citizenUser);
    //console.log(citizenUser._id);
    return(
        <div className={classes.AdminConversations}>
            <img 
                className={classes.AdminConversationsImg} 
                src="https://images.pexels.com/photos/1165999/pexels-photo-1165999.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" 
                alt="sample-image" />
            <span className={classes.ConversationName}>{citizenUser?.firstname + ' ' + citizenUser?.lastname}</span>
        </div>
    );
}

export default AdminConversations;
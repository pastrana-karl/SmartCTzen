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

    console.log(citizenUser);
    //console.log(citizenUser._id);
    return(
        <div className={classes.AdminConversations}>
            <img 
                className={classes.AdminConversationsImg} 
                src={citizenUser?.profilePic}
                alt="sample-image" />
            <span className={classes.ConversationName}>{citizenUser?.firstname + ' ' + citizenUser?.lastname}</span>
        </div>
    );
}

export default AdminConversations;
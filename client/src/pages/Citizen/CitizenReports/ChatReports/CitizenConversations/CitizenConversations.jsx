import axios from 'axios';
import React, { useEffect, useState } from 'react';

import classes from './CitizenConversations.module.css';

const CitizenConversations = ({conversation, currentUser}) => {
    const [adminUser, setAdminUser] = useState(null);

    useEffect(() => {
        const adminId = conversation.members.find(m => m !== currentUser._id);
        //console.log("current user " + adminId);

        const getAdminUser = async () => {
            try {
                const res = await axios.get('/api/admin/' + adminId);
                setAdminUser(res.data);
                //console.log(res);
            } catch(err) {
                console.log(err);
            }
        }; 
        getAdminUser();
    }, [currentUser, conversation]);

    
    //console.log(currentUser);

    return(
        <div className={classes.CitizenConversations}>
            <img 
                className={classes.CitizenConversationsImg}
                src={currentUser.data.user.profilePic}
                alt="sample-image"
            />
            <span className={classes.ConversationName}>{adminUser?.username}</span>
        </div>
    );
}

export default CitizenConversations;
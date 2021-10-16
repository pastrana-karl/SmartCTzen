import axios from 'axios';
import React, { useEffect, useState } from 'react';

import classes from './AdminConversations.module.css';

const AdminConversations = ({conversation, currentUser}) => {
    //insert soon
    const [citizenUser, setCitizenUser] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find(m => m !== currentUser._id);
        

        const getUser = async () => {
            try {
                const res = await axios.get('/api/citizen/' + friendId);
                setCitizenUser(res.data);
            } catch(err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentUser, conversation]);

    return(
        <div className={classes.AdminConversations}>
            <img 
                className={classes.AdminConversationsImg} 
                src={citizenUser?.profilePic ? citizenUser?.profilePic : 'https://res.cloudinary.com/karlstorage/image/upload/v1633331543/free-img/nmcibwr00fuip3xo4pvr.png'}
                alt="sample" />
            <span className={classes.ConversationName}>{citizenUser?.firstname ? citizenUser?.firstname + ' ' + citizenUser?.lastname : <span>No longer available</span>}</span>
        </div>
    );
}

export default AdminConversations;
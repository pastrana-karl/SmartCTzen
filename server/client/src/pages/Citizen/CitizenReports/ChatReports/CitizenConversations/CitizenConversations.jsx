import axios from 'axios';
import React, { useEffect, useState } from 'react';

import classes from './CitizenConversations.module.css';

const CitizenConversations = ({conversation, currentUser}) => {
    const [adminUser, setAdminUser] = useState(null);

    useEffect(() => {
        const adminId = conversation.members.find(m => m !== currentUser._id);

        const getAdminUser = async () => {
            try {
                const res = await axios.get('/api/admin/' + adminId);
                setAdminUser(res.data);
            } catch(err) {
                console.log(err);
            }
        }; 
        getAdminUser();
    }, [currentUser, conversation]);


    return(
        <div className={classes.CitizenConversations}>
            <img 
                className={classes.CitizenConversationsImg}
                src={adminUser?.profilePic ? adminUser?.profilePic : 'https://res.cloudinary.com/karlstorage/image/upload/v1633331543/free-img/nmcibwr00fuip3xo4pvr.png'}
                alt="sample"
            />
            <span className={classes.ConversationName}>{adminUser?.username ? adminUser?.username : <span> No longer available</span>}</span>
        </div>
    );
}

export default CitizenConversations;
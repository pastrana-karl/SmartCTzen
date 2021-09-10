import axios from 'axios';
import React, { useEffect } from 'react';

import classes from './AdminConversations.module.css';

const AdminConversations = ({conversation, currentUser}) => {
    //insert soon
    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const friendId = conversation.members.find(member => member !== currentUser._id);
    
    //     const getUser = async () => {
    //         const res = await axios('/citizens?id=' + friendId);
    //         console.log(res);
    //     }
    // }, []);

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
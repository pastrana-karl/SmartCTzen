import React from 'react';

import classes from './AdminMessage.module.css';

const AdminMessage = ({ own }) => {
    return (
        <div className={own ? classes.MessageOwn : classes.Message }>
            <div className={classes.MessageTop}>
                <img
                    className={classes.MessageImg}
                    src="https://images.pexels.com/photos/1165999/pexels-photo-1165999.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                    alt=""
                />
                <p className={classes.MessageText}>
                Hello! This is me This real!
                </p>
            </div>
            <div className={classes.MessageBottom}>
            1 hour ago
            </div>
        </div>
    );
}

export default AdminMessage;
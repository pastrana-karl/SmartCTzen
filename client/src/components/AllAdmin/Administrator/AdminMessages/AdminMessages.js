import React from 'react';

import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import AdminLayout from '../AdminLayout/AdminLayout';
import AdminConversations from './AdminConversations/AdminConversations';
import AdminMessage from './AdminMessage/AdminMessage';

import classes from './AdminMessages.module.css';

const AdminMessages = ( props ) => {
    return (
        <React.Fragment>
            <AdminLayout>
                <div className={classes.AdminMessages}>
                    <CardHeader>
                        <h2 className={classes.Text}>Messages</h2>
                    </CardHeader>
                </div>
                <div className={classes.Messenger}>
                    <div className={classes.AdminChatMenu}>
                        <input
                            placeholder="Search messages"
                            className={classes.AdminChatMenuSearch}
                        />
                        <AdminConversations />
                        <AdminConversations />
                        <AdminConversations />
                    </div>
                    <div className={classes.AdminChat}>
                        <div className={classes.AdminChatBoxTop}>
                            <AdminMessage />
                            <AdminMessage own />
                            <AdminMessage />
                        </div>
                        <div className={classes.AdminChatBoxBottom}>
                            
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </React.Fragment>
    );
};

export default AdminMessages;
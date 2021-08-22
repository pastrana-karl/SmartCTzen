import React from 'react';

import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import AdminLayout from '../AdminLayout/AdminLayout';

import classes from './AdminUsers.module.css';

const AdminUsers = ( props ) => {
    return (
        <React.Fragment>
            <AdminLayout>
                <div className={classes.AdminUsers}>
                    <CardHeader>
                        <h2 className={classes.Text}>Users</h2>
                    </CardHeader>
                </div>
            </AdminLayout>
        </React.Fragment>
    );
};

export default AdminUsers;
import React from 'react';

import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import AdminLayout from '../AdminLayout/AdminLayout';

import classes from './AdminProjects.module.css';

const AdminProjects = ( props ) => {
    return (
        <React.Fragment>
            <AdminLayout>
                <div className={classes.AdminProjects}>
                    <CardHeader>
                        <h2 className={classes.Text}>Projects</h2>
                    </CardHeader>
                </div>
            </AdminLayout>
        </React.Fragment>
    );
};

export default AdminProjects;
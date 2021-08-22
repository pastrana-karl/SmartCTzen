import React from 'react';

import AdminLayout from '../AdminLayout/AdminLayout';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';

import classes from './AdminReports.module.css';

const AdminReports = ( props ) => {
    return (
        <React.Fragment>
            <AdminLayout>
                <div className={classes.AdminReports}>
                    <CardHeader>
                        <h2 className={classes.Text}>Reports</h2>
                    </CardHeader>
                </div>
            </AdminLayout>
        </React.Fragment>
    );
};

export default AdminReports;
import React from 'react';

import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import AdminLayout from '../AdminLayout/AdminLayout';

import classes from './AdminApplicants.module.css';

const AdminApplicants = ( props ) => {
    return (
        <React.Fragment>
            <AdminLayout>
                <div className={classes.AdminApplicants}>
                    <CardHeader>
                        <h2 className={classes.Text}>Applicants</h2>
                    </CardHeader>
                </div>
            </AdminLayout>
        </React.Fragment>
    );
};

export default AdminApplicants;
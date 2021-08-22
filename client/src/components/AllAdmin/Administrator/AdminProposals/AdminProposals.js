import React from 'react';

import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import AdminLayout from '../AdminLayout/AdminLayout';

import classes from './AdminProposals.module.css';

const AdminProposals = () => {
    return (
        <React.Fragment>
            <AdminLayout>
                <div className={classes.AdminProposals}>
                    <CardHeader>
                        <h2 className={classes.Text}>Proposals</h2>
                    </CardHeader>
                </div>
            </AdminLayout>
        </React.Fragment>
    );
};

export default AdminProposals;
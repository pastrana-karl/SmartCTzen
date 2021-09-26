import React from 'react';

import AdminLayout from '../AdminLayout/AdminLayout';
import CardSummary from '../../../UI/Cards/CardDashboard/CardSummary';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import CardGraph from '../../../UI/Cards/CardDashboard/CardGraph/CardGraph';

import classes from './AdminProjectsDashboard.module.css';

const AdminProjectsDashboard = () => {
    return (
        <AdminLayout>
            <div className={classes.AdminProjectsDashboard}>
                <CardHeader>
                    <h2 className={classes.Text}>Reports Summary</h2>
                </CardHeader>
            </div>
            <div className={classes.ProjectSummary}>
                <div className={classes.SummaryCard}>
                    <CardSummary></CardSummary>
                    <CardSummary></CardSummary>
                    <CardSummary></CardSummary>
                    <CardSummary></CardSummary>
                    <CardSummary></CardSummary>
                </div>
                <div className={classes.SummaryGraph}>
                    <CardGraph>Insert Graph</CardGraph>
                </div>
                    {/* <CardSummary></CardSummary>
                    <CardSummary></CardSummary>
                    <CardGraph>Insert Graph</CardGraph>
                    <CardSummary></CardSummary>
                    <CardSummary></CardSummary> */}
            </div>
        </AdminLayout>
    );
};

export default AdminProjectsDashboard;
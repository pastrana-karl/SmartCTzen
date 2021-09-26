import React from 'react';

import AdminLayout from '../AdminLayout/AdminLayout';
import CardSummary from '../../../UI/Cards/CardDashboard/CardSummary';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import CardGraph from '../../../UI/Cards/CardDashboard/CardGraph/CardGraph';

import classes from './AdminReportsDashboard.module.css';

const AdminReportsDashboard = () => {
    return (
        <AdminLayout>
            <div className={classes.AdminReportsDashboard}>
                <CardHeader>
                    <h2 className={classes.Text}>Reports Summary</h2>
                </CardHeader>
            </div>
            <div className={classes.ReportsSummary}>
                <div className={classes.SummaryCard}>
                    <CardSummary>
                        <h4 className={classes.SummaryCardHeader}>Total Reports</h4>
                        <p className={classes.SummaryDataText}>10</p>
                    </CardSummary>
                    <CardSummary>
                        <h4 className={classes.SummaryCardHeader}>Cancelled Reports</h4>
                        <p className={classes.SummaryDataText}>10</p>
                    </CardSummary>
                    <CardSummary>
                        <h4 className={classes.SummaryCardHeader}>Confirmed Reports</h4>
                        <p className={classes.SummaryDataText}>10</p>
                    </CardSummary>
                    <CardSummary>
                        <h4 className={classes.SummaryCardHeader}>Resolved Reports</h4>
                        <p className={classes.SummaryDataText}>10</p>
                    </CardSummary>
                    <CardSummary>
                        <h4 className={classes.SummaryCardHeader}>Percentage</h4>
                        <p className={classes.SummaryDataText}>10</p>
                    </CardSummary>
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

export default AdminReportsDashboard;
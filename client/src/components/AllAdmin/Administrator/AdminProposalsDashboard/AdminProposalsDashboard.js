import React from 'react';

import AdminLayout from '../AdminLayout/AdminLayout';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import CardSummary from '../../../UI/Cards/CardDashboard/CardSummary';

import classes from './AdminProposalsDashboard.module.css';
import Tables from '../../../UI/Tables/Tables';

const AdminProposalsDashboard = () => {
    return (
        <AdminLayout>
            <div className={classes.AdminProposalsDashboard}>
                <CardHeader>
                <h2 className={classes.Text}>Proposals Summary</h2>
                </CardHeader>
            </div>
            <div className={classes.LeaderboardsHeader}>
                <h3>Leaderboards</h3>
            </div>
            <div className={classes.Divider}>
                <div className={classes.TableDiv}>
                    <table className={classes.Table}>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Proposal ID</th>
                                <th>Proposal Title</th>
                                <th>Upvote</th>
                                <th>Downvote</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>rank</td>
                                <td>proposal id</td>
                                <td>proposal title</td>
                                <td>upvote</td>
                                <td>downvote</td>
                                <td>percentage</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={classes.CardData}>
                    <CardSummary>
                        <h4 className={classes.SummaryCardHeader}>Approved Proposals</h4>
                        <p className={classes.SummaryDataText}>10</p>
                    </CardSummary>
                    <CardSummary>
                        <h4 className={classes.SummaryCardHeader}>Rejected Proposals</h4>
                        <p className={classes.SummaryDataText}>10</p>
                    </CardSummary>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminProposalsDashboard;
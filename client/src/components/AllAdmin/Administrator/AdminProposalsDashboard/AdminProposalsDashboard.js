import React, { useEffect, useState } from 'react';
import axios from 'axios'

import AdminLayout from '../AdminLayout/AdminLayout';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import CardSummary from '../../../UI/Cards/CardDashboard/CardSummary';

import classes from './AdminProposalsDashboard.module.css';
import Tables from '../../../UI/Tables/Tables';

const AdminProposalsDashboard = () => {
    const [topProposals, setTopProposals] = useState([]);
    const [accepted, setAccepted] = useState([]);
    const [rejected, setRejected] = useState([]);
    let rCount = 0;
    
    useEffect(() => {
        const fetchTopProposals = async () => {
            const res = await axios.get('/api/proposals/topProposals');
            setTopProposals(res.data);
        }

        fetchTopProposals();
    }, []);

    useEffect(() => {
        
        const fetchApproved = async () => {
            const res = await axios.get('/api/proposals/approved');
            let count = 0
            
            res.data.forEach(() => {
            count += 1;
            })

            setAccepted(count);
        }

        fetchApproved();
    }, []);

    useEffect(() => {
        const fetchRejected = async () => {
            const res = await axios.get('/api/proposals/rejected');
            let count = 0
            
            res.data.forEach(() => {
            count += 1;
            })

            setRejected(count);
        }

        fetchRejected();
    }, []);

    console.log(topProposals);
    console.log(accepted);
    console.log(rejected);

    
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
                            {topProposals.map((p) => (
                                <tr key = {p._id}>
                                    <td>{++rCount}</td>
                                    <td>{p._id}</td>
                                    <td>{p.title}</td>
                                    <td>{p.upvote.length}</td>
                                    <td>{p.downvote.length}</td>
                                    <td>{Math.trunc(((p.upvote.length - p.downvote.length) / (p.upvote.length + p.downvote.length)) * 100)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={classes.CardData}>
                    <CardSummary>
                        <h4 className={classes.SummaryCardHeader}>Approved Proposals</h4>
                        <p className={classes.SummaryDataText}>{accepted}</p>
                    </CardSummary>
                    <CardSummary>
                        <h4 className={classes.SummaryCardHeader}>Rejected Proposals</h4>
                        <p className={classes.SummaryDataText}>{rejected}</p>
                    </CardSummary>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminProposalsDashboard;
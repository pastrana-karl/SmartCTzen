import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

import AdminLayout from '../AdminLayout/AdminLayout';
import CardSummary from '../../../UI/Cards/CardDashboard/CardSummary';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import CardGraph from '../../../UI/Cards/CardDashboard/CardGraph/CardGraph';

import classes from './AdminReportsDashboard.module.css';

const AdminReportsDashboard = () => {
    const [report, setReport] = useState([]);
    const [resolved, setResolved] = useState([]);
    const [confirmed, setConfirmed] = useState([]);
    const [cancelled, setCancelled] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            const res = await axios.get('/api/reports');
            let count = 0
            
            res.data.forEach(() => {
                count += 1;
            })

            setReport(count);
        }

        const fetchResolved = async () => {
            const res = await axios.get('/api/reports/resolved');
            let count = 0
            
            res.data.forEach(() => {
                count += 1;
            })

            setResolved(count);
        }

        const fetchConfirmed = async () => {
            const res = await axios.get('/api/reports/confirmed');
            let count = 0
            
            res.data.forEach(() => {
                count += 1;
            })

            setConfirmed(count);
        }

        const fetchCancelled = async () => {
            const res = await axios.get('/api/reports/cancelled');
            let count = 0
            
            res.data.forEach(() => {
                count += 1;
            })

            setCancelled(count);
        }

        fetchResolved();
        fetchConfirmed();
        fetchCancelled();
        fetchReports();
    }, []);

    const state = {
        labels: ['Resolved', 'Confirmed', 'Cancelled'],
        datasets: [
          {
            label: 'Reports',
            backgroundColor: '#fe5139',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: [resolved, confirmed, cancelled]
          }
        ]
    }

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
                        <p className={classes.SummaryDataText}>{report}</p>
                    </CardSummary>
                    <CardSummary>
                        <h4 className={classes.SummaryCardHeader}>Cancelled Reports</h4>
                        <p className={classes.SummaryDataText}>{cancelled}</p>
                    </CardSummary>
                    <CardSummary>
                        <h4 className={classes.SummaryCardHeader}>Confirmed Reports</h4>
                        <p className={classes.SummaryDataText}>{confirmed}</p>
                    </CardSummary>
                    <CardSummary>
                        <h4 className={classes.SummaryCardHeader}>Resolved Reports</h4>
                        <p className={classes.SummaryDataText}>{resolved}</p>
                    </CardSummary>
                </div>
                <div className={classes.SummaryGraph}>
                    <CardGraph>
                        <div>
                            <Bar
                            data={state}
                            options={{
                                plugins:{
                                    title:{
                                        display: true,
                                        text: 'Average Reports This Month',
                                        fontSize: '100px'
                                    },
                                    legend:{
                                        display:true,
                                        position:'right'
                                    }
                                }
                            }}
                            />
                        </div>
                    </CardGraph>
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
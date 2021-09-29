import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AdminLayout from '../AdminLayout/AdminLayout';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import Tables from '../../../UI/Tables/Tables';

import classes from './AdminReports.module.css';

const AdminReports = () => {
    const [reports, setReports] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch('/api/reports');
            const responseData = await response.json();

            setReports(responseData);
        };
        sendRequest();
    }, []);

    console.log(reports);
    return (
        <React.Fragment>
            <AdminLayout>
                <div className={classes.AdminReports}>
                    <CardHeader>
                        <h2 className={classes.Text}>Reports</h2>
                    </CardHeader>
                </div>
                <Tables>
                    <thead>
                        <tr>
                            <th>Report ID</th>
                            <th>Report Title</th>
                            <th>Date Reported</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports && reports.map(report => (
                        <tr key={report._id}>
                            <td>{report._id}</td>
                            <td>{report.title}</td>
                            <td>{report.date}</td>
                            <td>{report.location}</td>
                            <td>{report.status}</td>
                            <td><Link to={'/admin-report/' + report._id}>Click here</Link></td>
                        </tr>
                        ))}
                    </tbody>
                </Tables>

            </AdminLayout>
        </React.Fragment>
    );
};

export default AdminReports;
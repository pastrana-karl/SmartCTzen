import React, { useEffect, useState } from 'react';

import AdminLayout from '../AdminLayout/AdminLayout';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import Tables from '../../../UI/Tables/Tables';

import classes from './AdminReports.module.css';

const AdminReports = ( props ) => {
    const [reports, setReports] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch('/api/reports');

            const responseData = await response.json();

            setReports(responseData.data.reports);
        };
        sendRequest();
    }, []);

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
                            <th>Time Reported</th>
                            <th>Location</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports && reports.map(report => (
                        <tr key={report._id}>
                            <td>{report._id}</td>
                            <td>{report.title}</td>
                            <td>{report.date}</td>
                            <td>Time</td>
                            <td>{report.location}</td>
                            <td>{report.status}</td>
                        </tr>
                        ))}
                    </tbody>
                </Tables>

            </AdminLayout>
        </React.Fragment>
    );
};

export default AdminReports;
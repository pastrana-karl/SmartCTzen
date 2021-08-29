import React, { useEffect, useState } from 'react';

import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import Tables from '../../../UI/Tables/Tables';
import AdminLayout from '../AdminLayout/AdminLayout';

import classes from './AdminProjects.module.css';

const AdminProjects = ( props ) => {
    const [projects, setProjects] = useState();    

    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch('/api/projects');

            const responseData = await response.json();

            setProjects(responseData.data.projects);
        };
        sendRequest();
    });

    return (
        <React.Fragment>
            <AdminLayout>
                <div className={classes.AdminProjects}>
                    <CardHeader>
                        <h2 className={classes.Text}>Projects</h2>
                    </CardHeader>
                </div>
                <Tables>
                    <thead>
                        <tr>
                            <th>Project ID</th>
                            <th>Project Title</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects && projects.map(project => (
                        <tr key={project._id}>
                            <td>{project._id}</td>
                            <td>{project.date}</td>
                            <td>Time</td>
                            <td>{project.status}</td>
                        </tr>
                        ))}
                    </tbody>
                </Tables>
            </AdminLayout>
        </React.Fragment>
    );
};

export default AdminProjects;
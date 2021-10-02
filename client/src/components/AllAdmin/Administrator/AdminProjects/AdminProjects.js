import React, { useEffect, useState, useParams } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import Tables from '../../../UI/Tables/Tables';
import AdminLayout from '../AdminLayout/AdminLayout';

import classes from './AdminProjects.module.css';

const AdminProjects = ( props ) => {
    const [projects, setProjects] = useState();    
    // const { handle } = useParams();

    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch('/api/projects');
            const responseData = await response.json();
            setProjects(responseData.data.projects);
        };
        sendRequest();
    }, []);

    //const string = 'watch?v=S_mgSHCWCmA';
    console.log(projects);
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
                            <th>Location</th>
                            <th>Status</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects && projects.map(project => (
                        <tr key={project._id}>
                            <td>{project._id}</td>
                            <td>{project.title}</td>
                            <td>{project.location}</td>
                            <td>{project.status}</td>
                            <td>{format(project.createdAt)}</td>
                            <td>{format(project.updatedAt)}</td>
                            <td>
                                <Link to={'/admin-project/' + project._id}>Click here</Link>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Tables>
                <div className={classes.ButtonDiv}>
                    <Link to='/admin-create-projects'>
                        <button className={classes.Button}>Create Projects</button>
                    </Link>
                </div>
            </AdminLayout>
        </React.Fragment>
    );
};

export default AdminProjects;
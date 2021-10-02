import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import Tables from '../../../UI/Tables/Tables';
import AdminLayout from '../AdminLayout/AdminLayout';

import classes from './AdminProposals.module.css';

const AdminProposals = () => {
    //Without AXIOS
    const [proposals, setProposals] = useState();
    
    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch('api/proposals');
            
            const responseData = await response.json();

            setProposals(responseData.data.proposals);
        };
        sendRequest();
    }, []);

    const string = 'watch?v=S_mgSHCWCmA';

    return (
        <React.Fragment>
            <AdminLayout>
                <div className={classes.AdminProposals}>
                    <CardHeader>
                        <h2 className={classes.Text}>Proposals</h2>
                    </CardHeader>
                </div>
                <Tables>
                    <thead>
                        <tr>            
                            <th>ID</th>  
                            <th>Title</th>
                            <th>Location</th>
                            <th>Upvote</th>
                            <th>Downvote</th>
                            <th>Status</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proposals && proposals.map((proposal) => (
                        <tr key={proposal._id}>
                            <td>{proposal._id}</td>
                            <td>{proposal.title}</td>
                            <td>{proposal.location}</td>
                            <td>{proposal.upvote}</td>
                            <td>{proposal.downvote}</td>
                            <td>{proposal.status}</td>
                            <td><Link to={'/admin-proposal/' + proposal._id}>Click here</Link></td>
                        </tr>
                        ))}
                    </tbody>
                </Tables>
                <div className={classes.ButtonDiv}>
                    <Link to='/admin-create-proposals'>
                        <button className={classes.Button}>Create Proposals</button>
                    </Link>
                </div>
            </AdminLayout>
        </React.Fragment>
    );
};

export default AdminProposals;
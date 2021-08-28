import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';

import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import Tables from '../../../UI/Tables/Tables';
import AdminLayout from '../AdminLayout/AdminLayout';

import classes from './AdminProposals.module.css';
import { PROPOSALS } from './AdminProposalsTable/AdminProposalsHeader';

const AdminProposals = () => {
    //Without AXIOS
    const [proposals, setProposals] = useState();
    
    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch('/api/initiatives');
            
            const responseData = await response.json();

            setProposals(responseData.data.initiatives);
        };
        sendRequest();
    }, []);

    //With AXIOS
    // const [proposals, setProposals] = useState({ data: {} });

    // const proposalsCol = useMemo(() => PROPOSALS, []);
    // // const proposalsData = useMemo(() => proposals, []);

    // const proposalsData = useEffect(() => {
    //     const getProposals = async () => {
    //         const res = await axios.get('/api/initiatives');
    //         const responseData = await res.data;

    //         setProposals({ data: responseData.data.initiatives });
    //     };
    //     getProposals();
    // }, []);

    // const { 
    //     getTableProps, 
    //     getTableBodyProps, 
    //     headerGroups, 
    //     rows, 
    //     prepareRow 
    // } = tableInstance;

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
                            <th>Date</th>
                            <th>Location</th>
                            <th>Upvote</th>
                            <th>Downvote</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proposals && proposals.map((proposal) => (
                        <tr key={proposal._id}>
                            <td>{proposal._id}</td>
                            <td>{proposal.title}</td>
                            <td>{proposal.date}</td>
                            <td>{proposal.location}</td>
                            <td>{proposal.upvote}</td>
                            <td>{proposal.downvote}</td>
                            <td>{proposal.status}</td>
                        </tr>
                        ))}
                    </tbody>
                </Tables>
            </AdminLayout>
        </React.Fragment>
    );
};

export default AdminProposals;
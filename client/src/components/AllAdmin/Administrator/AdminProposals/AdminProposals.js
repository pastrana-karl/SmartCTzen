import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';

import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import Tables from '../../../UI/Tables/Tables';
import AdminLayout from '../AdminLayout/AdminLayout';

import classes from './AdminProposals.module.css';
import { PROPOSALS } from './AdminProposalsTable/AdminProposalsHeader';

const AdminProposals = () => {
    const [proposals, setProposals] = useState();

    const proposalsCol = useMemo(() => PROPOSALS, []);
    const data = useMemo(() => proposals, []);

    useEffect(() => {
        const sendRequest = async () => {
            const response = axios.get('http://localhost:8080/api/initiatives');
            const proposalsData = await response.json();

            setProposals(proposalsData.data);
        };
        sendRequest();
    }, []);

    const tableInstance = useTable({
        columns: PROPOSALS,
        data: setProposals
    });

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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </Tables>
            </AdminLayout>
        </React.Fragment>
    );
};

export default AdminProposals;
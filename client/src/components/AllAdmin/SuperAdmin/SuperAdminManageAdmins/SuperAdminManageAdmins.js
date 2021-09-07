import React from 'react';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import Tables from '../../../UI/Tables/Tables';
import SuperAdminLayout from '../SuperAdminLayout';

import classes from './SuperAdminManageAdmins.module.css';

const SuperAdminManageAdmins = ( props ) => (
    <React.Fragment>
        <SuperAdminLayout>
            <CardHeader>
             <h2 className={classes.Text}>Administrators</h2>
            </CardHeader>
            <h3>Search Input</h3>
            <Tables>
                <thead>
                    <tr>
                        <th>Administrator ID</th>
                        <th>City/Municipality</th>
                        <th>Email address</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </Tables>
        </SuperAdminLayout>
    </React.Fragment>
);

export default SuperAdminManageAdmins;
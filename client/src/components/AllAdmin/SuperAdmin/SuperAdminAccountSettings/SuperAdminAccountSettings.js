import React, { useState } from 'react';

import SuperAdminContainer from '../../../UI/SuperAdminContainer/SuperAdminContainer';
import SuperAdminLayout from '../SuperAdminLayout';
import Input from '../../../UI/Input/Input';

import classes from './SuperAdminAccountSettings.module.css';
import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';

const SuperAdminAccountSettings = ( props ) => {
    const [inputEmail, setInputEmail] = useState();

    return (
        <React.Fragment>
            <SuperAdminLayout>
                <CardHeader>
                    <h2 className={classes.Text}>Account Settings</h2>
                </CardHeader>
                <SuperAdminContainer>
                    <form className={classes.SuperAdminForm}>
                        <div className={classes.SuperAdminContainerDiv}>
                            <label>Email address</label>
                            <Input
                                type="email"
                                placeholder="Email address"
                                id="email-address"
                            />
                        </div>
                        <div className={classes.SuperAdminContainerDiv}>
                            <label>Password</label>
                            <Input 
                                type="password"
                                placeholder="Password"
                                id="password"
                            />
                        </div>
                        <div className={classes.SuperAdminButtonDiv}>
                            <SubmitButton />
                            <CancelButton />
                        </div>
                    </form>
                </SuperAdminContainer>
            </SuperAdminLayout>
        </React.Fragment>
    );
};

export default SuperAdminAccountSettings;
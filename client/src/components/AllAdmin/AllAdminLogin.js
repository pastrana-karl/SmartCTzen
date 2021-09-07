import React, { useState } from 'react';

import CardForm from '../UI/Cards/CardForm/CardForm';
import Input from '../UI/Input/Input';
import LoginButton from '../UI/Buttons/LoginButton/LoginButton';
import classes from './AllAdminLogin.module.css';

const AllAdminsLogin = () => {

    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');


    return (
        <div className={classes.Content}>
            <CardForm>
                <h3>SmartCTLogo</h3>
                <Input
                    type="email"
                    placeholder="Email address"
                    id="email"
                    value={inputEmail}
                    onChange={(event) => {
                    setInputEmail(event.target.value);
                    }} 
                />
                <Input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={inputPassword}
                    onChange={(event) => {
                    setInputPassword(event.target.value);
                    }} 
                />
                <div className={classes.ButtonDiv}>
                    <LoginButton />
                </div>
                <div className={classes.HyperlinkDiv}>
                    <a href="/forgot-password" className={classes.Hyperlink}>
                    Forgot Password
                    </a>
                </div>
            </CardForm>
        </div>
    );
};

export default AllAdminsLogin;
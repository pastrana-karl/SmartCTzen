import React, { useState, useRef, useContext } from 'react';

import CardForm from '../../../UI/Cards/CardForm/CardForm';
import Input from '../../../UI/Input/Input';
import LoginButton from '../../../UI/Buttons/LoginButton/LoginButton';
import { loginCall } from '../../../../api_calls/ApiCalls';
import { AuthContext } from '../../../../admin_context/AuthContext';

import classes from './AdminLogin.module.css';

const AdminLogin = () => {

    // const [inputEmail, setInputEmail] = useState('');
    // const [inputPassword, setInputPassword] = useState('');

    // const email = useRef();
    // const password = useRef();

    // CODE FOR AUTHENTICATION FOLLOWING LAMA DEV SOCMED
    // const { user, isFetching, error, dispatch } = useContext(AuthContext);

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     loginCall({ 
    //         email: email.current.value, 
    //         password: password.current.value }, 
    //         dispatch);
    // };

    // console.log(user);
    return (
        <div className={classes.Content}>
            <CardForm >
                <h3>SmartCTLogo</h3>
                <Input
                    type="email"
                    placeholder="Email address"
                    id="email"

                />
                <Input
                    type="password"
                    placeholder="Password"
                    id="password"

                />
                <div className={classes.ButtonDiv}>
                    <LoginButton type="submit" />
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

export default AdminLogin;
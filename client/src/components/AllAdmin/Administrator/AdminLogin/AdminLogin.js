import React, { useState, useContext } from 'react';
import CardForm from '../../../UI/Cards/CardForm/CardForm';
import Input from '../../../UI/Input/Input';
import LoginButton from '../../../UI/Buttons/LoginButton/LoginButton';
import { Context } from '../../../../context/Context';
import axios from 'axios';
import classes from './AdminLogin.module.css';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "ALOGIN_START" });

    try {
        const res = await axios.post("/api/admin/login", {
            email,
            password,
        })

        dispatch({ type: "ALOGIN_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({ type: "ALOGIN_FAILURE" });
    }
  };

    return (
        <div className={classes.Content}>
            <CardForm onSubmit = { handleSubmit }>
                <h3>SmartCTLogo</h3>
                <Input
                    type="email"
                    placeholder="Email address"
                    onChange = {e => setEmail(e.target.value)} 
                    id="email"
                />
                <Input
                    type="password"
                    placeholder="Password"
                    onChange = {e => setPassword(e.target.value)} 
                    id="password"

                />
                <div className={classes.ButtonDiv}>
                    <LoginButton type="submit"/>
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
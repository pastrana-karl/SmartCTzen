import React, { useState } from 'react';

import CardForm from '../../../UI/Cards/CardForm/CardForm';
import Input from '../../../UI/Input/Input';
import LoginButton from '../../../UI/Buttons/LoginButton';
import classes from './LoginForm.module.css';

const LoginForm = () => {

    // const inputState = useState({ title: '', password: ''});
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    return (
      <React.Fragment>
        <CardForm>
          <div>SmartCT Logo</div>
          <div className={classes.LoginCredentials}>
            <Input
              type="email"
              placeholder="Email address"
              id="email"
              value={inputEmail}
              onChange={(event) => {
                setInputEmail(event.target.value);
              }}
            />
          </div>
          <div className={classes.LoginCredentials}>
            <Input
              type="password"
              placeholder="Password"
              className={classes.Input}
              id="password"
              value={inputPassword}
              onChange={(event) => {
                setInputPassword(event.target.value);
              }}
            />
          </div>
          <div className={classes.ButtonDiv}>
            <LoginButton className={classes.Button}>Login</LoginButton>
          </div>
          <div className={classes.HyperlinkDiv}>
            <a href="/forgot-password" className={classes.Hyperlink}>
              Forgot Password
            </a>
          </div>
          <div className={classes.HyperlinkDiv}>
            <a href="/create-account" className={classes.Hyperlink}>
              Register
            </a>
          </div>
        </CardForm>
      </React.Fragment>
    );
}

export default LoginForm; 
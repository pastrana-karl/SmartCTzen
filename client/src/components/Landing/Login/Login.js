import React from 'react';
import layoutStyle from '../../Layout/Layout.module.css';
import LoginForm from './LoginForm/LoginForm';
import classes from './Login.module.css';

const Login = () => {
    return (
        <div className={layoutStyle.Background}>
            <React.Fragment>
                <div className={classes.Content}>
                    <div>
                        <h1>Be a SmartCTzen</h1>
                        <h4>Image</h4>
                    </div>
                    <LoginForm />
                </div>
            </React.Fragment>
        </div>
    );
};

export default Login;
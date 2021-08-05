import React from 'react';

import classes from './LoginForm.module.css';

const LoginForm = () => {
    return (
        <React.Fragment>
            <form className={classes.LoginForm}>
                <div>SmartCT Logo</div>
                <div className={classes.LoginCredentials}>
                    {/* <label>Email address</label> */}
                    <input type="email" placeholder="Email address" className={classes.Input} />
                    {/* <input type="password" placeholder="Password" /> */}
                </div>
                <div className={classes.LoginCredentials}>
                    {/* <label>Password</label> */}
                    <input type="password" placeholder="Password" className={classes.Input} />
                </div>
                <div className={classes.ButtonDiv}>
                    <button className={classes.Button}>Login</button>
                </div>
                <div className={classes.HyperlinkDiv}>
                    <a href="/forgot-password" className={classes.Hyperlink}>Forgot Password</a>
                </div>
                <div className={classes.HyperlinkDiv}>
                    <a href="/create-account" className={classes.Hyperlink}>Register</a>
                </div>
            </form>
        </React.Fragment>
    );
}

export default LoginForm;
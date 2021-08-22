import React from 'react';

import classes from './AdminProfileButton.module.css';

const AdminProfileButton = ( props ) => (
    <button
        className={classes.AdminProfileButton}
        onClick={props.onClick}
    >{props.children}</button>
);

export default AdminProfileButton;
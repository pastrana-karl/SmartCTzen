import React from 'react';

import classes from './SuperAdminToolbar.module.css';

const SuperAdminToolbar = ( props ) => (
    <div className={classes.Toolbar}>{props.children}</div>
);

export default SuperAdminToolbar;
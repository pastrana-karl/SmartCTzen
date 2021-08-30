import React from 'react';

import classes from './SuperAdminContentNavBar.module.css';

const SuperAdminContentNavBar = ( props ) => (
    <div className={classes.SuperAdminContentNavBar}>{props.children}</div>
);

export default SuperAdminContentNavBar;
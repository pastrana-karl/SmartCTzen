import React from 'react';

import classes from './SuperAdminContentNavItems.module.css';

const SuperAdminContentNavItems = ( props ) => (
    <React.Fragment>
        <div className={classes.SuperAdminContentNavItems}>
            <button className={classes.SuperAdminContentButton}>Home</button>
            <button className={classes.SuperAdminContentButton}>Features</button> 
        </div>
    </React.Fragment>
);

export default SuperAdminContentNavItems;
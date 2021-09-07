import React from 'react';

import classes from './SuperAdminContainer.module.css';

const SuperAdminContainer = ( props ) => (
    <form className={classes.SuperAdminContainer}>
        {props.children}
    </form>
);

export default SuperAdminContainer;
import React from 'react';

import classes from './SuperAdminNavigationItems.module.css';

const SuperAdminNavigationItems = ( props ) => (
    <ul className={classes.SuperAdminNavigationItems}>{props.children}</ul>
);

export default SuperAdminNavigationItems;
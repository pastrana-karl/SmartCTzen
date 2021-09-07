import React from 'react';

import { NavLink } from 'react-router-dom';

import classes from './SuperAdminNavigationItem.module.css';

const SuperAdminNavigationItem = ( props ) => (
    <li className={classes.SuperAdminNavigationItem}>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}
        >{props.children}</NavLink>
    </li>
);

export default SuperAdminNavigationItem;
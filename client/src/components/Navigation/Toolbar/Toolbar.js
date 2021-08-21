import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        {props.children}
    </header>
);

export default Toolbar;
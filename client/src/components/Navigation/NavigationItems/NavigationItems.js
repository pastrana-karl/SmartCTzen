import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/smartctzens-features">Features</NavigationItem>
        <NavigationItem link="/smartctzens-login">Login</NavigationItem>
    </ul>
);

export default NavigationItems;
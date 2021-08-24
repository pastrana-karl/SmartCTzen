import React from 'react';

import NavigationItem from '../../UI/Navigation/NavigationItems/NavigationItem/NavigationItem';
import NavigationItems from '../../UI/Navigation/NavigationItems/NavigationItems';
import Toolbar from '../../UI/Navigation/Toolbar/Toolbar';

import classes from './LandingLayout.module.css';

const LandingLayout = ( props ) => (
    <React.Fragment>
        <Toolbar>
            <NavigationItems>
                <NavigationItem link="/" >Home</NavigationItem>
                <NavigationItem link="/features" >Features</NavigationItem>
                <NavigationItem link="/login" >Login</NavigationItem>
            </NavigationItems>
        </Toolbar>

        <main className={classes.Content} >{props.children}</main>
    </React.Fragment>
);

export default LandingLayout;
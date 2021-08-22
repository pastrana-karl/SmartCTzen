import React from 'react';

import Toolbar from '../../../UI/Navigation/Toolbar/Toolbar';
import NavigationItems from '../../../UI/Navigation/NavigationItems/NavigationItems';
import NavigationItem from '../../../UI/Navigation/NavigationItems/NavigationItem/NavigationItem';

import classes from './AdminLayout.module.css';

const AdminLayout = ( props ) => {
    return (
        <React.Fragment>
            <Toolbar>
                <NavigationItems>
                    <NavigationItem link="/admin-profile" >Profile</NavigationItem>
                    <NavigationItem link="/admin-proposals" >Proposals</NavigationItem>
                    <NavigationItem link="/admin-reports" >Reports</NavigationItem>
                    <NavigationItem link="/admin-messages" >Messages</NavigationItem>
                    <NavigationItem link="/admin-projects" >Projects</NavigationItem>
                    <NavigationItem link="/admin-users" >Users</NavigationItem>
                    <NavigationItem link="/admin-applicants" >Applicants</NavigationItem>
                    <NavigationItem link="/admin-logout" >Logout</NavigationItem>
                </NavigationItems>
            </Toolbar>

            <main className={classes.Content}>{props.children}</main>
        </React.Fragment>
    );
};

export default AdminLayout;
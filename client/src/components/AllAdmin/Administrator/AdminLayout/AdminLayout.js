import React, { useContext } from 'react';

import Toolbar from '../../../UI/Navigation/Toolbar/Toolbar';
import NavigationItems from '../../../UI/Navigation/NavigationItems/NavigationItems';
import NavigationItem from '../../../UI/Navigation/NavigationItems/NavigationItem/NavigationItem';

import classes from './AdminLayout.module.css';
import { Context } from '../../../../context/Context';


const AdminLayout = ( props ) => {

    const { dispatch } = useContext(Context);

    const handleLogout = () => {
        dispatch({ type: "ALOGOUT" })
    }
    
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
                    <NavigationItem link="/Applicants" >Applicants</NavigationItem>
                    <NavigationItem  onClick={handleLogout} link="/admin-login" >Logout</NavigationItem>
                </NavigationItems>
            </Toolbar>

            <main className={classes.Content}>{props.children}</main>
        </React.Fragment>
    );
};

export default AdminLayout;
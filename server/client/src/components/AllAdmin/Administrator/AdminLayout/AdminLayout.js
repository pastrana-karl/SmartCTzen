import React, { useContext } from 'react';
import Toolbar from '../../../UI/Navigation/Toolbar/Toolbar';
import NavigationItems from '../../../UI/Navigation/NavigationItems/NavigationItems';
import NavigationItem from '../../../UI/Navigation/NavigationItems/NavigationItem/NavigationItem';
import classes from './AdminLayout.module.css';
import { Context } from '../../../../context/Context';
import axios from 'axios';


const AdminLayout = ( props ) => {

    const { aUser, dispatch } = useContext(Context);

    const handleLogout = async () => {
        const onlineStatus = {
            adminID: aUser.data.user._id,
        }

        try {
            await axios.post('/api/admin/adminLogout', onlineStatus);
            dispatch({ type: "ALOGOUT" });
        } catch (err) {
            console.log(err.response);
        }
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
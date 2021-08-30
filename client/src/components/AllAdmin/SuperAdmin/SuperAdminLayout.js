import React from 'react';

import SuperAdminToolbar from '../../UI/SuperAdminNavigation/SuperAdminToolbar/SuperAdminToolbar';
import SuperAdminNavigationItem from '../../UI/SuperAdminNavigation/SuperAdminNavigationItems/SuperAdminNavigationItem/SuperAdminNavigationItem';
import SuperAdminNavigationItems from '../../UI/SuperAdminNavigation/SuperAdminNavigationItems/SuperAdminNavigationItems';

import classes from './SuperAdminLayout.module.css';

const SuperAdminLayout = ( props ) => (
    <React.Fragment>
            <div className={classes.Content}>
                <SuperAdminToolbar>
                    <SuperAdminNavigationItems>
                        <SuperAdminNavigationItem link="/super-admin/content">Content</SuperAdminNavigationItem>
                        <SuperAdminNavigationItem link="/super-admin/manage-admins">Administrators</SuperAdminNavigationItem>
                        <SuperAdminNavigationItem link="/super-admin/account-settings">Account Settings</SuperAdminNavigationItem>
                        <SuperAdminNavigationItem link="/super-admin/logout">Logout</SuperAdminNavigationItem>
                    </SuperAdminNavigationItems>
                </SuperAdminToolbar>

                <main>{props.children}</main>
            </div>
    </React.Fragment>
);

export default SuperAdminLayout;
import React from 'react';

import Toolbar from '../../../Navigation/Toolbar/Toolbar';
import NavigationItems from '../../../UI/NavigationItems/NavigationItems';
import NavigationItem from '../../../Navigation/NavigationItems/NavigationItem/NavigationItem';

const AdminLayout = () => (
    <React.Fragment>
        <Toolbar>
            <NavigationItems>
                <NavigationItem link="/" exact>Home</NavigationItem>
                <NavigationItem link="/smartctzens-features">Features</NavigationItem>
                <NavigationItem link="/smartctzens-login">Login</NavigationItem>
            </NavigationItems>
        </Toolbar>
    </React.Fragment>
);

export default AdminLayout;
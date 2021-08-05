import React from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import Background from '../UI/Background/Background';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

const Layout = ( props ) => (
    <React.Fragment>
        {/* <div className={classes.Scroll}> */}
            {/* <Background /> */}
            <Toolbar />
            <SideDrawer />

            <main className={classes.Content}>
                {props.children}
            </main>
        {/* </div> */}
        

    </React.Fragment>
);

export default Layout;
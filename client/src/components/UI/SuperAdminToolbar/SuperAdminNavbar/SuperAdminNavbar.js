import React from 'react';

import classes from './SuperAdminNavbar.module.css';

const SuperAdminNavbar = ( props ) => (
    <React.Fragment>
        <nav>
            {props.children}
        </nav>
    </React.Fragment>
);

export default SuperAdminNavbar;
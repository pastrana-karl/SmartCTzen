import React from "react";

import NavigationItem from '../../UI/Navigation/NavigationItems/NavigationItem/NavigationItem';
import NavigationItems from '../../UI/Navigation/NavigationItems/NavigationItems';
import Toolbar from '../../UI/Navigation/Toolbar/Toolbar';



const navbarCitizen = ( props ) => (
  <React.Fragment>
        <Toolbar>
            <NavigationItems>
                <NavigationItem link="/citizen-profile" >Profile</NavigationItem>
                <NavigationItem link="/citizen-proposals" >Proposals</NavigationItem>{/*To be replaced by Proposals */}
                <NavigationItem link="/citizen-reports" >Reports</NavigationItem>{/* Reports */}
                <NavigationItem link="/citizen-projects" >Projects</NavigationItem>{/* Projects */}
                <NavigationItem link="/citizen-logout" >Logout</NavigationItem>{/* Logout */}
            </NavigationItems>
        </Toolbar>        
    </React.Fragment>
);

export default navbarCitizen;
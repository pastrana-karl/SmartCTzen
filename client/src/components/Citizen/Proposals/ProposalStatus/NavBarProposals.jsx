import React from "react";

import NavigationItem from "../../../UI/Navigation/NavigationItems/NavigationItem/NavigationItem";
import NavigationItems from "../../../UI/Navigation/NavigationItems/NavigationItems";
import Toolbar from "../../../UI/Navigation/Toolbar/Toolbar";



const NavBarProposals = ( props ) => (
  <React.Fragment>
        <Toolbar>
            <NavigationItems>
                <NavigationItem link="/citizen-proposals-all" >Profile</NavigationItem>
                <NavigationItem link="/citizen-proposals-approved" >Proposals</NavigationItem>
                <NavigationItem link="/citizen-proposals-rejected" >Reports</NavigationItem>
                <NavigationItem link="/citizen-proposals-mine" >Projects</NavigationItem>
            </NavigationItems>
        </Toolbar>        
    </React.Fragment>
);

export default NavBarProposals;
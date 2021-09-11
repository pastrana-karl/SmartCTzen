import React from "react";

import NavigationItem from "../../../UI/Navigation/NavigationItems/NavigationItem/NavigationItem";
import NavigationItems from "../../../UI/Navigation/NavigationItems/NavigationItems";
import Toolbar from "../../../UI/Navigation/Toolbar/Toolbar";



const NavBarProposals = ( props ) => (
  <React.Fragment>
        <Toolbar>
            <NavigationItems>
                <NavigationItem link="/citizen-proposals-all" >All</NavigationItem>
                <NavigationItem link="/citizen-proposals-approved" >Approved</NavigationItem>
                <NavigationItem link="/citizen-proposals-rejected" >Rejected</NavigationItem>
                <NavigationItem link="/citizen-proposals-mine" >My Proposals</NavigationItem>
            </NavigationItems>
        </Toolbar>        
    </React.Fragment>
);

export default NavBarProposals;
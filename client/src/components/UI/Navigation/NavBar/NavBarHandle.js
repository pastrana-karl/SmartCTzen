import NavBar from './NavBar';
import React from 'react';
import { withRouter } from 'react-router-dom';
import LandingLayout from '../../../Landing/LandingLayout/LandingLayout';

const NavBarHandle = ({ location: { pathname } }) => {
    const isHome = pathname === '/';
    const isFeatures = pathname === '/features';
    const isLogin = pathname === '/login';
  
    return (
      <React.Fragment>
        {isHome || isFeatures || isLogin ? ( 
          //  <NavBar />
          <LandingLayout />
       ) : ( <div></div> )}
      </React.Fragment>
    );
  };

export default withRouter(NavBarHandle);
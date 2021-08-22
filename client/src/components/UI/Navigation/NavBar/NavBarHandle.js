import NavBar from './NavBar';
import React from 'react';
import { withRouter } from 'react-router-dom';

const NavBarHandle = ({ location: { pathname } }) => {
    const isHome = pathname === '/';
    const isFeatures = pathname === '/smartctzens-features';
    const isLogin = pathname === '/smartctzens-login';
  
    return (
      <React.Fragment>
        {isHome || isFeatures || isLogin ? ( 
           <NavBar />
       ) : ( <div></div> )}
      </React.Fragment>
    );
  };

export default withRouter(NavBarHandle);
import NavBar from './NavBar';
import React from 'react';
import { withRouter } from 'react-router-dom';

const NavBarHandle = ({ location: { pathname } }) => {
    const isFirstStep = pathname === '/first';
    const isSecondStep = pathname === '/second';
  
    return (
      <React.Fragment>
        {isFirstStep || isSecondStep ? ( 
           <div></div>
       ) : ( <NavBar /> )}
      </React.Fragment>
    );
  };

export default withRouter(NavBarHandle);
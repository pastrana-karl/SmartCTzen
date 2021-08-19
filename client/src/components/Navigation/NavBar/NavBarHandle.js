import NavBar from './NavBar';
import React from 'react';
import { withRouter } from 'react-router-dom';

const NavBarHandle = ({ location: { pathname } }) => {
    const isFirstStep = pathname === '/Register';
    const isSecondStep = pathname === '/second';
    const isThirdStep = pathname === '/third';
    const isFourthStep = pathname === '/fourth';
  
    return (
      <React.Fragment>
        {isFirstStep || isSecondStep || isThirdStep || isFourthStep ? ( 
           <div></div>
       ) : ( <NavBar /> )}
      </React.Fragment>
    );
  };

export default withRouter(NavBarHandle);
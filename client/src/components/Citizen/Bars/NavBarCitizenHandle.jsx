import NavBar from '../../UI/Navigation/NavBar/NavBar';
import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBarCitizen from './NavBarCitizen';

const CitizenNavBarHandle = ({ location: { pathname } }) => {
    const isCitizenProfile = pathname === '/citizen-profile';
    const isCitizenProposals = pathname === '/citizen-proposals';
    const isCitizenReports = pathname === '/citizen-reports';
    const isCitizenProjects = pathname === '/citizen-projects';
    const isCitizenLogout = pathname === '/citizen-logout';
  
    return (
      <React.Fragment>
        {isCitizenProfile || isCitizenProposals || isCitizenReports || isCitizenProjects || isCitizenLogout ? ( 
          //  <NavBar />
          <NavBarCitizen/>
       ) : ( <div></div> )}
      </React.Fragment>
    );
  };

export default withRouter(CitizenNavBarHandle);
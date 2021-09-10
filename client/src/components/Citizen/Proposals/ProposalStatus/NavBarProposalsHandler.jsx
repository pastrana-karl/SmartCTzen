import NavBar from '../../../UI/Navigation/NavBar/NavBar';
import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBarProposals from './NavBarProposals';

const ProposalsNavBarHandle = ({ location: { pathname } }) => {
    const isProposalAll = pathname === '/citizen-proposals-all';
    const isProposalAppoved = pathname === '/citizen-proposals-approved';
    const isProposalRejected = pathname === '/citizen-proposals-rejected';
    const isMyProposal = pathname === '/citizen-proposals-mine';
  
    return (
      <React.Fragment>
        {isProposalAll || isProposalAppoved || isProposalRejected || isMyProposal ? ( 
          //  <NavBar />
          <NavBarProposals/>
       ) : ( <div></div> )}
      </React.Fragment>
    );
  };

export default withRouter(ProposalsNavBarHandle);
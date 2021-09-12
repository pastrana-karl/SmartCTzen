import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { CitizenSideBarData } from './CitizenSideBarData';
import CitizenSubMenu from './CitizenSubMenu';

const Nav = styled.div`
  height: 80px;
  display: flex;
  justify-content: flex-start;
  margin-top: 10%;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: #fe5139;
  &:hover {
    color: #Dc4733;
  }
`;

const SidebarNav = styled.nav`
  margin-top: 10%;
  box-sizing: border-box;
  box-shadow: 10px 10px 30px #aeaec066, -10px -10px 30px #FFFFFF;
  border-bottom-right-radius: 50px;
  border-top-right-radius: 50px;
  background-color: #f1f1f3 !important;
  width: 250px;
  height: auto;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const CitizenSideBar = ({ location: { pathname } }) => {
  const isProposals = pathname === '/citizen-proposals';

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar); 
  
  return (
    <React.Fragment>
      {isProposals ? (
        <>
       <Nav>
         <NavIcon to='#'>
           <i class="fas fa-chevron-right" onClick={showSidebar}></i>
         </NavIcon>
       </Nav>
       <SidebarNav sidebar={sidebar}>
         <SidebarWrap>
           <NavIcon to='#'>
             <i className="fas fa-times" onClick={showSidebar}></i>
           </NavIcon>
           {CitizenSideBarData.map((item, index) => {
             return <CitizenSubMenu item={item} key={index} />;
           })}
         </SidebarWrap>
       </SidebarNav>
       </>
      ) : (<></>)}
    </React.Fragment>
  )
}

export default withRouter(CitizenSideBar);

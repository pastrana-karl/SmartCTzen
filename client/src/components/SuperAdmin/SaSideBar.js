import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { SaSideBarData } from './SaSideBarData';
import SaSubMenu from './SaSubMenu';

const SaNav = styled.div`
  height: 80px;
  box-sizing: border-box;
  box-shadow: 10px 10px 30px #aeaec066, -10px -10px 30px #FFFFFF;
  border-bottom-right-radius: 50px;
  border-bottom-left-radius: 50px;
  background-color: #f1f1f3 !important;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SaNavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none !important;
  color: #fe5139;
  &:hover {
    color: #Dc4733;
  }
`;

const SaSidebarNav = styled.nav`
  box-sizing: border-box;
  box-shadow: 10px 10px 30px #aeaec066, -10px -10px 30px #FFFFFF;
  border-bottom-right-radius: 50px;
  border-top-right-radius: 50px;
  background-color: #f1f1f3 !important;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SaSidebarWrap = styled.div`
  width: 100%;
`;

const SuperAdminHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-right: 4%;
  font-weight: bold;
  color: #fe5139;

  @media screen and (max-width: 1200px) {
    padding-right: 5.5%;
  }

  @media screen and (max-width: 900px) {
    padding-right: 7.3%;
  }

  @media screen and (max-width: 600px) {
    padding-right: 10%;
  }

  @media screen and (max-width: 499px) {
    padding-right: 15.3%;
  }
`

const SaSideBar = ({ location: { pathname } }) => {
  const isContentHome = pathname === '/SAContent-home';

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar); 
  
  return (
    <React.Fragment>
      {isContentHome ? (
        <>
       <SaNav>
         <SaNavIcon to='#'>
           <i className="fas fa-ellipsis-h" onClick={showSidebar}></i>
         </SaNavIcon>

         <SuperAdminHeader>
           <h1>SmartCT</h1>
         </SuperAdminHeader>
       </SaNav>
       <SaSidebarNav sidebar={sidebar}>
         <SaSidebarWrap>
           <SaNavIcon to='#'>
             <i className="fas fa-times" onClick={showSidebar}></i>
           </SaNavIcon>
           {SaSideBarData.map((item, index) => {
             return <SaSubMenu item={item} key={index} />;
           })}
         </SaSidebarWrap>
       </SaSidebarNav>
       </>
      ) : (<></>)}
    </React.Fragment>
  )
}

export default withRouter(SaSideBar);

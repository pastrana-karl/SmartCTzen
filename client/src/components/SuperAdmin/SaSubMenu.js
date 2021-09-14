import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SaSidebarLink = styled(Link)`
  display: flex;
  color: #ff5138;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none !important;
  font-size: 18px;
  &:hover {
    border-bottom-right-radius: 50px;
    border-top-right-radius: 50px;
    background: #ff5138;
    border-left: 4px solid #87c441;
    color: white;
    cursor: pointer;
  }
`;

const SaSidebarLabel = styled.span`
  margin-left: 16px;
`;

const SaDropdownLink = styled(Link)`
  border-bottom-right-radius: 50px;
  border-top-right-radius: 50px;
  background-color: #f1f1f3 !important;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none !important;
  color: #ff5138;
  font-size: 18px;
  &:hover {
    background-color: #87c441 !important;
    border-left: 4px solid #ff5138;
    color: white;
    cursor: pointer;
  }
`;

const SaSubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SaSidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SaSidebarLabel>{item.title}</SaSidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SaSidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <SaDropdownLink to={item.path} key={index}>
              {item.icon}
              <SaSidebarLabel>{item.title}</SaSidebarLabel>
            </SaDropdownLink>
          );
        })}
    </>
  );
};

export default SaSubMenu;
import React from 'react';

export const CitizenSideBarData = [
  {
    title: 'Contents',
    path: '#',
    icon: <i className="far fa-file-alt"></i>,
    iconClosed: <i className="fas fa-angle-down"></i>,
    iconOpened: <i className="fas fa-angle-up"></i>,

    subNav: [
      {
        title: 'Home',
        path: '/content-home',
        icon: <i className="fas fa-home"></i>
      },
      {
        title: 'Features',
        path: '/content-feature',
        icon: <i className="fas fa-clipboard-list"></i>
      }
    ]
  },
  {
    title: 'Admins',
    path: '/superAdmin-manageUser',
    icon: <i className="fas fa-user-shield"></i>
  },
  {
    title: 'Account Settings',
    path: '/superAdmin-account',
    icon: <i className="fas fa-user-cog"></i>
  },
  {
    title: 'Logout',
    path: '/superAdmin-login',
    icon: <i className="fas fa-sign-out-alt"></i>
  }
];
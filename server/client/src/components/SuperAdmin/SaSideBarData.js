import React from 'react';

export const SaSideBarData = [
  {
    title: 'Contents',
    path: '#',
    icon: <i className="far fa-file-alt"></i>,
    iconClosed: <i className="fas fa-angle-down"></i>,
    iconOpened: <i className="fas fa-angle-up"></i>,

    subNav: [
      {
        title: 'Home',
        path: '/SAContent-home',
        icon: <i className="fas fa-home"></i>
      },
      {
        title: 'Features',
        path: '/SAContent-feature',
        icon: <i className="fas fa-clipboard-list"></i>
      }
    ]
  },
  {
    title: 'Admins',
    path: '/SAManage-admin',
    icon: <i className="fas fa-user-shield"></i>
  },
  {
    title: 'Account Settings',
    path: '/SA-account',
    icon: <i className="fas fa-user-cog"></i>
  }
];
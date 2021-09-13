import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import './LandingNavBar.css';
import { Nav } from 'react-bootstrap';

const LandingNavBar = ({ location: { pathname } }) => {
  const isHome = pathname === '/';
  const isFeature = pathname === '/features';
  const isLogin = pathname === '/login';

  return (
    <React.Fragment>
      {isHome || isFeature || isLogin ? (
        <nav className = "navbar navbar-expand-lg fixed-top navbar-landingMainbg">
          <button 
            className = "navbar-toggler"
            id = "navbar-landingToggler"
            type = "button" data-toggle = "dropdown" data-target = "#navbarSupportedLandingContent" aria-controls = "navbarSupportedLandingContent" aria-expanded = "false" aria-label = "Toggle navigation">
            <i className = "fas fa-bars"></i>
          </button>
    
          <Nav variant = "pills" defaultActiveKey = "link-1" className = "collapse navbar-collapse" id = "navbarSupportedLandingContent">
            <ul className = "navbar-nav m-auto">
                <li className = "nav-item">
                  <Nav.Link as = {Link} eventKey = "link-1" className = "nav-link" to = "/"><i className = "fas fa-home"></i>Home</Nav.Link>
                </li>

                <li className="nav-item">
                  <Nav.Link as = {Link} eventKey = "link-2" className = "nav-link" to = "/features"><i className = "fas fa-clipboard-list"></i>Features</Nav.Link> 
                </li>

                <li className="nav-item">
                  <Nav.Link as = {Link} eventKey = "link-3" className = "nav-link" to = "/login"><i className = "fas fa-sign-in-alt"></i>Login</Nav.Link>
                </li>
            </ul>
          </Nav>
        </nav>
      ) : (<></>)}
    </React.Fragment>
  )
}

export default withRouter(LandingNavBar);
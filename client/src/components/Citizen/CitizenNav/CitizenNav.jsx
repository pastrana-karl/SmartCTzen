import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import './CitizenNav.css';
import { Nav } from 'react-bootstrap';

const CitizenNav = ({ location: { pathname } }) => {
  const isCitizenProfile = pathname === '/citizen-profile';
  const isCitizenProposals = pathname === '/citizen-proposals';
  const isCitizenReports = pathname === '/citizen-reports';
  const isCitizenProjects = pathname === '/citizen-projects';

  return (
    <React.Fragment>
      {isCitizenProfile || isCitizenProposals || isCitizenReports || isCitizenProjects ? (
      <nav className="navbar navbar-expand-lg fixed-top citizenNavbar-mainbg">
        <button 
          className="navbar-toggler"
          type="button" data-toggle="dropdown" data-target="#citizenNavbarSupportedContent" aria-controls="citizenNavbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fas fa-bars"></i>
        </button>
  
        <Nav variant = "pills" defaultActiveKey="link-1" className="collapse navbar-collapse" id="citizenNavbarSupportedContent">
          <ul className="navbar-nav m-auto">
              <li className="nav-item">
                <Nav.Link as = {Link} eventKey="link-1" className="nav-link" to="/citizen-profile">Profile</Nav.Link>
              </li>

              <li className="nav-item">
                <Nav.Link as = {Link} eventKey="link-2" className="nav-link" to="/citizen-proposals">Proposals</Nav.Link> 
              </li>

              <li className="nav-item">
                <Nav.Link as = {Link} eventKey="link-3" className="nav-link" to="/citizen-reports">Reports</Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link as = {Link} eventKey="link-4" className="nav-link" to="/citizen-projects">Projects</Nav.Link>
              </li>

              <li className="nav-item">
                <Nav.Link as = {Link} eventKey="link-5" className="nav-link" to="/login">Logout</Nav.Link> 
              </li>
          </ul>
        </Nav>
      </nav>
      ) : (<></>)}
    </React.Fragment>
  )
}

export default withRouter(CitizenNav);
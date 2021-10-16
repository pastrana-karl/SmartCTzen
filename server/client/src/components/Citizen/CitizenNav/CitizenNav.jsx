import React, { useContext } from 'react'
import { Link, withRouter } from 'react-router-dom';
import './CitizenNav.css';
import { Context } from '../../../context/Context';
import { Nav } from 'react-bootstrap';
import axios from 'axios';

const CitizenNav = ({ location: { pathname } }) => {
  const isCitizenProfile = pathname === '/citizen-profile';
  const isCitizenProposals = pathname === '/citizen-proposals';
  const isCitizenViewProposals = pathname === '/citizen-view-proposals';
  const isCitizenReports = pathname === '/citizen-reports';
  const isCitizenViewReports = pathname === '/citizen-view-reports';
  const isCitizenSubmitReports = pathname === '/citizen-submit-reports';
  const isCitizenProjects = pathname === '/citizen-projects';
  const isCitizenViewProjects = pathname === '/citizen-view-project';
  const isCitizenCreateProposals = pathname === '/citizen-create-proposals';
  const isCitizenPassUpdate = pathname === '/citizen-pass-update';
  const isCitizenChatReport = pathname === '/citizen-chat-report';

  const { user, dispatch } = useContext(Context);

  const handleLogout = async () => {
    const onlineStatus = {
      citizenID: user.data.user._id,
    }

    try {
      await axios.post('/api/citizen/citizenLogout', onlineStatus);
      dispatch({ type: "LOGOUT" });
    } catch (err) {
        console.log(err.response);
    }
  }

  return (
    <React.Fragment>
      {isCitizenProfile || isCitizenProposals || isCitizenReports || isCitizenProjects || isCitizenCreateProposals 
      || isCitizenPassUpdate || isCitizenChatReport || isCitizenSubmitReports || isCitizenViewReports || isCitizenViewProjects|| isCitizenViewProposals ? (
      <nav className="navbar navbar-expand-lg fixed-top citizenNavbar-mainbg">
        <button 
          className="navbar-toggler"
          id = "citizenNavbar-Toggler"
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
                <Nav.Link as = {Link} eventKey="link-5" className="nav-link"  onClick={handleLogout} to="/">Logout</Nav.Link> 
              </li>
          </ul>
        </Nav>
      </nav>
      ) : (<></>)}
    </React.Fragment>
  )
}

export default withRouter(CitizenNav);
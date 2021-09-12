import React from "react";
import { Link , withRouter} from "react-router-dom";
import './ReportsNav.css';
import { Nav } from "react-bootstrap";

const ReportsNav =() => (
    <nav className="navbar navbar-expand-lg reportNavbar-mainbg">
        <button 
          className="navbar-toggler"
          type="button" data-toggle="dropdown" data-target="#reportNavbarSupportedContent" aria-controls="reportNavbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fas fa-bars"></i>
        </button>
        <ul className="navbar-nav m-auto">
            <li className="reportnav-item">
                All
            </li>
            <li className="reportnav-item">
                Confirmed
            </li>
            <li className="reportnav-item">
                Cancelled
            </li>
            <li className="reportnav-item">
                Resolved
            </li>
        </ul>
    </nav>
);

export default withRouter(ReportsNav);
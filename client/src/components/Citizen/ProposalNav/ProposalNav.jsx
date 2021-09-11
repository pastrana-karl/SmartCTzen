import React from "react";
import { Link , withRouter} from "react-router-dom";
import './ProposalNav.css';
import { Nav } from "react-bootstrap";

const ProposalNav =() => (
    <nav className="navbar navbar-expand-lg proposalNavbar-mainbg">
        <button 
          className="navbar-toggler"
          type="button" data-toggle="dropdown" data-target="#proposalNavbarSupportedContent" aria-controls="proposalNavbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fas fa-bars"></i>
        </button>
        <ul className="navbar-nav m-auto">
            <li className="proposalnav-item">
                All
            </li>
            <li className="proposalnav-item">
                Approved
            </li>
            <li className="proposalnav-item">
                Rejected
            </li>
            <li className="proposalnav-item">
                My Proposals
            </li>
        </ul>
    </nav>
);

export default withRouter(ProposalNav);
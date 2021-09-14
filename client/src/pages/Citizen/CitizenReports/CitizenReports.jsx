import "./CitizenReports.css";
import React from 'react';
import ReportsNav from "../../../components/Citizen/ReportsNav/ReportsNav";
import { Row, Col, Form, Button, Container} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const CitizenReports = () => (
        <Container className="reportsContainer">
            <div className="reportsMain">
                <div className="category">
                    <React.Fragment>
                        <ReportsNav/> 
                    </React.Fragment>
                </div>
                <div className="submitReport">
                    <NavLink to="/citizen-submit-reports">
                        <button className="reportCreate">Create A Report</button>
                        </NavLink>
                    <NavLink to="/citizen-chat-report">
                        <button className="reportChat">Chat Icon</button>
                    </NavLink>
                    
                    
                </div>
                <NavLink to='/citizen-view-reports'>
                <div className="reportShort">
                    <img className="reportImg" alt="IDK"src="https://venngage-wordpress.s3.amazonaws.com/uploads/2018/09/Monochrome-Type-Simple-Background-Image.jpg"/>
                    <span className="reportTitle">Variant</span>
                    <div className="reportDets">
                        <span className="reportInfo">Where</span>
                        <span className="reportInfo">Reported by</span>
                        <span className="reportInfo">Date Submitted</span>
                        <span className="reportInfo">Status</span>
                    </div>
                </div>
                </NavLink>
            </div>
        </Container>
    )

export default CitizenReports;
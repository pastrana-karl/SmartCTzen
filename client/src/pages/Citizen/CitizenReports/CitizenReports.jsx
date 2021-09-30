import "./CitizenReports.css";
import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import ReportsNav from "../../../components/Citizen/ReportsNav/ReportsNav";
import { Row, Col, Form, Button, Container} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const CitizenReports = () => {
    const [reports, setReports] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch('/api/reports');
            const responseData = await response.json();
            setReports(responseData.data.reports);
        };
        sendRequest();
    });

    const deletereport = async (reportlId) => {
        console.log(reportlId);
        const response = await axios.delete(`/api/reports/${reportlId}`);
        const refresh = await fetch('/api/reports');
        const responseData = await refresh.json();
        setReports(responseData.data.reports);
    }

    //ALL Category
    //onClick={() => categoryAll(status:lahat ng status na meron)}  initialize nalang ng local array na ["Pending","Confirmed","Cancelled","Resolved"] 
    //const categoryAll = async (status) =>{}
    // dito icocompare mo yung local content array to all proposal status
    // if nag true ididsplay natin
    
    //Confirmed/Cancelled/Resolved Category
    //onClick={() => categoryConfirmed/Cancelled/Resolved(status:Confirmed/Cancelled/Resolved)}
    //const categoryConfirmed/Cancelled/Resolved = async (status) =>{}
    // dito icocompare mo yung Confirmed/Cancelled/Resolved na status to all proposals
    // if nag true ididsplay natin


    return(
        <Container className='citizenreports-Container'>
            <Row className='citizenreports-catbar-container'>
                <Col className='citizenreports-catbar'>
                    <Link className='citizenreports-catbar-item' to='/'>All</Link>
                    <Link className='citizenreports-catbar-item' to='/'>Confirmed</Link>
                    <Link className='citizenreports-catbar-item' to='/'>Cancelled</Link>
                    <Link className='citizenreports-catbar-item' to='/'>Resolved</Link>
                </Col>
            </Row>
            <Row className='citizenreports-btn-container'>
                <Col className='citizenreports-btnbar'>
                    <Link className='citizenreports-btn-submit' to='/citizen-submit-reports'>Submit a report</Link> 
                    <Link className='far fa-comment citizenreports-btn-chat' to='/citizen-chat-report'/>
                </Col>
            </Row>
            {/*
            <Row className='citizenreports-short'>
                <Col className='citizenreports-img-container'>
                    <img className='citizenreports-img' alt='citizenreports-img'src="https://th.bing.com/th/id/OIP.YLpvvCgXD0sI6X5dg0i6UgHaE7?pid=ImgDet&rs=1"/>
                </Col>

                <Col>
                    <Row className='citizenreports-title-container'>
                        <span className='citizenreports-title'><h2>Road Damage</h2></span>
                    </Row>
                    <Row className='citizenreports-details'>
                        <Col className='citizenreports-info-container'>
                            <span className='reportInfo'>Where: Cainta Rizal</span>
                            <span className='reportInfo'>Reported by: John Doe</span>
                            <span className='reportInfo'>Date Submitted: September 17, 2021 11:17am</span>
                        </Col>
                        <Col className='citizenreports-info-status-container'>
                            <span className='reportInfo'>Status: Confirmed</span>
                        </Col>
                    </Row>
                </Col>
            </Row> */}
            {reports && reports.map(report => (
                <Row className='citizenreports-short' key={report._id}>
                    <Col className='citizenreports-img-container'>
                        <img className='citizenreports-img' alt='citizenreports-img'src="https://th.bing.com/th/id/OIP.YLpvvCgXD0sI6X5dg0i6UgHaE7?pid=ImgDet&rs=1"/>
                    </Col>
                    <Col>
                        <Row className='citizenreports-title-container'>
                            <span className='citizenreports-title'><h2>{report.title}</h2></span>
                        </Row>
                        <Row className='citizenreports-details'>
                            <Col className='citizenreports-info-container'>
                                <span className='reportInfo'>Where: {report.location}</span>
                                <span className='reportInfo'>Desc : {report.description}</span>
                                <span className='reportInfo'>Reported By : {report.userName}</span>
                                <span className='reportInfo'>Date Submitted: Sept 20, 2021</span>
                                <span className='reportInfo'><i onClick={()=> deletereport(report._id)} className="fas fa-trash"></i></span>

                            </Col>
                            <Col className='citizenreports-info-status-container'>
                                <span className='reportInfo'>Status: {report.status}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ))}
        </Container>
        // <div className="reportsContainer">
        //      <div className="reportsMain">
        //          <div className="category">
        //              <React.Fragment>
        //                     <ReportsNav/> 
        //             </React.Fragment> 
        //         </div>
        //         <div className="citizenreports-btn-container">
        //             <NavLink to="/citizen-submit-reports">
        //                 <button className="citizenreports-submitreport-btn">Create A Report</button>
        //                 </NavLink>
        //             <NavLink to="/citizen-chat-report">
        //                 <div className='chat-icon'>
        //                     <i class="far fa-comment"></i>
        //                 </div>
        //             </NavLink>
        //         </div>
        //         <Row className="citizenreportShort">
        //                 <Col className="citizenreportimg-container">
        //                     <img className="reportImg" alt="reportimg"src="https://th.bing.com/th/id/OIP.YLpvvCgXD0sI6X5dg0i6UgHaE7?pid=ImgDet&rs=1"/>
        //                 </Col>
        //                 <Col>
        //                     <Row className='citizenreport-reportTitleContainer'>
        //                         <span className="citizenreport-reportTitle"><h2>Road Damage</h2></span>
        //                     </Row>
        //                     <Row className="reportDetails">
        //                         <Col className='reportInfo-container'>
        //                             <span className="reportInfo">Where: Cainta Rizal</span>
        //                             <span className="reportInfo">Reported by: John Doe</span>
        //                             <span className="reportInfo">Date Submitted: September 17, 2021 11:17am</span>
        //                         </Col>
        //                         <Col className='reportInfo-container'>
        //                             <span className="reportInfo">Status: Confirmed</span>
        //                         </Col>
        //                     </Row>
        //                 </Col>
        //         </Row>
        //     </div>
        // </div>
    );
}

export default CitizenReports;
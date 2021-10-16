import "./CitizenReports.css";
import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Container} from 'react-bootstrap';

const CitizenReports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch('/api/reports');
            const responseData = await response.json();
            setReports(responseData);
        };
        sendRequest();
    }, []);

    const categoryAll = async () => {
        const response = await fetch('/api/reports');
        const responseData = await response.json();
        setReports(responseData);
    }

    const categoryConfirmed = async () => {
        const response = await fetch('/api/reports/confirmed');
        const responseData = await response.json();
        setReports(responseData);   
    }

    const categoryCancelled = async () => {
        const response = await fetch('/api/reports/cancelled');
        const responseData = await response.json();
        setReports(responseData);   
    }
    
    const categoryResolved = async () => {
        const response = await fetch('/api/reports/resolved');
        const responseData = await response.json();
        setReports(responseData);   
    }


    return(
        <Container className='citizenreports-Container'>
            <Row className='citizenreports-catbar-container'>
                <Col className='citizenreports-catbar'>
                    <button className='citizenreports-catbar-item' onClick={() => categoryAll()}>All</button>
                    <button className='citizenreports-catbar-item' onClick={() => categoryConfirmed()}>Confirmed</button>
                    <button className='citizenreports-catbar-item' onClick={() => categoryCancelled()}>Cancelled</button>
                    <button className='citizenreports-catbar-item' onClick={() => categoryResolved()}>Resolved</button>
                </Col>
            </Row>
            <Row className='citizenreports-btn-container'>
                <Col className='citizenreports-btnbar'>
                    <Link className='citizenreports-btn-submit' to='/citizen-submit-reports'>Submit a report</Link> 
                    <Link className='far fa-comment citizenreports-btn-chat' to='/citizen-chat-report'/>
                </Col>
            </Row>
         
            {reports && reports.map(report => (
                <Row className='citizenreports-short' key={report._id}>
                    <Col className='citizenreports-img-container'>
                        <img className='citizenreports-img' alt='citizenreports-img'src={report.images} onClick={()=> window.open(report.images, "_blank")}/>
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
                                <span className='reportInfo'>Date Submitted: {new Date(report.createdAt).toLocaleDateString()}</span>
                                {/* <span className='reportInfo'><i onClick={()=> deletereport(report._id)} className="fas fa-trash"></i></span> */}

                            </Col>
                            <Col className='citizenreports-info-status-container'>
                                <span className='reportInfo'>Status: {report.status}</span>
                                <button onClick={()=> window.open(report.images, "_blank")}>View Photo</button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ))}
        </Container>
    );
}

export default CitizenReports;
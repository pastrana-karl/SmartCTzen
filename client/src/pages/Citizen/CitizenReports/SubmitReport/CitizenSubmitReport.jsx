import React from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CitizenSubmitReport.css';


const CitizenSubmitReport = () => (
    <>
        <Container className = 'citizenSubmitReport-container'>
            <div className='citizen-header'>
                <h3>Found a Problem? Go Submit a Report</h3>
            </div>
            {/* <Row className='citizenSubmitReport-row-container'> */}
            <Row>
                <Col className='citizenSubmitReportForm'>
                    {/* <Form className = 'citizenSubmitReport-edit'> */}
                    <Form>
                        <Form.Group controlId="email">
                            <Form.Label>Report Title</Form.Label>
                            <Form.Control
                                className='citizenSubmitReport-input'
                                type="text"
                                name="cpass"
                                autoComplete="off"
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                className='citizenSubmitReport-input'
                                type="text"
                                name="cpass"
                                autoComplete="off"
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                className='citizenSubmitReport-input'
                                type="text"
                                name="cpass"
                                autoComplete="off"
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control
                                className='citizenSubmitReport-input'
                                type="text"
                                name="cpass"
                                autoComplete="off"
                            />
                        </Form.Group>
                        {/* <Form.Group controlId="email">
                            <Form.Label>Where It Happened Bro?</Form.Label>
                            <Form.Control
                                className='citizenSubmitReport-input'
                                type="text"
                                name="cpass"
                                autoComplete="off"
                            />
                        </Form.Group> */}
                    </Form>
                </Col>
                <Col className='citizenSubmitReportQuote'>
                    <div className='quotebox'>
                        <h4>Reporting a problem or an issue is your <span className="text-highlight">ambag</span></h4>
                    </div>
                </Col>
            </Row>    
                <Row className='btn-container'>
                    <Col className='btnContainerCenter'>
                        <Link to = '/citizen-reports' className = 'citizenSubmitReport-BtnCancel'>Cancel</Link>
                    </Col>
                    <Col className='btnContainerCenter'>
                        <Link to = '#' className = 'citizenSubmitReport'>Submit</Link>
                    </Col>
                </Row>
            
        </Container>
    </>
);

export default CitizenSubmitReport;
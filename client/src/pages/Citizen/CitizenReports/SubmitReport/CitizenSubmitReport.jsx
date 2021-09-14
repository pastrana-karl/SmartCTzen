import React from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CitizenSubmitReport.css';


const CitizenSubmitReport = () => (
    <>
        <Container className = 'citizenSubmitReport-container'>
            <Form className = 'citizenSubmitReport-edit'>
                    <h3>Submit A Report</h3>

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
                        <Form.Label>What Happened My Guy/Gal?</Form.Label>
                        <Form.Control
                            className='citizenSubmitReport-input'
                            type="text"
                            name="cpass"
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Where It Happened Bro?</Form.Label>
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
                <Row>
                    <Col><Button><Link to = '#' className = 'citizenReports'>Cancel</Link></Button></Col>
                    <Col><Button><Link to = '#' className = 'citizenReports'>Submit</Link></Button></Col>
                </Row>
        </Container>
    </>
);

export default CitizenSubmitReport;
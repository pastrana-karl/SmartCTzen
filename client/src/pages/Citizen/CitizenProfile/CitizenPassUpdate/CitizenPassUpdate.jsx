import React from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CitizenPassUpdate.css';


const CitizenPassUpdate = () => (
    <>
        <Container className = 'citizenPassUpdate-container'>
            <Form className = 'citizenPassUpdate-edit'>
                    <h3>Update Password</h3>

                    <Form.Group controlId="email">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                            className='citizenPassUpdate-input'
                            type="text"
                            name="cpass"
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            className='citizenPassUpdate-input'
                            type="text"
                            name="cpass"
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            className='citizenPassUpdate-input'
                            type="text"
                            name="cpass"
                            autoComplete="off"
                        />
                    </Form.Group>
                </Form>
                <Row>
                    <Col><Button><Link to = '#' className = 'citizenProfile'>Cancel</Link></Button></Col>
                    <Col><Button><Link to = '#' className = 'citizenProfile'>Change</Link></Button></Col>
                </Row>
        </Container>
    </>
);

export default CitizenPassUpdate;
    
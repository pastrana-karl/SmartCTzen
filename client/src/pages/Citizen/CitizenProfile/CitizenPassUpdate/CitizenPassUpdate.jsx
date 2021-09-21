import React from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CitizenPassUpdate.css';
import CancelButton from '../../../../components/UI/Buttons/CancelButton/CancelButton';


const CitizenPassUpdate = () => (
    <>
        <Container className = 'citizenPassUpdate-container'>
            <Form className = 'citizenPassUpdate-edit'>
                    <h3>Update Password</h3>

                    <Form.Group controlId="email">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                            className='citizenPassUpdate-input'
                            type="password"
                            name="cpass"
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            className='citizenPassUpdate-input'
                            type="password"
                            name="cpass"
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            className='citizenPassUpdate-input'
                            type="password"
                            name="cpass"
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Row className='citizenPassUpdate-BtnContainer'>
                        <Col className='BtnContainerCenter'>
                            <Link to = '/citizen-profile' className = 'citizenPassUpdate-BtnCancel'>Cancel</Link>
                        </Col>
                        <Col className='BtnContainerCenter'>
                            <Link to = '#' className = 'citizenPassUpdate-Btn'>Change</Link>
                        </Col>
                    </Row>
                </Form>
        </Container>
    </>
);

export default CitizenPassUpdate;
    
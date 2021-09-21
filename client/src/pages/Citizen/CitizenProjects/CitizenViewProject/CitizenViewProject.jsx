import React from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CitizenViewProject.css';

const CitizenViewProject = () => (
    <>
        <Container className = 'citizenViewProject-container'>
            <Row>
                <Col>Title</Col>
                <Col><i class="fas fa-eye">#</i></Col>
            </Row>
            <Row>
                Description.
            </Row>
            <Row>
                <Col>When/Started On:</Col>
            </Row>
            <Row>
                <Col>Located in:</Col>
            </Row>
            <Row>
                <Col>Status: On Going</Col>
            </Row>
            <Row>
                <Col><img src="https://imgur.com/vxihw43.png" alt="Project"></img></Col>
                <Col><img src="https://imgur.com/vxihw43.png" alt="Project"></img></Col>
                <Col><img src="https://imgur.com/vxihw43.png" alt="Project"></img></Col>
            </Row>
        </Container>
    </>
);
export default CitizenViewProject;
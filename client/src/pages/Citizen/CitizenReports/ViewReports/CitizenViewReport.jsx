import React from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CitizenViewReport.css';

const CitizenViewReport = () => (
    <>
        <Container className = 'citizenViewReport-container'>
            <Row>
                <Col>Title</Col>
                <Row>
                    <Col>Reporter: John Doe</Col>
                    <Col>Submitted on: September 11, 2021</Col>
                </Row>
            </Row>
            {/* <Row>
                Lorem Ipsum
            </Row> */}
            <Row>
                <Col>Where: Cainta, Rizal</Col>
            </Row>
            <Row>
                <Col>Status: Confirmed</Col>
            </Row>
            <Row>
                <img src="https://imgur.com/vxihw43.png" alt="Project"></img>
            </Row>
        </Container>
    </>
);
export default CitizenViewReport;
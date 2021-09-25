import React from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CitizenViewReport.css';

const CitizenViewReport = () => (
    <>
        <Container className = 'citizenViewReport-container'>
            <Row className="citizenViewReport-header">
                <Row>
                    <Col claasName="citizenViewReport-title">
                    <h2>Ahay</h2>
                    </Col>
                </Row>
                <Row className="citizenViewReport-auth">
                    <Col>Reporter: IC</Col>
                    <Col>Submitted on: September 22, 2021</Col>
                </Row>
            </Row>
            <Row className="citizenViewReport-description">
                <p>So ayun nga, nag catgirl ata yung prof namin sa klase. Di ako sure mismo kasi nakaasa lang ako sa chat namin nung oras na yun.</p>
            </Row> 
            <Row className="citizenViewReport-footer">
                <Row className="citizenViewReport-details">
                    <Col>Where: Cainta, Rizal</Col>
                    <Col>Status: Confirmed</Col>
                </Row>
                <Row className="citizenViewReport-img-container">
                    <Col className="citizenViewReport-img-frame">
                        <img src="https://imgur.com/vxihw43.png" alt="Report"></img>
                    </Col>
                </Row>
            </Row>
        </Container>
    </>
);
export default CitizenViewReport;
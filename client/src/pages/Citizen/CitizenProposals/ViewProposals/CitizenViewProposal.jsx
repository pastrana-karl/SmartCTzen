import React from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CitizenViewProposal.css';

const CitizenViewProposal = () => {
    
        <div>
           <Container className = 'citizenViewProposal-container'>
            <Row className="citizenViewProposal-header">
                <Row>
                    <Col claasName="citizenViewProposal-title">
                    <h2>Ahay</h2>
                    </Col>
                </Row>
                <Row className="citizenViewProposal-auth">
                    <Col>Proposed by: IC</Col>
                    <Col>Proposed on: September 22, 2021</Col>
                    
                </Row>
            </Row>
            <Row className="citizenViewProposal-description">
                <p>Proposed to be done on: Monday</p>
                <p>So ayun nga, nag catgirl ata yung prof namin sa klase. Di ako sure mismo kasi nakaasa lang ako sa chat namin nung oras na yun.</p>
            </Row> 
            <Row className="citizenViewProposal-footer">
                <Row className="citizenViewProposal-details">
                    <Col>Where: Cainta, Rizal</Col>
                    <Col>Status: Confirmed</Col>
                </Row>
                <Row className="citizenViewProposal-img-container">
                    <Col className="citizenViewProposal-img-frame">
                        <img src="https://imgur.com/vxihw43.png" alt="Proposal"></img>
                    </Col>
                </Row>
            </Row>
        </Container> 
        </div>
    
}

export default CitizenViewProposal

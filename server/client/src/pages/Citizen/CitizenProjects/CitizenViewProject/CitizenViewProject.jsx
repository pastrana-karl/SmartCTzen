import React, {useState, useEffect} from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './CitizenViewProject.css';

const CitizenViewProject = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [project, setProject] = useState([]);
    const [followUps, setFollowUps] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch(`/api/projects/${path}`);
            const responseData = await response.json();
            setProject(responseData.data.project);
            setFollowUps(responseData.data.project.updates)
        };
        sendRequest();
    },[path]);

    const date = new Date(project.createdAt).toLocaleDateString()

    return(
        <Container className='citizenViewProject-container'>
                <Row className='citizenViewProject-long'>
                    <Col className='citizenViewProject-title'>
                        <h1>{project.title}</h1>
                        <Row>
                            <i className="fas fa-eye"/> <span>{project.viewCount}</span>
                        </Row>
                    </Col>

                    <Col className='citizenViewProject-description'>
                        <p>{project.description}</p>
                    </Col> 

                    <Col className='citizenViewProject-img-frame'>
                        <img src={project.coverImage}  className='citizenViewProject-img' alt='Project'/>
                    </Col>

                    <Col className='citizenViewProject-status'>
                        <p>Date created: {date}</p>
                        <p>Where: {project.location}</p>
                        <p>Status: {project.status}</p>
                    </Col>
                </Row>

                <Link className = 'citizen-backButton' to = '/citizen-projects'>
                    Back
                </Link>

                {followUps && followUps.map(followUp => (
                    <Col className='citizenViewProject-followUps' key={followUp._id}>
                        <Row className='citizenViewProject-followUps-body'>
                            <Col style={{fontWeight:'bold'}}>{followUp.user}</Col>
                            <Col>Posted on: {followUp.date}</Col>
                            <Col>{followUp.message}</Col>
                        </Row>
                    </Col>
                ))}
        </Container>
    );
};
export default CitizenViewProject;
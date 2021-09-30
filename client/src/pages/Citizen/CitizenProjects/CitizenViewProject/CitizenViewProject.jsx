import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CitizenViewProject.css';

const CitizenViewProject = () => {
    const [project, setProject] = useState([]);

    useEffect(() => {
        const sendRequest = async () => {
            const projectId = localStorage.getItem('projectid');
            // console.log(projectId)
            const response = await fetch(`/api/projects/${projectId}`);
            // console.log(response)
            const responseData = await response.json();
            console.log(responseData)
            // const newResponseData = JSON.stringify(responseData.data);
            // console.log(newResponseData);
            setProject(responseData.data.project);
        };
        sendRequest();
    },[]);

    return(
        <Container className='citizenViewProject-container'>
                <Row className='citizenViewProject-long'>
                    <Col className='citizenViewProject-title'>
                        <h1>{project.title}</h1>

                        <i className="fas fa-eye"/> <span>{project.views}</span>
                    </Col>

                    <Col className='citizenViewProject-description'>
                        <p>{project.description}</p>
                    </Col> 

                    <Col className='citizenViewProject-img-frame'>
                        <img src='https://imgur.com/7pFJPjg.png'  className='citizenViewProject-img' alt='Project'/>
                    </Col>

                    <Col className='citizenViewProject-status'>
                        <p>Where: {project.location}</p>
                        <p>Status: {project.status}</p>
                    </Col>
                </Row>
        </Container>
    );
};
export default CitizenViewProject;
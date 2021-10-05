import "./CitizenProjects.css";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Col, Column, Row, Container } from 'react-bootstrap'
import { Link, NavLink } from "react-router-dom";

const CitizenProjects = () => {
    const [projects, setProjects] = useState();
    const [views, setViews] = useState(0);

    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch('/api/projects');
            const responseData = await response.json();
            setProjects(responseData.data.projects);
        };
        sendRequest();
    },[]);

    const categoryAll = async () => {
        const response = await fetch('/api/projects');
        const responseData = await response.json();
        // console.log(responseData)
        setProjects(responseData.data.projects);
    }
    
    const categoryAccomplished = async () => {
        const response = await fetch('/api/projects/accomplished');
        const responseData = await response.json();
        // console.log(responseData)
        setProjects(responseData);   
    }

    const categoryOngoing = async () => {
        const response = await fetch('/api/projects/ongoing');
        const responseData = await response.json();
        // console.log(responseData)
        setProjects(responseData);   
    }
    
    const getProjectId = async (projectId) => {
        try {
            await axios.post(`/api/projects/updateViewCount/${projectId}`);
        } catch (err) {
            console.log(err.response)
        }
    }

    // console.log(projects)
    //Accomplished/Ongoing Category
    //onClick={() => categoryAccomplished/Ongoing(status:Accomplished/Ongoing)}
    //const categoryAccomplished/Ongoing = async (status) =>{}
    // dito icocompare mo yung Accomplished/Ongoing na status to all proposals
    // if nag true ididsplay natin



    return (
        <Container className='citizenprojects-container' >
            <Row className='citizenprojects-catbar-container'>
                <Col className='citizenprojects-catbar'>
                    <button className='citizenprojects-catbar-item' onClick={() => categoryAll()}>All</button>
                    <button className='citizenprojects-catbar-item' onClick={() => categoryAccomplished()}>Accomplished</button>
                    <button className='citizenprojects-catbar-item' onClick={() => categoryOngoing()}>Ongoing</button>
                </Col>
            </Row> 
            {projects && projects.map(project =>(
                <Row  className='citizenprojects-short' key={project._id}>
                    <Col className='citizenprojects-shortinfo'>
                        <Row className='citizenprojects-shortinfo-auth'>
                            <h2>{project.title}</h2>
                            <Col className='citizenprojects-auth-container'>
                                <div className='citizenprojects-auth'>{project.userId}</div>
                            </Col>
                        </Row>
                        <Row className='citizenprojects-shortinfo-desc'>
                            {project.description}
                        </Row>
                        <Row className='citizenprojects-shortinfo-status'>
                            <p>Status: {project.status}</p>
                            <div className='citizenprojects-shortinfo-status-views'>
                                <i className="fas fa-eye"/> <span>{project.viewCount}</span>
                            </div>
                        </Row>
                        <Link className='citizenprojects-viewmore' onClick = { () => getProjectId(project._id) } to={`/citizen-view-project/${project._id}`} >
                            View More
                        </Link>
                    </Col>

                    <Col className='citizenprojects-shortinfo-img-container'>
                        <div className='citizenprojects-shortinfo-img-frame'>
                        <img src={project.coverImage ? project.coverImage : "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available-225x300.png"} alt="" className='citizen-project-image'/>
                        </div>
                    </Col>
                </Row>
            ))}
        </Container>
    );
}
export default CitizenProjects;




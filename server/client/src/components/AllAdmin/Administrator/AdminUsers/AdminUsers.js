import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminLayout from '../AdminLayout/AdminLayout';
import axios from 'axios';
import './AdminUsers.css';

const AdminUsers = () => {
    const [citizenUser, setCitizenUser] = useState([]);
    const [citizenID, setCitizenID] = useState("");

    useEffect(() => {
        const getCitizen = async () => {
            const res = await axios.get(`/api/citizen/?status=${true}`);
            setCitizenUser(res.data);

            if(res.data[0] === undefined) {
                setCitizenID(null);
            } else {
                setCitizenID(res.data[0]._id);
            }
        }

        getCitizen();
    }, [])

    return (
        <>
            <AdminLayout>
                <Container>
                    <div  className = 'acceptedUsers-header'>
                        <h1>Users</h1>
                    </div>

                    <div  className = 'col-md-10 offset-md-1' id = 'acceptedUsers-body'>
                        {citizenID !== undefined && citizenID !== null ? (
                        <>
                            <Row>
                                <Col className='acceptedUsers-searchTitle'><h4>Lastname</h4></Col>
                                <Col className='acceptedUsers-searchTitle'><h4>Firstname</h4></Col>
                                <Col className='acceptedUsers-searchTitle'><h4>Status</h4></Col>
                                <Col className='acceptedUsers-searchTitle' id = 'acceptedUserEmail'><h4>Email</h4></Col>
                                <Col className='acceptedUsers-searchTitle'></Col>
                            </Row>
                            {citizenUser.map((A) => (
                                <Row key={A._id}>
                                    <Col className='acceptedUsers-searchResult'><h4>{A.lastname}</h4></Col>
                                    <Col className='acceptedUsers-searchResult'><h4>{A.firstname}</h4></Col>
                                    <Col className='acceptedUsers-searchResult'><h4>{A.status === 'Banned' ? A.status : <span>Good</span>}</h4></Col>
                                    <Col className='acceptedUsers-searchResult' id = 'acceptedUserEmail'><h4>{A.email}</h4></Col>
                                    <Col className='acceptedUsers-searchResult'><h4><Link to = {`/Admin-viewUsers/${A._id}`}><i className="fas fa-external-link-alt"></i></Link></h4></Col>
                                </Row>
                            ))}
                        </>
                        ) : (
                            <h4 style={{textAlign: "center", color: "grey"}}>No current users</h4>
                        )}
                    </div>
                </Container>
            </AdminLayout>
        </>
    );
};

export default AdminUsers;
import React, { useEffect, useState } from 'react'
import { Form, Container, Button, Row, Col } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import './SAManage.css'
import axios from 'axios'

const SAManage = () => {
    const [admin, setAdmin] = useState([]);
    const {search} = useLocation();

    useEffect(()=>{
        const fetchAdmin = async ()=>{
            const res = await axios.get("/api/admin/" + search);
            setAdmin(res.data);
        }
        fetchAdmin();
    },[search]) 

    // Admin Checking
    // console.log(admin)

    return (
        <>
            <Container>
                <div  className = 'SAmanage-header'>
                    <h1>Administrators</h1>
                </div>

                <Form className="SAmanage-search">
                    <Form.Group controlId="email">
                    <Form.Control
                        className='SAmanage-input'
                        type="text"
                        name="email"
                        autoComplete="off"
                        placeholder='Search . . .'
                    />
                    </Form.Group>
                    
                    <Button className='SAmanage-searchBTN' variant="danger" type="submit">
                        <i className="fas fa-search"></i>
                    </Button>
                </Form>

                <div  className = 'col-md-10 offset-md-1' id = 'SAmanage-body'>
                    <Row>
                        <Col className = 'SAmanage-searchHeader'><h4>Administrator ID</h4></Col>
                        <Col className = 'SAmanage-searchHeader'><h4>User Name</h4></Col>
                        <Col className = 'SAmanage-searchHeader'><h4>Email Address</h4></Col>
                        <Col></Col>
                    </Row>

                    {admin.map((adminUser) => (
                        <Row key={adminUser._id}>
                            <Col className='SAmanage-searchResult'><h4>{adminUser._id}</h4></Col>
                            <Col className='SAmanage-searchResult'><h4>{adminUser.username}</h4></Col>
                            <Col className='SAmanage-searchResult'><h4>{adminUser.email}</h4></Col>
                            <Col className='SAmanage-searchResult'><h4><Link to = '/SASearch-admin'><i className="fas fa-external-link-alt"></i></Link></h4></Col>
                        </Row>
                    ))}
                </div>

                <div className = 'SAmanage-addAdmin'>
                    <Link to = '/SAAdd-admin'><i className="fas fa-plus-circle"></i></Link>
                </div>
            </Container>
        </>
    )
}

export default SAManage

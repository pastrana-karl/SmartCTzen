import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './SASearchAdmin.css'

const SASearchAdmin = () => {
    return (
        <>
            <Container className = 'SAmanage-adminSearchContainer'>
                <div className = 'SAmanage-searchResultBody'>
                    <div className = 'searchResultImg-container'>
                        <div className = 'searchResultImg'>
                            <img src= 'https://res.cloudinary.com/karlstorage/image/upload/v1631243465/free-img/sasjbg0hekrbn7vlc5eo.jpg' alt="" ></img>
                        </div>
                    </div>
                    <Form className="SAmanage-result">
                        <Form.Group controlId="email">
                        <Form.Label>City or Municipality</Form.Label>
                        <Form.Control
                            className='SAmanage-searchResultInput'
                            type="text"
                            name="email"
                        />
                        </Form.Group>

                        <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            className='SAmanage-searchResultInput'
                            type="text"
                            name="email"
                        />
                        </Form.Group>
                        
                        
                        <Button variant="danger" type="submit">
                            Ban
                        </Button>
                        <Link to = '/SAManage-admin' className = 'SAmanageLink'>Back</Link>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default SASearchAdmin

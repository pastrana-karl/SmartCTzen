import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import './SAAddFeaturedMember.css'

const SAAddFeaturedMember = () => {
    return (
        <>
            <Container>
                <div className = 'col-md-10 offset-md-1' id = 'SAFeaturedMember-body'>
                    <div className = 'SFMBody-container'>
                        <div className = 'SAFM-container'>
                            <img src= 'https://res.cloudinary.com/karlstorage/image/upload/v1631243465/free-img/sasjbg0hekrbn7vlc5eo.jpg' alt=""></img>
                        </div>
                    </div>

                    <Form className="SAContent-formFM">
                        <div className = 'SAFMicon-container'>
                            <Form.Label htmlFor="fileInput"><i className="SAFM-icon fas fa-image"></i></Form.Label>
                        </div>
                        <input
                            type="file"
                            name="Featured-Photo" 
                            id="fileInput"  
                            style={{display:"none"}}
                            // onChange={(e) => setFile([...e.target.files])}
                        />

                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                            type="text"
                            name="name"
                            autoComplete="off"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Position</Form.Label>
                            <Form.Control
                            type="text"
                            name="position"
                            autoComplete="off"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                            type="text"
                            name="message"
                            autoComplete="off"
                            />
                        </Form.Group>


                        <Button variant="danger" type="submit">
                            Submit
                        </Button>

                        <Button className = 'SAContent-reset' variant="outline-light" type="reset">
                            Clear
                        </Button>

                        <Link to = '/SAContent-home' className = 'SAFM-link'>Back</Link>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default SAAddFeaturedMember


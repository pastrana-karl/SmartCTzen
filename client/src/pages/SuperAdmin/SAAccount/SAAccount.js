import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import './SAAccount.css'

const SAAccount = () => {
    return (
        <>
            <Container>
                <div className = 'SAaccount'>
                    <h1>Account Settings</h1>
                </div>

                <div className = 'col-md-10 offset-md-1' id = 'SAaccount-body'>
                    <div className = 'SAaccountImg'>
                        <img src= 'https://res.cloudinary.com/karlstorage/image/upload/v1631243465/free-img/sasjbg0hekrbn7vlc5eo.jpg' alt="" ></img>
                    </div>
                    <Form className = 'SAaccount-edit'>
                        <Form.Group>
                            <div className="SAaccount-uploadIcon">
                                <Form.Label htmlFor="fileInput"><i className="writeIcon fas fa-image"></i></Form.Label>
                            </div>
                            <input
                                type="file"
                                name="validIDPic" 
                                id="fileInput"  
                                style={{display:"none"}}
                                multiple
                                // onChange={(e) => setFile([...e.target.files])}
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            className='SAaccount-input'
                            type="text"
                            name="email"
                            autoComplete="off"
                        />
                        </Form.Group>

                        <Form.Group controlId="email">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            className='SAaccount-input'
                            type="text"
                            name="email"
                            autoComplete="off"
                        />
                        </Form.Group>


                        <Button variant="danger" type="submit">
                        Submit
                        </Button>
                        <Button className = 'SAaccount-reset' variant="outline-light" type="reset">
                        Clear
                        </Button>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default SAAccount

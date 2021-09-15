import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './SAAddFeature.css'

const SAAddFeature = () => {
    return (
        <>
            <Container>
                <div className = 'SAcontent-addFeatureHeader'>
                    <h1>Add Feature</h1>
                </div>

                <div className = 'col-md-10 offset-md-1' id = 'SAAddFeature-body'>
                    <Form  className="SAContent-featureAdd">
                        <div className = 'SAContent-addFeatureImage'>
                            <img src= 'https://res.cloudinary.com/karlstorage/image/upload/v1630487533/free-img/mic8edrmhxn85rggyofi.png' alt="" ></img>
                        </div>

                        <Form.Group>
                        <div className="SAContent-addFeatureUploadIcons">
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
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            className='ContentAddFeature-input'
                            type="text"
                            name="email"
                            autoComplete="off"
                        />
                        </Form.Group>

                        <Form.Group controlId="email">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            className='ContentAddFeature-input'
                            type="text"
                            name="email"
                            autoComplete="off"
                        />
                        </Form.Group>

                        <Button variant="danger" type="submit">
                            Submit
                        </Button>
                        <Button className = 'SAContent-addFeatureReset' variant="outline-light" type="reset">
                            Clear
                        </Button>
                        <Link to = '/SAContent-feature' className = 'addFeatureLink'>Back</Link>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default SAAddFeature

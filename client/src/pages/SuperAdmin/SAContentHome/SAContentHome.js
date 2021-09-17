import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import './SAContentHome.css'
import axios from 'axios'

const SAContentHome = () => {
  const [communities, setCommunities] = useState("");
  const [users, setUsers] = useState("");
  const [members, setMembers] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateCount = {
      communities,
      users,
      members,
    };

    console.log(updateCount)

    try {
      await axios.post("/api/updateCount", updateCount);
    } catch (err) {
      console.log(err)
    }
  }

    return (
        <>
        <Container>
            <div className = 'SAcontent-header'>
                <h1>Home</h1>
            </div>

            <div className = 'col-md-10 offset-md-1' id = 'SAHome-body'>
                <Form className="SAContent-home" onSubmit = { handleSubmit }>
                
                <h1>Update Count</h1>

                <Form.Group>
                  <Form.Label>Partner Communities</Form.Label>
                  <Form.Control
                    type="number"
                    name="communities"
                    autoComplete="off"
                    onChange = {e => setCommunities(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Users</Form.Label>
                  <Form.Control
                    type="number"
                    name="users"
                    autoComplete="off"
                    onChange = {e => setUsers(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Members</Form.Label>
                  <Form.Control
                    type="number"
                    name="members"
                    autoComplete="off"
                    onChange = {e => setMembers(e.target.value)}
                  />
                </Form.Group>

                <h1>SmartCT Feature</h1>

                <div className = 'SAContent-homeImage'>
                  <img src= 'https://res.cloudinary.com/karlstorage/image/upload/v1631243465/free-img/sasjbg0hekrbn7vlc5eo.jpg' alt="" ></img>
                </div>

                <Form.Group>
                  <div className="SAContent-homeUploadIcons">
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
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    autoComplete="off"
                  />
                </Form.Group>

                <h1>SmartCT Anouncement</h1>

                <Form.Group controlId="email">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    autoComplete="off"
                  />
                </Form.Group>


                <Button variant="danger" type="submit">
                  Submit
                </Button>
                <Button className = 'SAContent-reset' variant="outline-light" type="reset">
                  Clear
                </Button>
                </Form>
            </div>
        </Container>
        </>
    )
}

export default SAContentHome

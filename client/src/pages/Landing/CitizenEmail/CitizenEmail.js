import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './CitizenEmail.css';

const CitizenEmail = () => {
  return (
    <Container>
      <Row className = "citizenEmail-row">
        <Col className = 'citizenEmail-displayHalf'>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, stiffness: 150 }}>
            <h1 style = {{fontWeight: "bold"}}>Easy way to<br/><span style = {{color: "#fe5139"}}>Retrieve your password!</span></h1>
          </motion.div>
          <motion.div className="col-md-20 offset-md-0" initial={{ opacity: 0, x: '51vw' }} animate={{ opacity: 1, x: 0 }} transition={{ stiffness: 150 }} id = 'citizenEmail-panel'>
            <div className="citizenEmail-displayPic">
                <img  
                  src = "https://res.cloudinary.com/karlstorage/image/upload/v1631751670/free-img/gumqcn3ism7qmqqo5luf.png" 
                  alt = "email-display">
                </img>
            </div>
          </motion.div>
        </Col>

        <Col>
          <div className = 'citizenEmail-mobileTitle'>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, stiffness: 150 }}>
              <h1 style = {{fontWeight: "bold"}}>Easy way to<br/><span style = {{color: "#fe5139"}}>Retrieve your password!</span></h1>
            </motion.div>
          </div>
          <motion.div className="col-md-20 offset-md-0" initial={{ opacity: -3, x: '-100vw' }} animate={{ opacity: 1, x: 0 }} transition={{ stiffness: 150 }} id = 'citizenEmail-panel'>
            <Form className="citizenEmail-inputForm">
              
              <Form.Group controlId="email">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  type="text"
                  name="oldPassword"
                  placeholder="Enter your old password"
                  autoComplete="off"
                />

                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="text"
                  name="newPassword"
                  placeholder="Enter your new password"
                  autoComplete="off"
                />
              </Form.Group>

              <Button variant="danger" type="submit">
                Submit
              </Button>
            </Form>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default CitizenEmail;
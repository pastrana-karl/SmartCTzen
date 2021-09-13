import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './CitizenLogin.css';
import { Link } from 'react-router-dom';

const CitizenLogin = () => {

  return (
    <>
      <Container>
        <Row className = "citizenLogin-row">
          <Col className = 'citizenLogin-displayHalf'>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, stiffness: 150 }} id = 'citizenLogin-panelTitle'>
              <h1 style = {{fontWeight: "bold"}}>Be a<br/><span style = {{color: "#fe5139"}}>SmartCTzen</span></h1>
            </motion.div>
            <motion.div className="col-md-20 offset-md-0" initial={{ opacity: 0, x: '51vw' }} animate={{ opacity: 1, x: 0 }} transition={{ stiffness: 150 }} id = 'citizenLogin-panel'>
              <div className="citizenLogin-displayPic">
                  <img  
                    src = "https://res.cloudinary.com/karlstorage/image/upload/v1630397216/free-img/jz9plbotwtlvo3cs7600.png" 
                    alt = "login-display">
                  </img>
              </div>
            </motion.div>
          </Col>

          <Col>
            <div className = 'citizenLogin-mobileTitle'>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, stiffness: 150 }} id = 'citizenLogin-panelTitle'>
                <h1 style = {{fontWeight: "bold"}}>Be a<br/><span style = {{color: "#fe5139"}}>SmartCTzen</span></h1>
              </motion.div>
            </div>
            <motion.div className="col-md-20 offset-md-0" initial={{ opacity: -3, x: '-100vw' }} animate={{ opacity: 1, x: 0 }} transition={{ stiffness: 150 }} id = 'citizenLogin-panel'>
              <Form className="citizenLogin-inputForm">
                
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className = 'citizenLogin-input'
                    type="text"
                    name="email"
                    placeholder="Enter your email address"
                    autoComplete="off"
                  />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className = 'citizenLogin-input'
                    type="password"
                    name="password"
                    placeholder="Choose a password"
                    autoComplete="off"
                  />
                </Form.Group>

                <Button variant="danger" type="submit">
                  Submit
                </Button>

                <Link className="citizenLogin-link" to="/citizen_forgot">Forgot Password?</Link>
                <Link className="citizenLogin-link" to="/create-account">Register</Link>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CitizenLogin;
import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './CitizenForgot.css';

const CitizenForgot = () => {
  return (
    <Container>
      <Row className = "citizenForgot-row">
        <Col className = 'citizenForgot-displayHalf'>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, stiffness: 150 }}>
            <h1 style = {{fontWeight: "bold"}}>Forgot your<br/><span style = {{color: "#fe5139"}}>Password?</span></h1>
          </motion.div>
          <motion.div className="col-md-20 offset-md-0" initial={{ opacity: 0, x: '51vw' }} animate={{ opacity: 1, x: 0 }} transition={{ stiffness: 150 }} id = 'citizenForgot-panel'>
            <div className="citizenForgot-displayPic">
                <img  
                  src = "https://res.cloudinary.com/karlstorage/image/upload/v1630826487/free-img/zvxzhncfd1jw61zsuyqt.png" 
                  alt = "forgot-display">
                </img>
            </div>
          </motion.div>
        </Col>

        <Col>
          <div className = 'citizenForgot-mobileTitle'>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, stiffness: 150 }}>
              <h1 style = {{fontWeight: "bold"}}>Forgot your<br/><span style = {{color: "#fe5139"}}>Password?</span></h1>
            </motion.div>
          </div>
          <motion.div className="col-md-20 offset-md-0" initial={{ opacity: -3, x: '-100vw' }} animate={{ opacity: 1, x: 0 }} transition={{ stiffness: 150 }} id = 'citizenForgot-panel'>
            <Form className="citizenForgot-inputForm">
              
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Enter your email address"
                  autoComplete="off"
                />
              </Form.Group>

              <Button variant="danger" type="submit">
                Submit
              </Button>

              <Link className = 'citizenForgot-links' to = '/'>Back</Link>
            </Form>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default CitizenForgot;
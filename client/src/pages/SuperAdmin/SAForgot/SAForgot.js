import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './SAForgot.css';
import { Link } from 'react-router-dom';

const SAForgot = () => {

  return (
    <>
      <Container>
        <Row className = "superadminForgot-row">
          <Col>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, stiffness: 150 }}>
            <div className = 'superadminForgot-banner'>
                  <h1>SmartCT</h1>
                  <p>Citizens x Technology</p>
            </div>
            </motion.div>
            <motion.div className="col-md-10 offset-md-1" initial={{ opacity: -3, x: '-100vw' }} animate={{ opacity: 1, x: 0 }} transition={{ stiffness: 150 }}>
              <Form className="superadminForgot-input">
                
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

                <Link className="superAdminForgot-links" to="/superAdmin-login">Back</Link>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SAForgot;
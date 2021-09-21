import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './SAEmail.css';

const SAEmail = () => {

  return (
    <>
      <Container>
        <Row className = "superadminEmail-row">
          <Col>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, stiffness: 150 }}>
            <div className = 'superadminEmail-banner'>
                  <h1>SmartCT</h1>
                  <p>Citizens x Technology</p>
            </div>
            </motion.div>
            <motion.div className="col-md-10 offset-md-1" initial={{ opacity: -3, x: '-100vw' }} animate={{ opacity: 1, x: 0 }} transition={{ stiffness: 150 }}>
              <Form className="superadminEmail-input">
                
                <Form.Group controlId="email">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="text"
                    name="oldPassword"
                    placeholder="Enter your old password"
                    autoComplete="off"
                  />
                </Form.Group>

                <Form.Group controlId="email">
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
    </>
  );
};

export default SAEmail;
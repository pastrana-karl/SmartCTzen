import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './AdminForgot.css';
import Swal from 'sweetalert2'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';

const SAForgot = () => {
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await axios.post("/api/admin/reset-password", { email });
        Swal.fire('Email Sent!', "Please check your email.", 'success').then(
          (result) => {
            if (result.isConfirmed || result.isDismissed) {
              setRedirect(true);
             }
          }
        );
    } catch (err) {
      console.log(err.response)
      Swal.fire({
        icon: 'error',
        title: `${err.response.status}`,
        text: `${err.response.data.error}`,
      });
    }
  };

  return (
    <>
      { redirect && (<Redirect to = '/admin-login' />) }
      <Container>
        <Row className = "adminForgot-row">
          <Col>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, stiffness: 150 }}>
            <div className = 'adminForgot-banner'>
                  <h1>SmartCT</h1>
                  <p>Citizens x Technology</p>
            </div>
            </motion.div>
            <motion.div className="col-md-10 offset-md-1" initial={{ opacity: -3, x: '-100vw' }} animate={{ opacity: 1, x: 0 }} transition={{ stiffness: 150 }}>
              <Form className="adminForgot-input" onSubmit = { handleSubmit }>
                
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    autoComplete="off"
                    onChange = {(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="danger" type="submit">
                  Submit
                </Button>

                <Link className="AdminForgot-links" to="/admin-login">Back</Link>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SAForgot;
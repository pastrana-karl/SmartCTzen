import React, { useContext, useRef } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './SALogin.css';
import { Link } from 'react-router-dom';
import { Context } from '../../../context/Context';
import Swal from 'sweetalert2'
import axios from 'axios';

const SALogin = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "SALOGIN_START" });
    
    try {
        const res = await axios.post("/api/superAdmin/login", {
            email: userRef.current.value,
            password: passwordRef.current.value,
        })

        dispatch({ type: "SALOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: `${err.response.status}`,
        text: `${err.response.data}`,
      });
      dispatch({ type: "SALOGIN_FAILURE" });
    }
  };

  return (
    <>
      <Container>
        <Row className = "superadminLogin-row">
          <Col>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, stiffness: 150 }}>
            <div className = 'superadminLogin-banner'>
                  <h1>SmartCT</h1>
                  <p>Citizens x Technology</p>
            </div>
            </motion.div>
            <motion.div className="col-md-10 offset-md-1" initial={{ opacity: -3, x: '-100vw' }} animate={{ opacity: 1, x: 0 }} transition={{ stiffness: 150 }}>
              <Form className="superAdminLogin-form" onSubmit={handleSubmit}>
                
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    ref = { userRef }
                    required
                    autoComplete="off"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Choose a password"
                    ref = { passwordRef }
                    required
                    minLength="8"
                    autoComplete="off"
                  />
                </Form.Group>

                <Button variant="danger" type="submit" disabled={ isFetching }>
                  Login
                </Button>

                <Link className="superAdminLogin-link" to="/superAdmin-forgot">Forgot Password?</Link>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SALogin;
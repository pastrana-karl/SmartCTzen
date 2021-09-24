import React, { useContext, useRef } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './CitizenLogin.css';
import { Link } from 'react-router-dom';
import { Context } from '../../../context/Context';
import Swal from 'sweetalert2';
import axios from 'axios';

const CitizenLogin = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    
    try {
        const res = await axios.post("/api/citizen/login", {
            email: userRef.current.value,
            password: passwordRef.current.value,
        })

        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: `${err.response.status}`,
        text: `${err.response.data.message}`,
      });
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

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
              <Form className="citizenLogin-inputForm" onSubmit={handleSubmit}>
                
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                    ref = { userRef }
                    autoComplete="off"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    ref = { passwordRef }
                    autoComplete="off"
                  />
                </Form.Group>

                <Button variant="danger" type="submit" disabled={ isFetching }>
                  Submit
                </Button>

                <Link className="citizenLogin-link" to="/forgot-password">Forgot Password?</Link>
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
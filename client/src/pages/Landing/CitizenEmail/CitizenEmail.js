import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Redirect, useParams } from 'react-router';
import axios from 'axios'
import Swal from 'sweetalert2'
import './CitizenEmail.css';

const CitizenEmail = () => {
  const [newPassword, setNewPassword] = useState("");
  const [rNewPassword, setRNewPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { token } = useParams()
  console.log(token)

  const handleSubmit = async (e) => {
      e.preventDefault();

      if(newPassword === rNewPassword) {
        try {
          await axios.post("/api/citizen/citizenChange", {
              newPassword,
              token
          });

          Swal.fire('Change Success', "Your password has been changed.", 'success').then(
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
      } else {
        Swal.fire({
          icon: 'error',
          title: `Password Mismatch!`,
          text: `Password inputs doesn't match each other.`,
        });
      }
  };

  return (
    <>
      { redirect && (<Redirect to = '/login' />) }
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
              <Form className="citizenEmail-inputForm" onSubmit = { handleSubmit }>
                
                <Form.Group>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    placeholder="Enter your new password"
                    autoComplete="off"
                    required
                    onChange = {(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Retype Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="rNewPassword"
                    placeholder="Retype your new password"
                    autoComplete="off"
                    required
                    onChange = {(e) => setRNewPassword(e.target.value)}
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

export default CitizenEmail;
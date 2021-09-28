import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import axios from 'axios'
import { Redirect, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import './SAEmail.css';

const SAEmail = () => {
  const [newPassword, setNewPassword] = useState("");
  const [rNewPassword, setRNewPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { token } = useParams()

  const handleSubmit = async (e) => {
      e.preventDefault();

      if(newPassword === rNewPassword) {
        try {
          await axios.post("/api/superAdmin/change-password", {
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
      { redirect && (<Redirect to = '/superAdmin-login' />) }
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
              <Form className="superadminEmail-input" onSubmit = { handleSubmit }>
                
                <Form.Group>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    placeholder="Enter your new password"
                    autoComplete="off"
                    required
                    onChange = {(e) => {setNewPassword(e.target.value)}}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Retype New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="rNewPassword"
                    placeholder="Retype your new password"
                    autoComplete="off"
                    required
                    onChange = {(e) => {setRNewPassword(e.target.value)}}
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
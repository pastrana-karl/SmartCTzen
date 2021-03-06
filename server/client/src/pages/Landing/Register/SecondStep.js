import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const SecondStep = (props) => {
    const { citizen } = props;
    const { register, handleSubmit, errors } = useForm({
      defaultValues: {
          fathername: citizen.fathername,
          mothername: citizen.mothername
      }
    });

    const handleInfo = () => {
      Swal.fire({
        icon: 'info',
        title: 'Optional',
        text: 'This field is required if your proof of residency document is not addressed to you.',
      });
    }

  const onSubmit = (data) => {
    props.updateCitizen(data);
    // console.log(data.birthdate)
    props.history.push('/third');
  };

  return (
    <Form className="registerInput-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div className="col-md-6 offset-md-3" initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ stiffness: 150 }} id = 'register-panel'>
      <h2 style={{textAlign: "center", marginBottom: '15px'}}>Personal Information</h2>
        <Form.Group controlId="fathername">
          <Form.Label>Father Name <i className="fas fa-info-circle" onClick = { handleInfo } id="infoIconFields"></i></Form.Label>
          <Form.Control
            type="text"
            name="fathername"
            placeholder="Enter your Father's Full name"
            autoComplete="off"
            ref={register({
              pattern: {
                value: /^[a-zA-Z,.\s]+$/,
                message: 'Father\'s name should contain only characters.'
              }
            })}
            className={`${errors.fathername ? 'input-error' : ''}`}
          />
          {errors.fathername && (
            <p className="errorMsg">{errors.fathername.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="mothername">
          <Form.Label>Mother Name <i className="fas fa-info-circle" onClick = { handleInfo } id="infoIconFields"></i></Form.Label>
          <Form.Control
            type="text"
            name="mothername"
            placeholder="Enter your Mother's Full name"
            autoComplete="off"
            ref={register({
              pattern: {
                value: /^[a-zA-Z,.\s]+$/,
                message: 'Mother\'s name should contain only characters.'
              }
            })}
            className={`${errors.mothername ? 'input-error' : ''}`}
          />
          {errors.mothername && (
            <p className="errorMsg">{errors.mothername.message}</p>
          )}
        </Form.Group>

      
        <Button variant="danger" type="submit">
          Next
        </Button>

        <Link className="register-link" to="/create-account">Back</Link>
      </motion.div>
    </Form>
  );
};

export default SecondStep;
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SecondStep = (props) => {
    const { citizen } = props;
    const { register, handleSubmit, errors } = useForm({
    defaultValues: {
        fathername: citizen.fathername,
        mothername: citizen.mothername
    }
    });

  const onSubmit = (data) => {
    props.updateCitizen(data);
    // console.log(data.birthdate)
    props.history.push('/third');
  };

  return (
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div className="col-md-6 offset-md-3" initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ stiffness: 150 }}>
      <h2 style={{textAlign: "center", marginBottom: '15px'}}>Personal Information</h2>
        <Form.Group controlId="fathername">
          <Form.Label>Father Name</Form.Label>
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
          <Form.Label>Mother Name</Form.Label>
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
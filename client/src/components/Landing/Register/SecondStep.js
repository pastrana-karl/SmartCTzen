import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import axios from 'axios'
const SecondStep = (props) => {
    const { citizen } = props;
    const { register, handleSubmit, errors } = useForm({
      defaultValues: {
        firstname: citizen.firstname,
        lastname: citizen.lastname,
        email: citizen.email,
        password: citizen.password
      }
    });

  const onSubmit = async (data) => {
    const updatedData = {
      firstname: citizen.firstname,
      lastname: citizen.lastname
    };

    // console.log(citizen) Testing for data passing...
    props.updateCitizen(data);
    // props.history.push('/third');

    await axios.post('/api/citizen/register', {
      ...data,
      ...updatedData
    });
  };
  

  return (
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div className="col-md-6 offset-md-3" initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ stiffness: 150 }}>
        <Form.Group controlId="first_name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email address"
            autoComplete="off"
            ref={register({
              required: 'Email is required.',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Email is not valid.'
              }
            })}
            className={`${errors.email ? 'input-error' : ''}`}
          />
          {errors.email && (
            <p className="errorMsg">{errors.email.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Choose a password"
            autoComplete="off"
            ref={register({
              required: 'Password is required.',
              minLength: {
                value: 6,
                message: 'Password should have at-least 6 characters.'
              }
            })}
            className={`${errors.password ? 'input-error' : ''}`}
          />
          {errors.password && (
            <p className="errorMsg">{errors.password.message}</p>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </motion.div>
    </Form>
  );
};

export default SecondStep;
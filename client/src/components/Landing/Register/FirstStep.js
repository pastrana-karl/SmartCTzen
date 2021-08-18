import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './Register.css';

const FirstStep = (props) => {
    const { citizen } = props;
    const { register, handleSubmit, errors } = useForm({
    defaultValues: {
        firstname: citizen.firstname,
        lastname: citizen.lastname,
        middlename: citizen.middlename,
        suffix: citizen.suffix
    }
    });

  const onSubmit = (data) => {
    props.updateCitizen(data);
    props.history.push('/second');
  };

  return (
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div className="col-md-6 offset-md-3" initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ stiffness: 150 }}>
        <Form.Group controlId="firstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            placeholder="Enter your first name"
            autoComplete="off"
            ref={register({
              required: 'First name is required.',
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'First name should contain only characters.'
              }
            })}
            className={`${errors.firstname ? 'input-error' : ''}`}
          />
          {errors.firstname && (
            <p className="errorMsg">{errors.firstname.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            placeholder="Enter your last name"
            autoComplete="off"
            ref={register({
              required: 'Last name is required.',
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'Last name should contain only characters.'
              }
            })}
            className={`${errors.lastname ? 'input-error' : ''}`}
          />
          {errors.lastname && (
            <p className="errorMsg">{errors.lastname.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="middlename">
          <Form.Label>Middle Name</Form.Label>
          <Form.Control
            type="text"
            name="middlename"
            placeholder="Enter your middle name"
            autoComplete="off"
            ref={register({
              required: 'Middle name is required.',
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'Middle name should contain only characters.'
              }
            })}
            className={`${errors.middlename ? 'input-error' : ''}`}
          />
          {errors.middlename && (
            <p className="errorMsg">{errors.middlename.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="suffix">
          <Form.Label>Suffix</Form.Label>
          <Form.Control
            type="text"
            name="suffix"
            placeholder="Enter your suffix"
            autoComplete="off"
            // ref={register({
            //   required: 'Middle name is required.',
            //   pattern: {
            //     value: /^[a-zA-Z]+$/,
            //     message: 'Middle name should contain only characters.'
            //   }
            // })}
            // className={`${errors.middlename ? 'input-error' : ''}`}
          />
          {/* {errors.middlename && (
            <p className="errorMsg">{errors.middlename.message}</p>
          )} */}
        </Form.Group>

        <Button variant="primary" type="submit">
          Next
        </Button>
      </motion.div>
    </Form>
  );
};

export default FirstStep;
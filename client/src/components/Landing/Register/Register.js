import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import DatePicker from 'react-modern-calendar-datepicker';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { utils } from 'react-modern-calendar-datepicker';
import './Register.css';

const Register = (props) => {
    const Today = utils().getToday();
    const [startDate, setStartDate] = useState(Today);
    const Bday = `${startDate.month}.${startDate.day}.${startDate.year}`;
    const { citizen } = props;
    const { register, handleSubmit, errors } = useForm({
    defaultValues: {
        firstname: citizen.firstname,
        lastname: citizen.lastname,
        middlename: citizen.middlename,
        suffix: citizen.suffix,
        sex: citizen.sex,
        birthdate: citizen.birthdate
    }
    });

    const formatInputValue = () => {
      if (!startDate) return '';
      return  Bday;
    };

  const onSubmit = (data) => {
    props.updateCitizen(data);
    console.log(data.birthdate)
    // props.history.push('/second');
  };

  return (
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div className="col-md-6 offset-md-3" initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ stiffness: 150 }}>
      <h2 style={{textAlign: "center", marginBottom: '15px'}}>Personal Information</h2>
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
            ref={register({})}
          />
        </Form.Group>

        <Form.Group controlId="sex">
          <div><Form.Label>Sex</Form.Label></div>
            <Form.Check
              name="sex"
              type="radio" 
              label="Male"
              value="Male"
              inline
              ref={register({
                required: 'Selecting Gender is required.',
              })}
            />
            <Form.Check 
              name="sex"
              type="radio" 
              label="Female"
              value="Female"
              inline
              ref={register({
                required: 'Selecting Gender is required.',
              })}
            />
             {errors.sex && (
            <p className="errorMsg">{errors.sex.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="birthdate">
          <Form.Label>Birth Date</Form.Label>
          <div style={{display: 'none'}}>
            <Form.Control
              name="birthdate"
              value={Bday}
              onChange={setStartDate} 
              ref={register({
                required: 'Birth input is required.',
              })}
            />
          </div>
          <div>
            <DatePicker
              selected={startDate} 
              onChange={setStartDate}
              formatInputText={formatInputValue}
              shouldHighlightWeekends
            />
          </div>
           {errors.birthdate && (
            <p className="errorMsg">{errors.birthdate.message}</p>
          )}
        </Form.Group>
       
        <Button variant="danger" type="submit">
          Next
        </Button>
      </motion.div>
    </Form>
  );
};

export default Register;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { utils } from '@hassanmojab/react-modern-calendar-datepicker';
import { Link } from 'react-router-dom';
import './Register.css';

const FirstStep = (props) => {
    const dateToday = utils().getToday();
    const present =  utils().getToday();
    const [startDate, setStartDate] = useState(dateToday);
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

    const handleInfo = () => {
      Swal.fire({
        icon: 'info',
        title: 'Age Limit',
        text: 'User must be above 18 to create an account.',
      });
    }

    const formatInputValue = () => {
      const birth = startDate

      if (!startDate) return null;

      switch(`${present.month}`) {
        case '1':
            present.month = 'Januray';
            break;
        case '2':
           present.month = 'Febuary'; 
           break;
        case '3':
           present.month = 'March';
           break;
        case '4':
           present.month = 'April';
           break;
        case '5':
           present.month = 'May';
           break;
        case '6':
           present.month = 'June';
           break;
        case '7':
           present.month = 'July';
           break;
        case '8':
           present.month = 'August';
           break;
        case '9':
           present.month = 'September';
           break;
        case '10':
           present.month = 'October';
           break;
        case '11':
           present.month = 'November';
           break;
        case '12':
           present.month = 'December';
           break;
        default:
           break;
      }

      switch(`${startDate.month}`) {
        case '1':
            startDate.month = 'Januray'
            break;
        case '2':
           startDate.month = 'Febuary'
           break;
        case '3':
           startDate.month = 'March'
           break;
        case '4':
           startDate.month = 'April'
           break;
        case '5':
           startDate.month = 'May'
           break;
        case '6':
           startDate.month = 'June'
           break;
        case '7':
           startDate.month = 'July'
           break;
        case '8':
           startDate.month = 'August'
           break;
        case '9':
           startDate.month = 'September'
           break;
        case '10':
           startDate.month = 'October'
           break;
        case '11':
           startDate.month = 'November'
           break;
        case '12':
           startDate.month = 'December'
           break;
        default:
           break;
      }

      const yearPresent = present.year;
      const yearSelected = startDate.year;
      const yearCheck = yearPresent - yearSelected

      if (birth === dateToday){
        citizen.birthdate = '';
        return ''
      }else if(`${startDate.month} ${startDate.day}, ${startDate.year}` === `${present.month} ${present.day}, ${present.year}`){
        citizen.birthdate = '';
        return ''
      }else if(`${startDate.year}` === `${present.year}`){
        citizen.birthdate = '';
        return ''
      }else if(`${yearCheck}` <= 18){
        citizen.birthdate = '';
        return ''
      }else if(`${startDate.year}` > `${present.year}`){
        citizen.birthdate = '';
        return ''
      }else{
        return  `${startDate.month} ${startDate.day}, ${startDate.year}`;
      }
    };
  
  const handleBack = () => {
    props.resetCitizen();
  }

  const Bday = formatInputValue();

  const onSubmit = (data) => {
    props.updateCitizen(data);
    props.history.push('/second');
  };

  return (
    <Form className="registerInput-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div className="col-md-6 offset-md-3" initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ stiffness: 150 }} id = 'register-panel'>
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
                value: /^[a-zA-Z\s]+$/,
                message: 'First name should contain only characters.'
              }
            })}
            className={`${errors.firstname ? 'input-error' : ''}`}
          />
          {errors.firstname && (
            <p className="registerErrorMsg">{errors.firstname.message}</p>
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
                value: /^[a-zA-Z\s]+$/,
                message: 'Last name should contain only characters.'
              }
            })}
            className={`${errors.lastname ? 'input-error' : ''}`}
          />
          {errors.lastname && (
            <p className="registerErrorMsg">{errors.lastname.message}</p>
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
                value: /^[a-zA-Z.]+$/,
                message: 'Middle name should contain only characters.'
              }
            })}
            className={`${errors.middlename ? 'input-error' : ''}`}
          />
          {errors.middlename && (
            <p className="registerErrorMsg">{errors.middlename.message}</p>
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
            <p className="registerErrorMsg">{errors.sex.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="birthdate">
          <Form.Label>Birth Date <i className="fas fa-info-circle" onClick = { handleInfo } id="infoIconFields"></i></Form.Label>
          <div style={{display: "none"}}>
            <Form.Control
              name="birthdate"
              value={Bday}
              onChange={setStartDate} 
              ref={register({
                required: 'Birth input is required.',
              })}
             className={`${errors.birthdate ? 'input-error' : ''}`}
            />
          </div>
          <div>
            <DatePicker
              selected={startDate} 
              onChange={setStartDate}
              formatInputText={formatInputValue}
              shouldHighlightWeekends
            />
             {errors.birthdate && (
            <p className="registerErrorMsg">{errors.birthdate.message}</p>
          )}
          </div>
        </Form.Group>
       
        <Button variant="danger" type="submit">
          Next
        </Button>

        <Link className="firstStep-link" to="/" onClick={handleBack}>Back</Link>
        <Link className="register-link" to="/" onClick={handleBack}>Back</Link>
      </motion.div>
    </Form>
  );
};

export default FirstStep;
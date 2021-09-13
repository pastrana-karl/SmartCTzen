import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ThirdStep = (props) => {
    const { citizen } = props;
    const { register, handleSubmit, errors } = useForm({
    defaultValues: {
        street: citizen.street,
        barangay: citizen.barangay,
        city: citizen.city,
        province: citizen.province,
        zipcode: citizen.zipcode,
        region: citizen.region,
    }
    });

  const onSubmit = (data) => {
    props.updateCitizen(data);
    // console.log(data.birthdate)
    props.history.push('/fourth');
  };

  return (
    <Form className="registerInput-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div className="col-md-6 offset-md-3" initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ stiffness: 150 }} id = 'register-panel'>
      <h2 style={{textAlign: "center", marginBottom: '15px'}}>Personal Information</h2>
        <Form.Group controlId="street">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            name="street"
            placeholder="Blk/Lot/Street ..."
            autoComplete="off"
            ref={register({
              required: 'Blk/Lot/Street is required.',
              pattern: {
                value: /[a-zA-Z.\s]+$/,
                message: 'Input should contain only Blk/Lot/Street number, characters, and period.'
              }
            })}
            className={`${errors.street ? 'input-error' : ''}`}
          />
          {errors.street && (
            <p className="registerErrorMsg">{errors.street.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="barangay">
          <Form.Label>Barangay</Form.Label>
          <Form.Control
            type="text"
            name="barangay"
            placeholder="Barangay ..."
            autoComplete="off"
            ref={register({
              required: 'Barangay is required.',
              pattern: {
                value: /[a-zA-Z.\0-9\s]+$/,
                message: 'Barangay\'s name should contain only characters and number.'
              }
            })}
            className={`${errors.barangay ? 'input-error' : ''}`}
          />
          {errors.barangay && (
            <p className="registerErrorMsg">{errors.barangay.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            placeholder="City ..."
            autoComplete="off"
            ref={register({
              required: 'City is required.',
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'City\'s name should contain only characters.'
              }
            })}
            className={`${errors.city ? 'input-error' : ''}`}
          />
          {errors.city && (
            <p className="registerErrorMsg">{errors.city.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="province">
          <Form.Label>Province</Form.Label>
          <Form.Control
            type="text"
            name="province"
            placeholder="Province ..."
            autoComplete="off"
            ref={register({
              required: 'Province is required.',
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'Province\'s name should contain only characters.'
              }
            })}
            className={`${errors.province ? 'input-error' : ''}`}
          />
          {errors.province && (
            <p className="registerErrorMsg">{errors.province.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="zipcode">
          <Form.Label>Zipcode</Form.Label>
          <Form.Control
            type="text"
            name="zipcode"
            placeholder="Zipcode ..."
            maxLength="4"
            autoComplete="off"
            ref={register({
              required: 'Zipcode is required.',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Zipcode\'s name should contain only numbers.'
              }
            })}
            className={`${errors.zipcode ? 'input-error' : ''}`}
          />
          {errors.zipcode && (
            <p className="registerErrorMsg">{errors.zipcode.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="region">
          <Form.Label>Region</Form.Label>
          <Form.Control
            type="text"
            name="region"
            placeholder="Region ..."
            autoComplete="off"
            ref={register({
              required: 'Region is required.',
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'Region\'s name should contain only characters.'
              }
            })}
            className={`${errors.region ? 'input-error' : ''}`}
          />
          {errors.region && (
            <p className="registerErrorMsg">{errors.region.message}</p>
          )}
        </Form.Group>

      
        <Button variant="danger" type="submit">
          Next
        </Button>

        <Link className="register-link" to="/second">Back</Link>
      </motion.div>
    </Form>
  );
};

export default ThirdStep;
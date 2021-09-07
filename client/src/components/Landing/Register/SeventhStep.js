import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import axios from 'axios'
import Swal from 'sweetalert2';
import * as ReactBootStrap from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SeventhStep = (props) => {
  const { citizen } = props;
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      email: citizen.email,
      password: citizen.password
    }
  });

  const [loading, setLoading] =  useState(true);

  const onSubmit = async (data) => {
    setLoading(false);

    try {

      const validPhoto1 = citizen.validIDPic[0];
      const validPhoto2 = citizen.validIDPic[1];

      const residencyPhoto1 = citizen.residencyPic[0];
      const residencyPhoto2 = citizen.residencyPic[1];

      const birthPhoto1 = citizen.birthCertPic[0];
      const birthPhoto2 = citizen.birthCertPic[1];

      //photo submission handling for valid IDs...
      if(`${validPhoto1}` === `undefined` && `${validPhoto2}` === `undefined`){
        const validImage = [];
        citizen.validIDPic = validImage;
        console.log(validImage);
      }else if(`${validPhoto1}` !== `undefined` && `${validPhoto2}` === `undefined`){
        const validImage = [validPhoto1];
        const formData_1 = new FormData();
        validImage.forEach(validImage => formData_1.append("image", validImage));
        try {
                const res = await axios.post("/api/upload-images", formData_1);
                const img1 = res.data.data[0].url;
                const img = [img1];
                console.log(img)
                citizen.validIDPic = img;
            } catch (err) {
                console.log(err);
            }
      }else{
        const validImage = [validPhoto1, validPhoto2];
        const formData_1 = new FormData();
        validImage.forEach(validImage => formData_1.append("image", validImage));
        try {
                const res = await axios.post("/api/upload-images", formData_1);
                const img1 = res.data.data[0].url;
                const img2 = res.data.data[1].url;
                const img = [img1, img2];
                console.log(img)
                citizen.validIDPic = img;
            } catch (err) {
                console.log(err);
            }
      }

      //photo submission handling for proof of residency...
      if(`${residencyPhoto1}` === `undefined` && `${residencyPhoto2}` === `undefined`){
        const residencyImage = [];
        citizen.residencyPic = residencyImage;
        console.log(residencyImage);
      }else if(`${residencyPhoto1}` !== `undefined` && `${residencyPhoto2}` === `undefined`){
        const residencyImage = [residencyPhoto1];
        const formData_2 = new FormData();
        residencyImage.forEach(residencyImage => formData_2.append("image", residencyImage));
        try {
                const res = await axios.post("/api/upload-images", formData_2);
                const pic1 = res.data.data[0].url;
                const pic = [pic1];
                console.log(pic)
                citizen.residencyPic = pic
            } catch (err) {
                console.log(err);
            }
      }else{
        const residencyImage = [residencyPhoto1, residencyPhoto2];
        const formData_2 = new FormData();
        residencyImage.forEach(residencyImage => formData_2.append("image", residencyImage));
        try {
                const res = await axios.post("/api/upload-images", formData_2);
                const pic1 = res.data.data[0].url;
                const pic2 = res.data.data[1].url;
                const pic = [pic1, pic2];
                console.log(pic)
                citizen.residencyPic = pic
            } catch (err) {
                console.log(err);
            }
      }

      //photo submission handling for birth certificate...
      if(`${birthPhoto1}` === `undefined` && `${birthPhoto2}` === `undefined`){
        const birthImage = [];
        citizen.birthCertPic = birthImage;
        console.log(birthImage);
      }else if(`${birthPhoto1}` !== `undefined` && `${birthPhoto2}` === `undefined`){
        const birthImage = [birthPhoto1];
        const formData_3 = new FormData();
        birthImage.forEach(birthImage => formData_3.append("image", birthImage));
        try {
                const res = await axios.post("/api/upload-images", formData_3);
                const pho1 = res.data.data[0].url;
                const pho = [pho1];
                console.log(pho)
                citizen.birthCertPic = pho
            } catch (err) {
                console.log(err);
            }
      }else{
        const birthImage = [birthPhoto1, birthPhoto2];
        const formData_3 = new FormData();
        birthImage.forEach(birthImage => formData_3.append("image", birthImage));
        try {
                const res = await axios.post("/api/upload-images", formData_3);
                const pho1 = res.data.data[0].url;
                const pho2 = res.data.data[1].url;
                const pho = [pho1, pho2];
                console.log(pho)
                citizen.birthCertPic = pho
            } catch (err) {
                console.log(err);
            }
      }

      const updatedData = {
        email: data.email,
        password: data.password,
        validIDPic: citizen.validIDPic,
        residencyPic: citizen.residencyPic,
        birthCertPic: citizen.birthCertPic,
      };
      
      // console.log(citizen) Testing for data passing...
      console.log(updatedData)
    
      await axios.post('/api/citizen/register', {
        ...citizen,
        ...updatedData,
      });

      setLoading(true);

      if(loading === true){
        Swal.fire('Awesome!', "You're successfully registered!", 'success').then(
          (result) => {
            if (result.isConfirmed || result.isDismissed) {
              props.resetCitizen();
              props.history.push('/create-account');
             }
          });
      }
    } catch (err) {
        if (err.response) {
          if(loading === true){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'something wrong!',
            });
            props.resetCitizen();
            props.history.push('/create-account');
          }
        }
    }
  };
  

  return (
    <>
    {loading ? (
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

        <Button variant="danger" type="submit">
          Submit
        </Button>

        <Link className="register-link" to="/sixth">Back</Link>
      </motion.div>
      </Form>
    ) : (
      <div className = 'loading'>
        <div className = 'loading-title'>
          <h2>Processing Please Wait</h2>
        </div>
        <div className = 'loading-icons'>
          <ReactBootStrap.Spinner animation="grow" variant="primary" />
          <ReactBootStrap.Spinner animation="grow" variant="secondary" />
          <ReactBootStrap.Spinner animation="grow" variant="success" />
          <ReactBootStrap.Spinner animation="grow" variant="danger" />
          <ReactBootStrap.Spinner animation="grow" variant="warning" />
          <ReactBootStrap.Spinner animation="grow" variant="info" />
          <ReactBootStrap.Spinner animation="grow" variant="light" />
          <ReactBootStrap.Spinner animation="grow" variant="dark" />
        </div>
      </div>
    )}
    </>
  );
};

export default SeventhStep;
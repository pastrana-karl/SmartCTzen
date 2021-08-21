import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const SixthStep = (props) => {
    const { citizen } = props;
    const { register, handleSubmit, errors } = useForm({
    defaultValues: {
        birthCertPic: citizen.birthCertPic
    }
    });

  const onSubmit = (data) => {
    props.updateCitizen(data);
    // console.log(data.birthdate)
    props.history.push('/seventh');
  };

  return (
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div className="col-md-6 offset-md-3" initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ stiffness: 150 }}>
      <h2 style={{textAlign: "center", marginBottom: '15px'}}>Upload Birth Certificate (Optional)</h2>
      <div className="writeImg"><img src="https://images.pexels.com/photos/3170437/pexels-photo-3170437.jpeg" alt="" ></img></div>
        <Form.Group>
          <div className="uploadIcon">
            <Form.Label htmlFor="fileInput"><i className="writeIcon fas fa-image"></i></Form.Label>
          </div>
          <Form.Control
            type="file" 
            id="fileInput" 
            style={{ display: "none" }}
            // onChange={e => setFile(e.target.files[0])} 
            ref={register({ })}
            className={`${errors.fathername ? 'input-error' : ''}`}
          />
          {errors.fathername && (
            <p className="errorMsg">{errors.fathername.message}</p>
          )}
        </Form.Group>
      
        <Button variant="danger" type="submit">
          Next
        </Button>
      </motion.div>
    </Form>
  );
};

export default SixthStep;
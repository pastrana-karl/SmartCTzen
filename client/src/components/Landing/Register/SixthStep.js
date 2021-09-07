import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import ReactTooltip from "react-tooltip";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Link } from 'react-router-dom';

const SixthStep = (props) => {
    const { citizen } = props;
    const [file, setFile] = useState([]);
    const { register, handleSubmit, errors } = useForm({
    defaultValues: {
        birthCertPic: citizen.birthCertPic
    }
    });

  const onSubmit = (data) => {

    const updatedData = {
      birthCertPic: data.birthCertPic,
    };

    // console.log(updatedData);
    props.updateCitizen(updatedData);
    props.history.push('/seventh');
  };

  return (
    <div className = "input-form">
      <motion.div className="col-md-6 offset-md-3" initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ stiffness: 150 }}>
      <h2 style={{textAlign: "center", marginBottom: '15px'}}>Upload Birth Certificate</h2>
      <div className="writeImg">
        {file[1] ? ( 
          <div>
            <Slide easing="ease">
              <div className="each-slide">
                  <img src={URL.createObjectURL(file[0])} alt="" onClick={()=> window.open(URL.createObjectURL(file[0]), "_blank")}></img>
              </div>
              <div className="each-slide">
                  <img src={URL.createObjectURL(file[1])} alt="" onClick={()=> window.open(URL.createObjectURL(file[1]), "_blank")}></img>
              </div>
            </Slide>
          </div>) : [(file[0] && (
            <img key = {file} src={URL.createObjectURL(file[0])} alt="" onClick={()=> window.open(URL.createObjectURL(file[0]), "_blank")}></img>
        ))]}
      </div>
      <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <div className="uploadIcons">
            <Form.Label htmlFor="fileInput"><i className="writeIcon fas fa-image"></i></Form.Label>
            <div className="helpIcon">
              <i className="fas fa-info-circle" data-tip='( Optional ) Upload photo.. ( Max of 2 photos )' data-event='click focus'></i>
              <ReactTooltip place='right'/>
            </div>
          </div>
          <Form.Control
            type="file"
            name="birthCertPic" 
            id="fileInput" 
            style={{display:"none"}}
            onChange={(e) => setFile([...e.target.files])}
            multiple
            ref={register({})}
            className={`${errors.birthCertPic ? 'input-error' : ''}`}
          />
          {errors.birthCertPic && (
            <p className="errorMsg-photo">{errors.birthCertPic.message}</p>
          )}
        </Form.Group>
      
        <Button variant="danger" type="submit">
          Next
        </Button>
      </Form>

      <Link className="register-link" to="/fifth">Back</Link>
      </motion.div>
    </div>
  );
};

export default SixthStep;
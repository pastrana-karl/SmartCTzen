import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import ReactTooltip from "react-tooltip";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Link } from 'react-router-dom';

const FourthStep = (props) => {
    const { citizen } = props;
    const [file, setFile] = useState([]);
    const { register, handleSubmit, errors } = useForm({
    defaultValues: {
        validIDPic: citizen.validIDPic
    }
    });

  const onSubmit = async (data) => {

    const updatedData = {
      validIDPic: data.validIDPic,
    };

    // console.log(updatedData);
    props.updateCitizen(updatedData);
    props.history.push('/fifth');
  };

  return (
    <div className = "input-form">
      <motion.div className="col-md-6 offset-md-3" initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ stiffness: 150 }}>
      <h2 style={{textAlign: "center", marginBottom: '15px'}}>Upload Photo of Valid ID</h2>
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
              <i className="fas fa-info-circle" data-tip='Upload required photo.. ( Max of 2 photos )' data-event='click focus'></i>
              <ReactTooltip place='right'/>
            </div>
          </div>
          <Form.Control
            type="file"
            name="validIDPic" 
            id="fileInput" 
            style={{display:"none"}}
            multiple
            onChange={(e) => setFile([...e.target.files])}
            ref={register({ 
              required: 'Photos are Needed'
            })}
            className={`${errors.validIDPic ? 'input-error' : ''}`}
          />
          {errors.validIDPic && (
            <p className="errorMsg-photo">{errors.validIDPic.message}</p>
          )}
        </Form.Group>
      
        <Button variant="danger" type="submit">
          Next
        </Button>
      </Form>

      <Link className="register-link" to="/third">Back</Link>
      </motion.div>
    </div>
  );
};

export default FourthStep;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import ReactTooltip from "react-tooltip";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const FifthStep = (props) => {
    const { citizen } = props;
    const [file, setFile] = useState([]);
    const { register, handleSubmit, errors } = useForm({
    defaultValues: {
        residencyPic: citizen.residencyPic
    }
    });

  const onSubmit = (data) => {

    const updatedData = {
      residencyPic: data.residencyPic,
    };

    // console.log(updatedData);
    props.updateCitizen(updatedData);
    props.history.push('/sixth');
  };

  return (
    <div className = "input-form">
      <motion.div className="col-md-6 offset-md-3" initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ stiffness: 150 }}>
      <h2 style={{textAlign: "center", marginBottom: '15px'}}>Upload Photo of Residency</h2>
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
            name="residencyPic" 
            id="fileInput" 
            style={{display:"none"}}
            onChange={(e) => setFile([...e.target.files])}
            multiple
            ref={register({ 
              required: 'Photos are Needed'
            })}
            className={`${errors.residencyPic ? 'input-error' : ''}`}
          />
          {errors.residencyPic && (
            <p className="errorMsg">{errors.residencyPic.message}</p>
          )}
        </Form.Group>
      
        <Button variant="danger" type="submit">
          Next
        </Button>
      </Form>
      </motion.div>
    </div>
  );
};

export default FifthStep;
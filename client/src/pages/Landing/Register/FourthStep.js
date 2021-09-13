import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import ReactTooltip from "react-tooltip";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const FourthStep = (props) => {
  const { citizen } = props;
  const [file, setFile] = useState([]);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      validIDPic: citizen.validIDPic
    }
  });

  const settings = {
    dots: true,
    fade: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
    className: 'slides'
  }

  const onSubmit = async (data) => {
    const updatedData = {
      validIDPic: data.validIDPic,
    };

    if(file[0] === undefined) {
      document.getElementById("fileInput").value = "";
      alert("Input image files again!");
    } else {
      // console.log(updatedData);
      props.updateCitizen(updatedData);
      props.history.push('/fifth');
    }
  };

  return (
    <div className = "registerInput-form">
      <motion.div className="col-md-6 offset-md-3" initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ stiffness: 150 }} id = 'register-panel'>
      <h2 style={{textAlign: "center", marginBottom: '15px'}}>Upload Photo of Valid ID</h2>
      <div className="registerSeeImg">
        {file[1] ? ( 
          <div>
            <Slider {...settings}>
              <div>
                  <img src={URL.createObjectURL(file[0])} alt="" onClick={()=> window.open(URL.createObjectURL(file[0]), "_blank")}></img>
              </div>
              <div>
                  <img src={URL.createObjectURL(file[1])} alt="" onClick={()=> window.open(URL.createObjectURL(file[1]), "_blank")}></img>
              </div>
            </Slider>
          </div>) : [(file[0] && (
            <img key = {file} src={URL.createObjectURL(file[0])} alt="" onClick={()=> window.open(URL.createObjectURL(file[0]), "_blank")}></img>
        ))]}
      </div>
      <Form className="registerInput-form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <div className="registerUploadIcon">
            <Form.Label htmlFor="fileInput"><i className="registerUploadImgIcon fas fa-image"></i></Form.Label>
            <div className="registerHelpIcon">
              <i className="fas fa-info-circle" data-tip='Upload required photo.. ( Max of 2 photos )' data-event='click focus'></i>
              <ReactTooltip place='right'/>
            </div>
          </div>
          <input
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
            <p className="registerErrorMsg-photo">{errors.validIDPic.message}</p>
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
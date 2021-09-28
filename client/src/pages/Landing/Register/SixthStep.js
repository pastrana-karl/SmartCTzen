import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const SixthStep = (props) => {
  const { citizen } = props;
  const [file, setFile] = useState([]);
  const [reqTrigger, setReqTrigger] = useState('');
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
        birthCertPic: citizen.birthCertPic
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

  const handleInfo = () => {
    Swal.fire({
      icon: 'info',
      title: 'Optional Document',
      text: 'Photo/s of this document is required if previous documents (e.g. Proof of residency), is not addressed to you. (Max of two (2) photos)',
    });
  }

  const onSubmit = (data) => {
    const updatedData = {
      birthCertPic: data.birthCertPic,
    };

    if(citizen.birthCertPic !== undefined) {

      if(citizen.birthCertPic.length > 0) {

        document.getElementById("fileInput").value = "";
        alert("Input image files again!");
        setReqTrigger(1);

      } else if (reqTrigger === 1) {

          if(file[0] === undefined) {
            alert("Input image files again!");
          } else {
            props.updateCitizen(updatedData);
            props.history.push('/seventh');
          }

      } else {

          props.updateCitizen(updatedData);
          props.history.push('/seventh');

      }
    } else {

      // console.log(updatedData);
      props.updateCitizen(updatedData);
      props.history.push('/seventh');

    }
  };

  return (
    <div className = "registerInput-form">
      <motion.div className="col-md-6 offset-md-3" initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ stiffness: 150 }} id = 'register-panel'>
      <h2 style={{textAlign: "center", marginBottom: '15px'}}>Upload Birth Certificate</h2>
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
              <i className="fas fa-info-circle" onClick = { handleInfo }></i>
            </div>
          </div>
          <input
            type="file"
            name="birthCertPic" 
            id="fileInput" 
            style={{display:"none"}}
            onChange={(e) => setFile([...e.target.files])}
            multiple
            ref={register({
              requried: reqTrigger
            })}
            className={`${errors.birthCertPic ? 'input-error' : ''}`}
          />
          {errors.birthCertPic && (
            <p className="registerErrorMsg-photo">{errors.birthCertPic.message}</p>
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
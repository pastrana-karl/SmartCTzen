import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const FifthStep = (props) => {
  const { citizen } = props;
  const [file, setFile] = useState([]);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
        residencyPic: citizen.residencyPic
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
      title: 'Required Document',
      text: 'Photo/s of this document is required for account verificaton. (Max of two (2) photos)',
    });
  }

  const onSubmit = (data) => {
    const updatedData = {
      residencyPic: data.residencyPic,
    };

    if(file[0] === undefined) {
      document.getElementById("fileInput").value = "";
      alert("Input image files again!");
    } else {
    // console.log(updatedData);
    props.updateCitizen(updatedData);
    props.history.push('/sixth');
    }
  };

  return (
    <div className = "registerInput-form">
      <motion.div className="col-md-6 offset-md-3" initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ stiffness: 150 }} id = 'register-panel'>
      <h2 style={{textAlign: "center", marginBottom: '15px'}}>Upload Photo of Residency</h2>
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
            <p className="registerErrorMsg-photo">{errors.residencyPic.message}</p>
          )}
        </Form.Group>
      
        <Button variant="danger" type="submit">
          Next
        </Button>
      </Form>

      <Link className="register-link" to="/fourth">Back</Link>
      </motion.div>
    </div>
  );
};

export default FifthStep;
import React, { useEffect, useState, useContext } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as ReactBootStrap from 'react-bootstrap';
import * as Yup from 'yup';
import { Redirect } from 'react-router';
import { Row, Col, Container, Button } from 'react-bootstrap';
import FormikInput from '../../../../components/UI/Input/FormikInput/FormikInput';
import SubmitButton from '../../../../components/UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../../components/UI/Buttons/CancelButton/CancelButton';
import Swal from 'sweetalert2';
import { Context } from '../../../../context/Context';
import classes from './CitizenCreateProposals.module.css';
import axios from 'axios';


const CitizenCreateProposal = () => {
    const citizenUser = useContext(Context);
    const [userId, setUserId] = useState();
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] =  useState(true);
    const [file, setFile] = useState(null);
    const userType = citizenUser.user.data.user.userType;

    useEffect(() => {
        const getUserId = async () => {
            const { user:{ data: { user: { firstname } } }} = citizenUser;
            const { user:{ data: { user: { lastname } } }} = citizenUser;
            let username = JSON.stringify(firstname+" "+lastname);
            username = username.replace(/['"]+/g, '');
            setUserId(username);
        }
        getUserId();
    },[]);

    console.log(userId);  
    const initialValues = {
        userId: citizenUser.user.data.user._id,
        userName: '',
        title: '',
        description: '',
        location: '',
        status:'Pending',
    
    };
    
    
    const onSubmit = async (values) => {
        console.log('Form values', values);

        const userName = values.userName.replace('',userId)
        const newValues = {...values, userName, userType}
        const coverImage = "";

        const proposalData = {
            description: newValues.description,
            location: newValues.location,
            status: newValues.status,
            title: newValues.title,
            userId: newValues.userId,
            userName: newValues.userName,
            userType: newValues.userType,
            coverImage,
        }

        if (file) {
            setLoading(false);
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            data.append("upload_preset", "SmartCTzen");
            data.append("cloud_name", "smartct-media");
            try {
                const res = await axios.post("https://api.cloudinary.com/v1_1/karlstorage/image/upload", data);
                proposalData.coverImage = res.data.secure_url;

                try {
                    const res = await axios.post('/api/proposals', proposalData).catch(err => {
                        console.log('Error: ', err.res.data);
                    });

                    Swal.fire({
                        icon: 'success',
                        title: 'Proposal Created!',
                        text: 'Your proposal is been posted . . .'
                    });

                    setLoading(true);
                    setRedirect(true);
                } catch (err) {
                    console.log(err)
                    setLoading(true);
                }
            } catch (err) {
                console.log(err)
                setLoading(true);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Photo is requried!',
                text: 'Upload a photo',
            });
            setLoading(true);
        }
    };
    
    const validationSchema = Yup.object({
        userName: Yup.string(),
        title: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        location: Yup.string().required("Required"),
    });
    // console.log(citizenUser.user.data.user._id);
    return(
        <>
            { redirect && (<Redirect to = '/citizen-proposals' />) }
            {loading ? (
            <Container className={classes.CitizenCreateProposalContentContainer}>
                <Row>
                    <div className={classes.QuoteDiv}>
                        <h1>Go create your proposal and make an impact!</h1>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form className={classes.CitizenCreateProposalForm}>
                            <Col>
                                <Row className={classes.CitizenCreateProposalFormTopRow}>
                                    <Col className={classes.CitizenCreateProposalFormTopRow2}>
                                        <Row className={classes.CitizenCreateProposalFormInput}>
                                            <label>Proposal Title</label>
                                            <FormikInput 
                                            type="text"
                                            placeholder="Proposal Title"
                                            id="title"
                                            name="title"
                                            />
                                            <ErrorMessage name="title">
                                                {errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>}
                                            </ErrorMessage>
                                        </Row>
                                        <Row className={classes.CitizenCreateProposalFormInput}>
                                            <label>Description</label>
                                            <FormikInput 
                                                type="text"
                                                placeholder="Description"
                                                id="description"
                                                name="description"
                                            />
                                            <ErrorMessage name="description">
                                                {
                                                    errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
                                                }
                                            </ErrorMessage>
                                        </Row>
                                    </Col>
                                    <Col className={classes.CitizenCreateProposalHeader}>
                                            <h2>Pursue your calling </h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className={classes.CitizenCreateProposalFormInput} >
                                        <label>Where</label>
                                        <FormikInput 
                                            type="text"
                                            placeholder="Where"
                                            id="location"
                                            name="location"
                                        />
                                        <ErrorMessage name="location">
                                            {
                                                errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
                                            }
                                        </ErrorMessage>
                                    </Col>
                                    {/* <Col></Col> */}
                                </Row>
                                <Row className={classes.CitizenSubmitProposalPhotoInputContainer}>
                                    <label style={{textAlign: 'center', marginTop: '5%'}}>Photo</label>
                                    <Col className={classes.CitizenCreateProposalPhotoInput}>
                                        <div className={classes.CitizenCreateProposalImg}>
                                            {file && <img src = { (URL.createObjectURL(file)) } alt = '' onClick={()=> window.open(URL.createObjectURL(file), "_blank")}/>}
                                        </div>

                                        <label  htmlFor="coverImage"><i className="icon fas fa-image"></i></label>

                                        <Field 
                                            type="file"
                                            id="coverImage"
                                            name="coverImage"
                                            style={{display: 'none'}}
                                            onChange = {(e) => setFile(e.target.files[0])}
                                        />
                                        <ErrorMessage name="coverImage">
                                            {
                                                errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
                                            }
                                        </ErrorMessage>
                                    </Col>

                                    {/* <Col></Col> */}
                                </Row>
                                <Row>
                                    <Col>
                                        <div className={classes.ButtonDiv}>
                                            <SubmitButton />
                                            <button type="reset" className={classes.CitizenCreateProposalClearBtn}>Clear</button>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Form>
                    </Formik>    
                </Row>
            </Container>
            ) : (
                    <div style = {{
                        color: '#777',
                        textAlign: 'center',
                    }}>
                      <h2 style = {{marginTop: '10%'}}>Processing Please Wait</h2>
                      <div>
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

    //  {/* <React.Fragment> */}
    //          {/* <div className={classes.CitizenCreateProposalContentDiv}> */}
    //              {/* <div className={classes.QuoteDiv}> */}
    //                  {/* <h1>Go create your proposal and make an impact!</h1> */}
    //              {/* </div> */}

    //              {/* <Formik */}
    //                 {/* //  initialValues={initialValues}
    //                 //  validationSchema={validationSchema}
    //                 //  onSubmit={onSubmit}
    //             //  > */}
    //                  {/* <Form className={classes.CitizenCreateProposalForm}> */}
    //                      {/* <div className={classes.CitizenCreateProposalFormDiv}> */}
    //                          {/* <div className={classes.CitizenCreateProposalFormInput}> */}
    //                              {/* <label>Proposal Title</label> */}
    //                              {/* <FormikInput  */}
    //                                 {/* //  type="text"
    //                                 //  placeholder="Proposal Title"
    //                                 //  id="title"
    //                                 //  name="title"
    //                             //  /> */}
    //                              {/* <ErrorMessage name="title"> */}
    //                                  {/* {errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>} */}
    //                              {/* </ErrorMessage> */}
    //                          {/* </div> */}
    //                          {/* <div className={classes.CitizenCreateProposalFormInput}> */}
    //                              {/* <label>Description</label> */}
    //                              {/* <FormikInput  */}
    //                                 {/* //  type="text"
    //                                 //  placeholder="Description"
    //                                 //  id="description"
    //                                 //  name="description"
    //                             //  /> */}
    //                              {/* <ErrorMessage name="name"> */}
    //                                  {/* { */}
    //                                     {/* //  errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
    //                                 //  } */}
    //                              {/* </ErrorMessage> */}
    //                          {/* </div> */}
    //                          {/* <div className={classes.CitizenCreateProposalFormInput}> */}
    //                              {/* <label>When</label> */}
    //                              {/* <FormikInput  */}
    //                                 {/* //  type="text"
    //                                 //  placeholder="When"
    //                                 //  id="date"
    //                                 //  name="date"
    //                             //  /> */}
    //                              {/* <ErrorMessage name="date"> */}
    //                                  {/* { */}
    //                                     {/* //  errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
    //                                 //  } */}
    //                              {/* </ErrorMessage> */}
    //                          {/* </div> */}
    //                          {/* <div className={classes.CitizenCreateProposalFormInput}> */}
    //                              {/* <label>Where</label> */}
    //                              {/* <FormikInput  */}
    //                                 {/* //  type="text"
    //                                 //  placeholder="Where"
    //                                 //  id="location"
    //                                 //  name="location"
    //                             //  /> */}
    //                              {/* <ErrorMessage name="location"> */}
    //                                  {/* { */}
    //                                     {/* //  errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
    //                                 //  } */}
    //                              {/* </ErrorMessage> */}
    //                          {/* </div> */}
    //                      {/* </div> */}
    //                      {/* <div className={classes.ButtonDiv}> */}
    //                          {/* <SubmitButton /> */}
    //                          {/* <CancelButton /> */}
    //                      {/* </div> */}
    //                  {/* </Form> */}
    //              {/* </Formik> */}
    //          {/* </div> */}
    //      {/* </React.Fragment> */}
    );
};

export default CitizenCreateProposal;
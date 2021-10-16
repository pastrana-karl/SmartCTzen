import React, { useEffect, useState, useContext } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as ReactBootStrap from 'react-bootstrap';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import FormikInput from '../../../../components/UI/Input/FormikInput/FormikInput';
import SubmitButton from '../../../../components/UI/Buttons/SubmitButton/SubmitButton';
import Swal from 'sweetalert2';
import { Context } from '../../../../context/Context';
import axios from 'axios';
import classes from './CitizenSubmitReport.module.css';

const CitizenSubmitReport = () => {
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
    },[citizenUser]);

    const initialValues = {
        userId: citizenUser.user.data.user._id,
        userName: '',
        title: '',
        description: '',
        location: '',
        status:'Pending',
    
    };
    
    
    const onSubmit = async (values) => {

        const userName = values.userName.replace('',userId)
        const newValues = {...values, userName, userType}
        const images = "";

        const reportData = {
            description: newValues.description,
            location: newValues.location,
            status: newValues.status,
            title: newValues.title,
            userId: newValues.userId,
            userName: newValues.userName,
            userType: newValues.userType,
            images,
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
                const res = await axios.post("https://api.cloudinary.com/v1_1/smartct-media/image/upload", data);
                reportData.images = res.data.secure_url;

                try {
                    await axios.post('/api/reports', reportData).catch(err => {
                        console.log('Error: ', err.res.data);
                    });
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Report Created!',
                        text: 'Your report is been posted . . .'
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

    return(
        <>
            { redirect && (<Redirect to = '/citizen-reports' />) }
            {loading ? (
            <Container className={classes.CitizenSubmitReportsContentContainer}>
                <Row>
                    <div className={classes.CitizenSubmitReportsQuotesDiv}>
                        <h1>Found a problem? Go submit a report</h1>
                    </div>
                    <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    >
                        <Form className={classes.CitizenSubmitReportForm}>
                            <Col>
                                <Row>
                                    <Col>
                                        <Row className={classes.CitizenSubmitReportFormInput}>
                                            <label>Report Title</label>
                                            <FormikInput 
                                            type="text"
                                            placeholder="Report Title"
                                            id="title"
                                            name="title"
                                            />
                                            <ErrorMessage name="title">
                                                {errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>}
                                            </ErrorMessage>
                                        </Row>
                                        <Row className={classes.CitizenSubmitReportFormInput}>
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
                                    <Col className={classes.CitizenSubmitReportHeader}>
                                        <h2>Reporting a problem or an issue is your <span className={classes.texthighlight}>ambag</span></h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className={classes.CitizenSubmitReportFormInput}>
                                        <label>Location</label>
                                        <FormikInput 
                                            type="text"
                                            placeholder="Location"
                                            id="location"
                                            name="location"
                                        />
                                        <ErrorMessage name="location">
                                            {
                                                errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
                                            }
                                        </ErrorMessage>
                                    </Col>
                                </Row>
                                <Row className={classes.CitizenSubmitReportPhotoInputContainer}>
                                    <label style={{textAlign: 'center', marginTop: '5%'}}>Photo</label>
                                    <Col className={classes.CitizenSubmitReportPhotoInput}>
                                        <div className={classes.CitizenSubmitReportImg}>
                                            {file && <img src = { (URL.createObjectURL(file)) } alt = '' onClick={()=> window.open(URL.createObjectURL(file), "_blank")}/>}
                                        </div>
                                        <label  htmlFor="images"><i className="fas fa-image"></i></label>
                                        <Field 
                                            type="file"
                                            id="images"
                                            name="images"
                                            style={{display: 'none'}}
                                            onChange = {(e) => setFile(e.target.files[0])}
                                        />
                                        <ErrorMessage name="images">
                                            {
                                                errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
                                            }
                                        </ErrorMessage>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className={classes.CitizenSubmitReportButtonDiv}>
                                            <SubmitButton />
                                            <button type="reset" className={classes.CitizenSubmitReportClearBtn}>Clear</button>
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
    );
};

export default CitizenSubmitReport;
import React, { useEffect, useState, useContext } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import FormikInput from '../../../../components/UI/Input/FormikInput/FormikInput';
import SubmitButton from '../../../../components/UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../../components/UI/Buttons/CancelButton/CancelButton';
import Swal from 'sweetalert2';
import { Context } from '../../../../context/Context';
import classes from '../../CitizenProposals/CreateProposals/CitizenCreateProposals.module.css';
import axios from 'axios';
import './CitizenSubmitReport.css';

const CitizenSubmitReport = () => {
    const citizenUser = useContext(Context);
    const [userId, setUserId] = useState();
    const [redirect, setRedirect] = useState(false);
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
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            data.append("upload_preset", "dev_prac");
            data.append("cloud_name", "karlstorage");
            try {
                const res = await axios.post("https://api.cloudinary.com/v1_1/karlstorage/image/upload", data);
                reportData.images = res.data.secure_url;

                try {
                    const res = await axios.post('/api/reports', reportData).catch(err => {
                        console.log('Error: ', err.res.data);
                    });
                    
                    setRedirect(true);
                } catch (err) {
                    console.log(err)
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Photo is requried!',
                text: 'Upload a photo',
            });
        }
    };
    
    const validationSchema = Yup.object({
        userName: Yup.string(),
        title: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        location: Yup.string().required("Required"),
    });

    return(
        <React.Fragment>
            { redirect && (<Redirect to = '/citizen-reports' />) }
            <Container className="citizenSubmitReport-container">
                <Row>
                    <div className="citizen-header">
                        <h1>Found a Problem? Go Submit a Report</h1>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form className="citizenSubmitReport-edit">
                            <Col>
                                <Row>
                                    <Col sm={6}>
                                        <Row className="citizenSubmitReport-input">
                                            <label>Report Title</label>
                                            <FormikInput 
                                            type="text"
                                            placeholder="Report Title"
                                            id="title"
                                            name="title"
                                            />
                                            <ErrorMessage name="title">
                                                {errorMsg => <div className="InputValidation">{errorMsg}</div>}
                                            </ErrorMessage>
                                            <label>Description</label>
                                            <FormikInput 
                                                type="text"
                                                placeholder="Description"
                                                id="description"
                                                name="description"
                                            />
                                            <ErrorMessage name="description">
                                                {
                                                    errorMsg => <div className="InputValidation">{errorMsg}</div>
                                                }
                                            </ErrorMessage>
                                        </Row>
                                    </Col>
                                    <Col className="citizenSubmitReportQuote">
                                        <h2>Reporting a problem or an issue is your <span className="text-highlight">ambag</span></h2>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col className="citizenSubmitReport-input">
                                        <label>Location</label>
                                        <FormikInput 
                                            type="text"
                                            placeholder="Location"
                                            id="location"
                                            name="location"
                                        />
                                        <ErrorMessage name="location">
                                            {
                                                errorMsg => <div className="InputValidation">{errorMsg}</div>
                                            }
                                        </ErrorMessage>
                                    </Col>
                                </Row>
                                <Row className={classes.CitizenCreateProposalPhotoInput}>
                                    <Col className={classes.CitizenCreateProposalFormInput} >
                                        <label style={{textAlign: 'center', marginTop: '5%'}}>Photo</label>

                                        <div className = 'CitizenCreateProposalImg'>
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
                                        <div className="ButtonDiv">
                                            <SubmitButton />
                                            <CancelButton />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            
                        </Form>
                    </Formik>  
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default CitizenSubmitReport;
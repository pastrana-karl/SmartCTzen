import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { Formik, Form, ErrorMessage } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { Context } from '../../../../context/Context';
import FormikInput from '../../../../components/UI/Input/FormikInput/FormikInput';
import SubmitButton from '../../../../components/UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../../components/UI/Buttons/CancelButton/CancelButton';
import './CitizenSubmitReport.css';
import classes from '../../CitizenProposals/CreateProposals/CitizenCreateProposals.module.css';


const CitizenSubmitReport = () => {
    const citizenUser = useContext(Context);
    const [userId, setUserId] = useState();
    const history = useHistory();

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

    console.log("test2");
    const initialValues = {
        userName:'',
        title: '',
        description: '',
        // date: '',
        location: ''
    };
    
    
    const onSubmit = async (values) => {
        console.log('Form values', values);

        const userName = values.userName.replace('',userId)
        const newValues = {...values, userName}
    
        const {...data} = newValues;
        const res = await axios.post('/api/reports', data)
            .catch(err => {
                console.log('Error: ', err.res.data);
            });
        console.log(res);
    };
    
    const validationSchema = Yup.object({
        //get user
        userName: Yup.string(),
        title: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        // date: Yup.string().required('Required'),
        location: Yup.string().required("Required")
    });

    return(
        <React.Fragment>
            <Container className={classes.CitizenCreateProposalContentContainer}>
                {/* <div className = 'col-lg-10 offset-lg-1'> */}
                <Row>
                    <div className={classes.QuoteDiv}>
                        <h1>Found a Problem? Go Submit a Report</h1>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form className={classes.CitizenCreateProposalForm}>
                            <Col>
                                <Row>
                                    <Col sm={6}>
                                        <Row className={classes.CitizenCreateProposalFormInput}>
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
                                        <Row className={classes.CitizenCreateProposalFormInput}>
                                            <label>Description</label>
                                            <FormikInput 
                                                type="text"
                                                placeholder="Description"
                                                id="description"
                                                name="description"
                                            />
                                            <ErrorMessage name="name">
                                                {
                                                    errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
                                                }
                                            </ErrorMessage>
                                        </Row>
                                    </Col>
                                    <Col className={classes.CitizenCreateProposalHeader}>
                                        <h2>Reporting a problem or an issue is your <span className="text-highlight">ambag</span></h2>
                                    </Col>
                                </Row>
                                <Row >
                                    {/* <Col className={classes.CitizenCreateProposalFormInput}>
                                        <label>When to Start Hopefully</label>
                                        <FormikInput 
                                        type="text"
                                        placeholder="Date of Start hopefully"
                                        id="date"
                                        name="date"
                                        />
                                        <ErrorMessage name="date">
                                            {
                                                errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
                                            }
                                        </ErrorMessage>
                                    </Col> */}
                                    <Col className={classes.CitizenCreateProposalFormInput}>
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
                                <Row>
                                    {/* <Col className={classes.CitizenCreateProposalFormInput} >
                                        <label>Photo</label>
                                        <FormikInput 
                                            type="text"
                                            placeholder="Photo"
                                            id="photo"
                                            name="photo"
                                        />
                                        <ErrorMessage name="photo">
                                            {
                                                errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
                                            }
                                        </ErrorMessage>
                                    </Col> */}
                                    <Col>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className={classes.ButtonDiv}>
                                            <SubmitButton />
                                            <CancelButton />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            
                        </Form>
                    </Formik>  
                </Row>
                {/* </div> */}
            </Container>
        </React.Fragment>
        // <React.Fragment>
        //     <Container className = 'citizenSubmitReport-container'>
        //         <div className='citizen-header'>
        //             <h3>Found a Problem? Go Submit a Report</h3>
        //         </div>
        //         {/* <Row className='citizenSubmitReport-row-container'> */}
        //         <Row>
        //             <Col className='citizenSubmitReportForm'>
        //                 {/* <Form className = 'citizenSubmitReport-edit'> */}
        //                 <Form>
        //                     <Form.Group controlId="email">
        //                         <Form.Label>Report Title</Form.Label>
        //                         <Form.Control
        //                             className='citizenSubmitReport-input'
        //                             type="text"
        //                             name="cpass"
        //                             autoComplete="off"
        //                         />
        //                     </Form.Group>
        //                     <Form.Group controlId="email">
        //                         <Form.Label>Description</Form.Label>
        //                         <Form.Control
        //                             className='citizenSubmitReport-input'
        //                             type="text"
        //                             name="cpass"
        //                             autoComplete="off"
        //                         />
        //                     </Form.Group>
        //                     <Form.Group controlId="email">
        //                         <Form.Label>Location</Form.Label>
        //                         <Form.Control
        //                             className='citizenSubmitReport-input'
        //                             type="text"
        //                             name="cpass"
        //                             autoComplete="off"
        //                         />
        //                     </Form.Group>
        //                     <Form.Group controlId="email">
        //                         <Form.Label>Photo</Form.Label>
        //                         <Form.Control
        //                             className='citizenSubmitReport-input'
        //                             type="text"
        //                             name="cpass"
        //                             autoComplete="off"
        //                         />
        //                     </Form.Group>
        //                     {/* <Form.Group controlId="email">
        //                         <Form.Label>Where It Happened Bro?</Form.Label>
        //                         <Form.Control
        //                             className='citizenSubmitReport-input'
        //                             type="text"
        //                             name="cpass"
        //                             autoComplete="off"
        //                         />
        //                     </Form.Group> */}
        //                 </Form>
        //             </Col>
        //             <Col className='citizenSubmitReportQuote'>
        //                 <div className='quotebox'>
        //                     <h4>Reporting a problem or an issue is your <span className="text-highlight">ambag</span></h4>
        //                 </div>
        //             </Col>
        //         </Row>    
        //             <Row className='btn-container'>
        //                 <Col className='btnContainerCenter'>
        //                     <Link to = '/citizen-reports' className = 'citizenSubmitReport-BtnCancel'>Cancel</Link>
        //                 </Col>
        //                 <Col className='btnContainerCenter'>
        //                     <SubmitButton/>
        //                 </Col>
        //             </Row>
                
        //     </Container>
        // </React.Fragment>
    );
};

export default CitizenSubmitReport;
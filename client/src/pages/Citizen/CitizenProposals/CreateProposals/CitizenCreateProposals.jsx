import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';

import CardHeader from '../../../../components/UI/Cards/CardHeader/CardHeader';
//import AdminLayout from '../AdminLayout/AdminLayout';
import Input from '../../../../components/UI/Input/Input';
import FormikInput from '../../../../components/UI/Input/FormikInput/FormikInput';
import SubmitButton from '../../../../components/UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../../components/UI/Buttons/CancelButton/CancelButton';

import classes from './CitizenCreateProposals.module.css';

const initialValues = {
    title: '',
    description: '',
    date: '',
    location: ''
};

const onSubmit = async (values) => {
    console.log('Form values', values);

    const {...data} = values;

    console.log(data);
    const res = await axios.post('/api/initiatives', data)
        .catch(err => {
            console.log('Error: ', err.res.data);
        });
    
};

const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    date: Yup.string().required('Required'),
    location: Yup.string().required("Required")
});

const CitizenCreateProposal = ( props ) => (
        // <React.Fragment>
        //     <div className={classes.CitizenCreateProposalContentDiv}>
        //         <div className={classes.QuoteDiv}>
        //             <h1>Go create your proposal and make an impact!</h1>
        //         </div>

        //         <Formik
        //             initialValues={initialValues}
        //             validationSchema={validationSchema}
        //             onSubmit={onSubmit}
        //         >
        //             <Form className={classes.CitizenCreateProposalForm}>
        //                 <div className={classes.CitizenCreateProposalFormDiv}>
        //                     <div className={classes.CitizenCreateProposalFormInput}>
        //                         <label>Proposal Title</label>
        //                         <FormikInput 
        //                             type="text"
        //                             placeholder="Proposal Title"
        //                             id="title"
        //                             name="title"
        //                         />
        //                         <ErrorMessage name="title">
        //                             {errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>}
        //                         </ErrorMessage>
        //                     </div>
        //                     <div className={classes.CitizenCreateProposalFormInput}>
        //                         <label>Description</label>
        //                         <FormikInput 
        //                             type="text"
        //                             placeholder="Description"
        //                             id="description"
        //                             name="description"
        //                         />
        //                         <ErrorMessage name="name">
        //                             {
        //                                 errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
        //                             }
        //                         </ErrorMessage>
        //                     </div>
        //                     <div className={classes.CitizenCreateProposalFormInput}>
        //                         <label>When</label>
        //                         <FormikInput 
        //                             type="text"
        //                             placeholder="When"
        //                             id="date"
        //                             name="date"
        //                         />
        //                         <ErrorMessage name="date">
        //                             {
        //                                 errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
        //                             }
        //                         </ErrorMessage>
        //                     </div>
        //                     <div className={classes.CitizenCreateProposalFormInput}>
        //                         <label>Where</label>
        //                         <FormikInput 
        //                             type="text"
        //                             placeholder="Where"
        //                             id="location"
        //                             name="location"
        //                         />
        //                         <ErrorMessage name="location">
        //                             {
        //                                 errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
        //                             }
        //                         </ErrorMessage>
        //                     </div>
        //                 </div>
        //                 <div className={classes.ButtonDiv}>
        //                     <SubmitButton />
        //                     <CancelButton />
        //                 </div>
        //             </Form>
        //         </Formik>
        //     </div>
        // </React.Fragment>
        <React.Fragment>
            <Container className={classes.CitizenCreateProposalContentContainer}>
                {/* <div className = 'col-lg-10 offset-lg-1'> */}
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
                                <Row>
                                    <Col sm={6}>
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
                                            <ErrorMessage name="name">
                                                {
                                                    errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
                                                }
                                            </ErrorMessage>
                                        </Row>
                                    </Col>
                                    <Col className={classes.CitizenCreateProposalHeader} sm={6}>
                                            <h2>Pursue your calling </h2>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col className={classes.CitizenCreateProposalFormInput}>
                                        <label>When</label>
                                        <FormikInput 
                                        type="text"
                                        placeholder="When"
                                        id="date"
                                        name="date"
                                        />
                                        <ErrorMessage name="date">
                                            {
                                                errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
                                            }
                                        </ErrorMessage>
                                    </Col>
                                    <Col className={classes.CitizenCreateProposalFormInput}>
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
                                </Row>
                                <Row>
                                    <Col className={classes.CitizenCreateProposalFormInput} >
                                        <label>Photo</label>
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
    );

export default CitizenCreateProposal;
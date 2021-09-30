import React, { useEffect, useState, useContext } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router';
import { Row, Col, Container } from 'react-bootstrap';
import CardHeader from '../../../../components/UI/Cards/CardHeader/CardHeader';
import Input from '../../../../components/UI/Input/Input';
import FormikInput from '../../../../components/UI/Input/FormikInput/FormikInput';
import SubmitButton from '../../../../components/UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../../components/UI/Buttons/CancelButton/CancelButton';
import { Context } from '../../../../context/Context';


import classes from './CitizenCreateProposals.module.css';
import axios from 'axios';



const CitizenCreateProposal = () => {
    const citizenUser = useContext(Context);
    const [userId, setUserId] = useState();
    const history = useHistory();

    // console.log(citizenUser);

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
        userName: '',
        title: '',
        description: '',
        // createdAt: '',
        location: '',
        status:'Pending',
        upvote: [],
        // downvote: '',
    };
    
    
    const onSubmit = async (values) => {
        console.log('Form values', values);

        const userName = values.userName.replace('',userId)
        const newValues = {...values, userName}

        const {...data} = newValues;
        const res = await axios.post('/api/proposals', data)
            .catch(err => {
                console.log('Error: ', err.res.data);
            });
    };
    
    const validationSchema = Yup.object({
        userName: Yup.string(),
        title: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        // date: Yup.string().required('Required'),
        location: Yup.string().required("Required"),

    });

    return(
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
                                        {/* <Row className={classes.CitizenCreateProposalFormInput}>
                                            <FormikInput 
                                                type="text"
                                                placeholder="userName"
                                                id="userName"
                                                name="userName"
                                            />
                                        </Row> */}
                                    </Col>
                                    <Col className={classes.CitizenCreateProposalHeader} sm={6}>
                                            <h2>Pursue your calling </h2>
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
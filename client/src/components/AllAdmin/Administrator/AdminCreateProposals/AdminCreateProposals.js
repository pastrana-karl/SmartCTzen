import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import AdminLayout from '../AdminLayout/AdminLayout';
import Input from '../../../UI/Input/Input';
import FormikInput from '../../../UI/Input/FormikInput/FormikInput';
import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';

import classes from './AdminCreateProposals.module.css';


const initialValues = {
    title: '',
    description: '',
    date: '',
    location: ''
};

const onSubmit = async (values) => {
    console.log('Form values', values);

    // await fetch('/api/initiatives', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         values
    //     })
    // });
    const {...data} = values;

    console.log(data);
    const res = await axios.post('/api/initiatives', data)
        .catch(err => {
            console.log('Error: ', err.res.data);
        });
    
};

// const validate = values => {
//     let errors = {};

//     if (!values.title) errors.title = "Required";
//     if (!values.description) errors.description = "Required";
//     if (!values.date) errors.date = "Required";
//     if (!values.location) errors.location = "Required";

//     return errors;
// };

const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    date: Yup.string().required('Required'),
    location: Yup.string().required("Required")
});

const AdminCreateProposals = ( props ) => {  
    // const [inputProposalTitle, setInputProposalTitle] = useState();
    // const [inputProposalDescription, setInputProposalDescription] = useState();
    // const [inputProposalDate, setInputProposalDate] = useState();
    // const [inputProposalLocation, setInputProposalLocation] = useState();
    // const [inputProposalPhoto, serInputProposalPhoto] = useState();

    // const formik = useFormik({
    //     initialValues,
    //     onSubmit,
    //     validationSchema
    // });

    return (
        <React.Fragment>
            <AdminLayout>
                <div className={classes.AdminCreateProposalsHeader}>
                    <CardHeader>
                        <h2 className={classes.Text}>Proposals</h2>
                    </CardHeader>
                </div>
                <div className={classes.AdminCreateProposalsContentDiv}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form className={classes.AdminCreateProposalForm}>
                            <div className={classes.AdminCreateProposalFormDiv}>
                                <div className={classes.AdminCreateProposalsFormInput}>
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
                                </div>
                                <div className={classes.AdminCreateProposalsFormInput}>
                                    <label>Description</label>
                                    <FormikInput 
                                        type="text"
                                        placeholder="Description"
                                        id="description"
                                        name="description"
                                        // {...formik.getFieldProps('description')}
                                    />
                                    <ErrorMessage name="name">
                                        {
                                            errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
                                        }
                                    </ErrorMessage>
                                    {/* {formik.touched.description && formik.errors.description ? <div className={classes.InputValidation}>{formik.errors.description}</div> : null} */}
                                </div>
                                <div className={classes.AdminCreateProposalsFormInput}>
                                    <label>When</label>
                                    <FormikInput 
                                        type="text"
                                        placeholder="When"
                                        id="date"
                                        name="date"
                                        // {...formik.getFieldProps('date')}
                                    />
                                    <ErrorMessage name="date">
                                        {
                                            errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
                                        }
                                    </ErrorMessage>
                                    {/* {formik.touched.date && formik.errors.date ? <div className={classes.InputValidation}>{formik.errors.date}</div> : null} */}
                                </div>
                                <div className={classes.AdminCreateProposalsFormInput}>
                                    <label>Where</label>
                                    <FormikInput 
                                        type="text"
                                        placeholder="Where"
                                        id="location"
                                        name="location"
                                        // {...formik.getFieldProps('location')}
                                    />
                                    <ErrorMessage name="location">
                                        {
                                            errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
                                        }
                                    </ErrorMessage>
                                    {/* {formik.touched.location && formik.errors.location ? <div className={classes.InputValidation}>{formik.errors.location}</div> : null} */}
                                </div>
                            </div>
                            <div className={classes.ButtonDiv}>
                                <SubmitButton />
                                <CancelButton />
                            </div>
                        </Form>
                    </Formik>
                </div>
            </AdminLayout>
        </React.Fragment>
    );
};

export default AdminCreateProposals;
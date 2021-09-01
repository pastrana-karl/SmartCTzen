import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import AdminLayout from '../AdminLayout/AdminLayout';
import Input from '../../../UI/Input/Input';

import classes from './AdminCreateProposals.module.css';
import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';

const initialValues = {
    title: '',
    description: '',
    date: '',
    location: ''
};

const onSubmit = values => {
    console.log('Form values', values);
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

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    return (
        <React.Fragment>
            <AdminLayout>
                <div className={classes.AdminCreateProposalsHeader}>
                    <CardHeader>
                        <h2 className={classes.Text}>Proposals</h2>
                    </CardHeader>
                </div>
                <div className={classes.AdminCreateProposalsContentDiv}>
                        <form className={classes.AdminCreateProposalForm}>
                            <div className={classes.AdminCreateProposalFormDiv}>
                                <div className={classes.AdminCreateProposalsFormInput}>
                                    <label>Proposal Title</label>
                                    <Input 
                                        type="text"
                                        placeholder="Proposal Title"
                                        id="title"
                                        name="title"
                                        {...formik.getFieldProps('title')}
                                    />
                                    {formik.touched.title && formik.errors.title ? <div className={classes.InputValidation}>{formik.errors.title}</div> : null}
                                </div>
                                <div className={classes.AdminCreateProposalsFormInput}>
                                    <label>Description</label>
                                    <Input 
                                        type="text"
                                        placeholder="Description"
                                        id="description"
                                        name="description"
                                        {...formik.getFieldProps('description')}
                                    />
                                    {formik.touched.description && formik.errors.description ? <div className={classes.InputValidation}>{formik.errors.description}</div> : null}
                                </div>
                                <div className={classes.AdminCreateProposalsFormInput}>
                                    <label>When</label>
                                    <Input 
                                        type="text"
                                        placeholder="When"
                                        id="date"
                                        name="date"
                                        {...formik.getFieldProps('date')}
                                    />
                                    {formik.touched.date && formik.errors.date ? <div className={classes.InputValidation}>{formik.errors.date}</div> : null}
                                </div>
                                <div className={classes.AdminCreateProposalsFormInput}>
                                    <label>Where</label>
                                    <Input 
                                        type="text"
                                        placeholder="Where"
                                        id="location"
                                        name="location"
                                        {...formik.getFieldProps('location')}
                                    />
                                    {formik.touched.location && formik.errors.location ? <div className={classes.InputValidation}>{formik.errors.location}</div> : null}
                                </div>
                            </div>
                            <div className={classes.ButtonDiv}>
                                <SubmitButton />
                                <CancelButton />
                            </div>
                        </form>
                    </div>
            </AdminLayout>
        </React.Fragment>
    );
};

export default AdminCreateProposals;
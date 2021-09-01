import React, { useState } from 'react';
import { useFormik } from 'formik';

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

const validate = values => {
    let errors = {};

    if (!values.title) errors.title = "Required";
    if (!values.description) errors.description = "Required";
    if (!values.date) errors.date = "Required";
    if (!values.location) errors.location = "Required";

    return errors;
};

const AdminCreateProposals = ( props ) => {  
    const [inputProposalTitle, setInputProposalTitle] = useState();
    const [inputProposalDescription, setInputProposalDescription] = useState();
    const [inputProposalDate, setInputProposalDate] = useState();
    const [inputProposalLocation, setInputProposalLocation] = useState();
    const [inputProposalPhoto, serInputProposalPhoto] = useState();

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: onSubmit,
        validate: validate
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
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.title ? <div className={classes.InputValidation}>{formik.errors.title}</div> : null}
                                </div>
                                <div className={classes.AdminCreateProposalsFormInput}>
                                    <label>Description</label>
                                    <Input 
                                        type="text"
                                        placeholder="Description"
                                        id="description"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.description ? <div className={classes.InputValidation}>{formik.errors.description}</div> : null}
                                </div>
                                <div className={classes.AdminCreateProposalsFormInput}>
                                    <label>When</label>
                                    <Input 
                                        type="text"
                                        placeholder="When"
                                        id="date"
                                        name="date"
                                        value={formik.values.date}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.date ? <div className={classes.InputValidation}>{formik.errors.date}</div> : null}
                                </div>
                                <div className={classes.AdminCreateProposalsFormInput}>
                                    <label>Where</label>
                                    <Input 
                                        type="text"
                                        placeholder="Where"
                                        id="location"
                                        name="location"
                                        value={formik.values.location}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.location ? <div className={classes.InputValidation}>{formik.errors.location}</div> : null}
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
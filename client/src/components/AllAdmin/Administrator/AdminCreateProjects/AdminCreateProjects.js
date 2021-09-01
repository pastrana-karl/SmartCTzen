import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import AdminLayout from '../AdminLayout/AdminLayout';
import Input from '../../../UI/Input/Input';
import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';

import classes from './AdminCreateProjects.module.css';


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
//     let errors ={};

//     if (!values.title) errors.title = "Required";
//     if (!values.description) errors.description = "Required";
//     if (!values.date) errors.date = "Required";
//     if (!values.location) errors.location = "Required";

//     return errors;
// }

const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    date: Yup.string().required('Required'),
    location: Yup.string().required('Required')
});

const AdminCreateProjects = ( props ) => {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    return (
        <AdminLayout>
            <div className={classes.AdminCreateProjectsHeader}>
                <CardHeader>
                    <h2 className={classes.Text}>Projects</h2>
                </CardHeader>
            </div>
            <div className={classes.AdminCreateProjectsContentDiv}>
                <form className={classes.AdminCreateProjectsForm}>
                    <div className={classes.AdminCreateProjectsFormDiv}>
                        <div className={classes.AdminCreateProjectsFormInput}>
                            <label>Project Title</label>
                            <Input 
                                type="text"
                                placeholder="Project Title"
                                id="title"
                                name="title"
                                {...formik.getFieldProps('title')}
                            />
                            {formik.touched.title && formik.errors.title ? <div className={classes.InputValidation}>{formik.errors.title}</div> : null}
                        </div>
                        <div className={classes.AdminCreateProjectsFormInput}>
                            <label>Project Description</label>
                            <Input
                                type="text"
                                placeholder="Project Description"
                                id="description"
                                name="description"
                                {...formik.getFieldProps('description')}
                            />
                            {formik.touched.description && formik.errors.description ? <div className={classes.InputValidation}>{formik.errors.description}</div> : null}
                        </div>
                        <div className={classes.AdminCreateProjectsFormInput}>
                            <label>When</label>
                            <Input 
                                type="text"
                                placeholder="Date"
                                id="date"
                                name="date"
                                {...formik.getFieldProps('date')}
                            />
                            {formik.touched.date && formik.errors.date ? <div className={classes.InputValidation}>{formik.errors.date}</div> : null}
                        </div>
                        <div className={classes.AdminCreateProjectsFormInput}>
                            <label>Where</label>
                            <Input 
                                type="text"
                                placeholder="Location"
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
    );
};

export default AdminCreateProjects;
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import AdminLayout from '../AdminLayout/AdminLayout';
import Input from '../../../UI/Input/Input';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';

import classes from './AdminUpdateProject.module.css';

const initialValues = {
    title: '',
    description: '',
    location: ''
}


const validationSchema = Yup.object({
    title: Yup.string().required('Required!'),
    description: Yup.string().required('Required!'),
    location: Yup.string().required('Required!')
});

const AdminUpdateProject = () => {
    const [currentProject, setCurrentProject] = useState([]);
    const [formValues, setFormValues] = useState(null);

    const params = useParams();

    useEffect(() => {
        const findProject = async () => {
          const response = await fetch('/api/projects/' + params.id);
          const responseData = await response.json();
          //console.log(responseData);
          setCurrentProject(responseData.data.project);
        }
        findProject();
      }, []);

    const onSubmit = values => {
        console.log('Form values', values);
        axios.patch('/api/projects/' + params.id, values);
    }

    // const validationSchema = Yup.object({
    //     title: Yup.string().required('Required!'),
    //     description: Yup.string().required('Required!'),
    //     location: Yup.string().required('Required!')
    // });

    // const formik = useFormik({
    //     initialValues: {
    //         title: null,
    //         description: '',
    //         location: '',
    //     },
    //     onSubmit: values => {
    //         //const {...data} = values;

    //         console.log('Form data', values);
    //         // axios.patch('/api/projects/' + params.id, {

    //         // });
    //             // .catch(err => {
    //             //     console.log('Error: ', err);
    //             // });
    //     },
    //     validationSchema
    // });

    return (
        // <AdminLayout>
        //     <div className={classes.AdminProjects}>
        //         <CardHeader>
        //             <h2 className={classes.Text}>Projects</h2>
        //         </CardHeader>
        //     </div>
        //     <div className={classes.AdminUpdateProjectsContentDiv}>
        //         <form className={classes.AdminUpdateProjectsForm} onSubmit={formik.handleSubmit}>
        //             <div className={classes.AdminUpdateProjectsFormDiv}>
        //                 <div className={classes.AdminUpdateProjectsFormInput}>
        //                     <label>Project Title</label>
        //                     <Input
        //                         type='text'
        //                         id='title'
        //                         name='title'
        //                         placeholder='Project Title'
        //                         onChange={formik.handleChange}
        //                         onBlur={formik.handleBlur}
        //                         value={currentProject.title}
                                
        //                     />
        //                 </div>
        //                 <div className={classes.AdminUpdateProjectsFormInput}>
        //                     <label>Description</label>
        //                     <Input
        //                         type='text'
        //                         id='description'
        //                         name='description'
        //                         placeholder='Description'
        //                         onChange={formik.handleChange}
        //                         onBlur={formik.handleBlur}
        //                         value={currentProject.description}
                                
        //                     />
        //                 </div>
        //                 <div className={classes.AdminUpdateProjectsFormInput}>
        //                     <label>Location</label>
        //                     <Input
        //                         type='text'
        //                         id='location'
        //                         name='location'
        //                         placeholder='Location'
        //                         onChange={formik.handleChange}
        //                         onBlur={formik.handleBlur}
        //                         value={currentProject.location}
        //                     />
        //                 </div>
        //             </div>
        //             <div className={classes.ButtonDiv}>
        //                 <button className={classes.UpdateButton} type="submit">Update</button>
        //             </div>
        //         </form>
        //     </div>
        // </AdminLayout>

        <AdminLayout>
            <div className={classes.AdminProjects}>
                <CardHeader>
                    <h2 className={classes.Text}>Projects</h2>
                </CardHeader>
            </div>
            <div className={classes.AdminUpdateProjectsContentDiv}>
                <Formik
                    initialValues={formValues || initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize>
                    <Form className={classes.AdminUpdateProjectsForm}>
                        <div className={classes.AdminUpdateProjectsFormDiv}>
                            <div className={classes.AdminUpdateProjectsFormInput}>
                                <label>Project Title</label>
                                <Field
                                    className={classes.FormikInput}
                                    type='text'
                                    id='title'
                                    name='title'
                                    placeholder='Project Title'
                                />
                                <ErrorMessage name='title' />
                            </div>
                            <div className={classes.AdminUpdateProjectsFormInput}>
                                <label>Description</label>
                                <Field
                                    className={classes.FormikInput}
                                    type='text'
                                    id='description'
                                    name='description'
                                    placeholder='Description'
                                />
                                <ErrorMessage name='description' />
                            </div>
                            <div className={classes.AdminUpdateProjectsFormInput}>
                                <label>Location</label>
                                <Field
                                    className={classes.FormikInput}
                                    type='text'
                                    id='location'
                                    name='location'
                                    placeholder='Location'
                                />
                                <ErrorMessage name='location' />
                            </div>
                        </div>
                        <div className={classes.ButtonDiv}>
                            <button className={classes.UpdateButton} type="submit" >Update</button>
                            <button className={classes.LoadButton} type="button" onClick={() => {
                                console.log('Button');
                                setFormValues(currentProject);
                            }}>Load Data</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </AdminLayout>
    );
}

export default AdminUpdateProject;
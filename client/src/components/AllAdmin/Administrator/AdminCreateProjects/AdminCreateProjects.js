import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import AdminLayout from '../AdminLayout/AdminLayout';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';
import { Context } from '../../../../context/Context';

import classes from './AdminCreateProjects.module.css';

const AdminCreateProjects = () => {
    const { aUser } = useContext(Context);
    const { register, handleSubmit, errors } = useForm();
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] =  useState(true);

    const onSubmit = async (data) => {
        const coverImage = '';

        const createProject = {
            userName: data.userName,
            title: data.title,
            description: data.description,
            location: data.location,
            userType: aUser.data.user.userType,
            coverImage
        };

        setLoading(false);
        const formData = new FormData();
        const filename = Date.now() + data.coverImage[0].name;
        formData.append('name', filename);
        formData.append('file', data.coverImage[0]);
        formData.append("upload_preset", "SmartCTzen");
        formData.append("cloud_name", "smartct-media");

        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/smartct-media/image/upload", formData);
            createProject.coverImage = res.data.secure_url;

            try {
                const res = await axios.post('/api/projects', createProject);
                Swal.fire({
                    icon: 'success',
                    title: 'Project Created!',
                    text: 'Project is been posted . . .'
                });

                setLoading(true);
                setRedirect(true);
            } catch (err) {
                setLoading(true);
                console.log(err);
            }

        } catch (err) {
            setLoading(true);
            console.log (err);
        }

        // await axios.post('/api/proposals', formData);
        // console.log(data.coverImage[0].name);
    }

    return (
        <>
        { redirect && (<Redirect to = '/admin-projects' />) }
        {loading ? (
        <AdminLayout>
            <div className={classes.AdminCreateProjectsHeader}>
                <CardHeader>
                    <h2 className={classes.Text}>Projects</h2>
                </CardHeader>
            </div>
            <div className={classes.AdminCreateProjectsContentDiv}>
                <form className={classes.AdminCreateProjectsForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.AdminCreateProjectsFormDiv}>
                        <div className={classes.AdminCreateProjectsFormInput}>
                            <label>Username</label>
                            <input
                                className={classes.Input}
                                type='text'
                                id='userName'
                                name='userName'
                                placeholder='Username'
                                defaultValue={aUser.data.user.username}
                                readOnly
                                ref={register}
                            />
                            {errors.userName && <p className={classes.InputValidation}>{errors.userName.message}</p>}
                        </div>
                        <div className={classes.AdminCreateProjectsFormInput}>
                            <label>Project Title</label>
                            <input
                                className={classes.Input}
                                type='text'
                                id='title'
                                name='title'
                                placeholder='Project Title'
                                ref={register({ required: "Required!" })}
                            />
                            {errors.title && <p className={classes.InputValidation}>{errors.title.message}</p>}
                        </div>
                        <div className={classes.AdminCreateProjectsFormInput}>
                            <label>Description</label>
                            <textarea
                                className={classes.Textarea}
                                type='textfield'
                                id='description'
                                name='description'
                                placeholder='Description'
                                ref={register({ required: "Required!" })}
                            />
                            {errors.description && <p className={classes.InputValidation}>{errors.description.message}</p>}
                        </div>
                        <div className={classes.AdminCreateProjectsFormInput}>
                            <label>Location</label>
                            <input  
                                className={classes.Input}
                                type='text'
                                id='location'
                                name='location'
                                placeholder='Location'
                                ref={register({ required: "Required!" })}
                            />
                            {errors.location && <p className={classes.InputValidation}>{errors.location.message}</p>}
                        </div>
                        <div className={classes.AdminCreateProjectsFormInput}>
                            <label>Image</label>
                            <input
                                type='file'
                                id='coverImage'
                                name='coverImage'
                                placeholder='Insert Image'
                                ref={register({ required: "Required!" })}
                            />
                            {errors.coverImage && <p className={classes.InputValidation}>{errors.coverImage.message}</p>}
                        </div>
                    </div>
                    <div className={classes.ButtonDiv}>
                        <SubmitButton />
                        <CancelButton />
                    </div>
                </form>
                <div className={classes.QuoteDiv}>
                    <p className={classes.Quote}></p>
                </div>
            </div>
        </AdminLayout>
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
    )
}

export default AdminCreateProjects;

// const AdminCreateProjects = () => {
//     const { aUser } = useContext(Context);

//     const validationSchema = Yup.object({
//         userName: Yup.string().required('Required!'),
//         title: Yup.string().required('Required!'),
//         description: Yup.string().required('Required!'),
//         location: Yup.string().required('Required!')
//     });

//     const formik = useFormik({
//         initialValues: {
//             userName: '',
//             title: '',
//             description: '',
//             location: '',
//         },
//         onSubmit: values => {
//             //const {...data} = values;

//             console.log('Form data', values);
//             axios.post('/api/projects/', values);
//                 // .catch(err => {
//                 //     console.log('Error: ', err);
//                 // });
//         },
//         validationSchema
//     });

    
//     return (
//         <AdminLayout>
//             <div className={classes.AdminCreateProjectsHeader}>
//                 <CardHeader>
//                     <h2 className={classes.Text}>Projects</h2>
//                 </CardHeader>
//             </div>
//             <div className={classes.AdminCreateProjectsContentDiv}>
//                 <form className={classes.AdminCreateProjectsForm} onSubmit={formik.handleSubmit}>
//                     <div className={classes.AdminCreateProjectsFormDiv}>
//                         <div className={classes.AdminCreateProjectsFormInput}>
//                             <label>Username</label>
//                             <Input
//                                 type='text'
//                                 id='userName'
//                                 name='userName'
//                                 placeholder='User'
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.userName}
//                                 disable
//                             />
//                             { formik.touched.userName && formik.errors.userName ? (
//                                 <div className={classes.InputValidation}>{formik.errors.userName}</div>
//                                 ) : null }
//                         </div>
//                         <div className={classes.AdminCreateProjectsFormInput}>
//                             <label>Project Title</label>
//                             <Input
//                                 type='text'
//                                 id='title'
//                                 name='title'
//                                 placeholder='Project Title'
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.title}
//                             />
//                             { formik.touched.title && formik.errors.title ? (
//                                 <div className={classes.InputValidation}>{formik.errors.title}</div>
//                                 ) : null }
//                         </div>
//                         <div className={classes.AdminCreateProjectsFormInput}>
//                             <label>Description</label>
//                             <Input
//                                 type='text'
//                                 id='description'
//                                 name='description'
//                                 placeholder='Description'
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.description}
//                             />
//                             { formik.touched.description && formik.errors.description ? (
//                                 <div className={classes.InputValidation}>{formik.errors.description}</div>
//                                 ) : null }
//                         </div>
//                         <div className={classes.AdminCreateProjectsFormInput}>
//                             <label>Location</label>
//                             <Input
//                                 type='text'
//                                 id='location'
//                                 name='location'
//                                 placeholder='Location'
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.location}
//                             />
//                             { formik.touched.location && formik.errors.location ? (
//                                 <div className={classes.InputValidation}>{formik.errors.location}</div>
//                                 ) : null }
//                         </div>
//                     </div>
//                     <div className={classes.ButtonDiv}>
//                         <SubmitButton />
//                         <CancelButton />
//                     </div>
//                 </form>
//             </div>
//         </AdminLayout>
//     );
// };

// export default AdminCreateProjects;

// import React from 'react';
// import { Formik, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
// import AdminLayout from '../AdminLayout/AdminLayout';
// import Input from '../../../UI/Input/Input';
// import FormikInput from '../../../UI/Input/FormikInput/FormikInput';
// import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
// import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';

// import classes from './AdminCreateProjects.module.css';
// import axios from 'axios';


// const initialValues = {
//     title: '',
//     description: '',
//     date: '',
//     location: ''
// };

// const onSubmit = async (values) => {
//     console.log('Form values', values);

//     const {...data} = values;
//     const res = await axios.post('/api/projects', data)
//         .catch(err => {
//             console.log('Error: ', err.res.data);
//         });
// };

// // const validate = values => {
// //     let errors ={};

// //     if (!values.title) errors.title = "Required";
// //     if (!values.description) errors.description = "Required";
// //     if (!values.date) errors.date = "Required";
// //     if (!values.location) errors.location = "Required";

// //     return errors;
// // }

// const validationSchema = Yup.object({
//     title: Yup.string().required('Required'),
//     description: Yup.string().required('Required'),
//     date: Yup.string().required('Required'),
//     location: Yup.string().required('Required')
// });

// const AdminCreateProjects = ( props ) => {
//     // const formik = useFormik({
//     //     initialValues,
//     //     onSubmit,
//     //     validationSchema
//     // });

//     return (
//         <AdminLayout>
//             <div className={classes.AdminCreateProjectsHeader}>
//                 <CardHeader>
//                     <h2 className={classes.Text}>Projects</h2>
//                 </CardHeader>
//             </div>
//             <div className={classes.AdminCreateProjectsContentDiv}>
//                 <Formik
//                     initialValues={initialValues}
//                     validationSchema={validationSchema}
//                     onSubmit={onSubmit}
//                 >
//                     <Form className={classes.AdminCreateProjectsForm}>
//                         <div className={classes.AdminCreateProjectsFormDiv}>
//                             <div className={classes.AdminCreateProjectsFormInput}>
//                                 <label>Project Title</label>
//                                 <FormikInput 
//                                     type="text"
//                                     placeholder="Project Title"
//                                     id="title"
//                                     name="title"
//                                 />
//                                 <ErrorMessage name="title">
//                                     {
//                                         errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
//                                     }
//                                 </ErrorMessage>
//                             </div>
//                             <div className={classes.AdminCreateProjectsFormInput}>
//                                 <label>Project Description</label>
//                                 <FormikInput
//                                     type="text"
//                                     placeholder="Project Description"
//                                     id="description"
//                                     name="description"
//                                 />
//                                 <ErrorMessage name="description">
//                                     {
//                                         errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
//                                     }
//                                 </ErrorMessage>
//                             </div>
//                             <div className={classes.AdminCreateProjectsFormInput}>
//                                 <label>When</label>
//                                 <FormikInput 
//                                     type="text"
//                                     placeholder="Date"
//                                     id="date"
//                                     name="date"
//                                 />
//                                 <ErrorMessage name="date">
//                                     {
//                                         errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
//                                     }
//                                 </ErrorMessage>
//                             </div>
//                             <div className={classes.AdminCreateProjectsFormInput}>
//                                 <label>Where</label>
//                                 <FormikInput 
//                                     type="text"
//                                     placeholder="Location"
//                                     id="location"
//                                     name="location"
//                                 />
//                                 <ErrorMessage name="location">
//                                     {
//                                         errorMsg => <div className={classes.InputValidation}>{errorMsg}</div>
//                                     }
//                                 </ErrorMessage>
//                             </div>
//                         </div>
//                         <div className={classes.ButtonDiv}>
//                             <SubmitButton />
//                             <CancelButton />
//                         </div>
//                     </Form>
//                 </Formik>
//             </div>
            
//         </AdminLayout>
//     );
// };

// export default AdminCreateProjects;
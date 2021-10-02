import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import axios from 'axios';

import AdminLayout from '../AdminLayout/AdminLayout';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import Input from '../../../UI/Input/Input';
import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';
import { Context } from '../../../../context/Context';

import classes from './AdminCreateProjects.module.css';

const AdminCreateProjects = () => {
    const { aUser } = useContext(Context);
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const coverImage = '';

        const createProject = {
            userName: data.userName,
            title: data.title,
            description: data.description,
            location: data.location,
            coverImage
        };

        const formData = new FormData();
        const filename = Date.now() + data.coverImage[0].name;
        formData.append('name', filename);
        formData.append('file', data.coverImage[0]);
        formData.append("upload_preset", "dev_prac");
        formData.append("cloud_name", "karlstorage");

        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/karlstorage/image/upload", formData);
            createProject.coverImage = res.data.secure_url;

            try {
                const res = await axios.post('/api/projects', createProject);
                Swal.fire({
                    icon: 'success',
                    title: 'Updated',
                    text: 'Proposal submitted'
                });
            } catch (err) {
                console.log(err);
            }

        } catch (err) {
            console.log (err);
        }

        // await axios.post('/api/proposals', formData);
        // console.log(data.coverImage[0].name);
    }

    return (
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
                                ref={register}
                            />
                        </div>
                        <div className={classes.AdminCreateProjectsFormInput}>
                            <label>Project Title</label>
                            <input
                                className={classes.Input}
                                type='text'
                                id='title'
                                name='title'
                                placeholder='Proposal Title'
                                ref={register}
                            />
                        </div>
                        <div className={classes.AdminCreateProjectsFormInput}>
                            <label>Description</label>
                            <input
                                className={classes.Input}
                                type='text'
                                id='description'
                                name='description'
                                placeholder='Description'
                                ref={register}
                            />
                        </div>
                        <div className={classes.AdminCreateProjectsFormInput}>
                            <label>Location</label>
                            <input  
                                className={classes.Input}
                                type='text'
                                id='location'
                                name='location'
                                placeholder='Location'
                                ref={register}
                            />
                        </div>
                        <div className={classes.AdminCreateProjectsFormInput}>
                            <label>Image</label>
                            <input
                                type='file'
                                id='coverImage'
                                name='coverImage'
                                placeholder='Insert Image'
                                ref={register}
                            />
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
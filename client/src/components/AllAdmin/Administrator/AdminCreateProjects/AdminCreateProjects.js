import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import AdminLayout from '../AdminLayout/AdminLayout';
import Input from '../../../UI/Input/Input';
import FormikInput from '../../../UI/Input/FormikInput/FormikInput';
import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';

import classes from './AdminCreateProjects.module.css';
import axios from 'axios';


const initialValues = {
    title: '',
    description: '',
    date: '',
    location: ''
};

const onSubmit = async (values) => {
    console.log('Form values', values);

    const {...data} = values;
    const res = await axios.post('/api/projects', data)
        .catch(err => {
            console.log('Error: ', err.res.data);
        });
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
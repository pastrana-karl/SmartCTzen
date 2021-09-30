import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Context } from '../../../../context/Context';

import AdminLayout from '../AdminLayout/AdminLayout';
import AdminProfileButton from '../../../UI/Buttons/AdminProfileButton/AdminProfileButton';
import ProfileIconCard from '../../../UI/Cards/ProfileIconCard/ProfileIconCard';
import ProfileInput from '../../../UI/Input/ProfileInput/ProfileInput';
import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';
import { Link } from 'react-router-dom';

import classes from './AdminProfile.module.css';
import { propTypes } from 'react-bootstrap/esm/Image';
import TextError from '../../../UI/Text/TextError';
import axios from 'axios';

// const initialValues = {
//     email: '',
//     password: ''
// }

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required!'),
    password: Yup.string().required('Required!')
});

const AdminProfile = () => {
    const { aUser } = useContext(Context);

    const onSubmit = values => {
        if (values.email !== aUser.user.email) {
            return false;
        }

        console.log('Form data', values);
    };

    const initialValues = {
        email: '',
        password: ''
    }

    // const formik = useFormik({
    //     initialValues,
    //     onSubmit: values => {
    //         console.log('Form values', values)
    //     }
    // });

    // console.log(aUser.user);

    const uploadPhotoHandler = (e) => {
        e.preventDefault();
        
    }

    return (
        // <React.Fragment>
        //     <AdminLayout>
        //         <div className={classes.Content}>
        //             <div className={classes.AdminProfile}>
        //                 <ProfileIconCard />
        //                 <h2>Summary</h2>
        //                 <div className={classes.ButtonDiv}>
        //                     <Link to = "/admin-summary/reports">
        //                         <AdminProfileButton>Reports</AdminProfileButton>
        //                     </Link>
        //                     <Link to = '/admin-summary/proposals'>
        //                         <AdminProfileButton>Proposals</AdminProfileButton>
        //                     </Link>
        //                 </div>
        //             </div>
        //             <div>
        //                 <h2>Personal Information</h2>
        //                 <div>
        //                     <form className={classes.AdminProfileFormDiv}>
        //                         <div>
        //                             <div className={classes.InputDiv}>
        //                                 <label htmlFor="city_municipality">City/Municipality</label>
        //                                 <ProfileInput
        //                                     placeholder="City/Municipality"
        //                                     type="text"
        //                                     id="city_municipality"
        //                                     name="city_municipality"
        //                                     readOnly="readOnly"
        //                                     onChange={formik.handleChange}
        //                                     value={aUser.user.city}
        //                                 />
        //                             </div>
        //                             <div className={classes.InputDiv}>
        //                                 <label htmlFor="region">Region</label>
        //                                 <ProfileInput
        //                                     placeholder="Region"
        //                                     type="text"
        //                                     id="region"
        //                                     name="region"
        //                                     readOnly="readOnly"
        //                                     onChange={formik.handleChange}
        //                                     value={aUser.user.region}
        //                                 />
        //                             </div>
        //                         </div>
        //                     </form>
        //                 </div>

        //                 {/* LOGIN CREDENTIALS */}

        //                 <h2>Login Credentials</h2>
        //                 <div>
        //                     <form onSubmit={formik.handleSubmit}>
        //                         <div className={classes.AdminProfileFormDiv}>
        //                             <div className={classes.InputDiv}>
        //                                 <label>Email Address</label>
        //                                 <ProfileInput
        //                                     placeholder="Email address"
        //                                     type="email"
        //                                     id="email"
        //                                     name="email"
        //                                     onChange={formik.handleChange}
        //                                     value={aUser.user.email}
        //                                 />
        //                             </div>
        //                             <div className={classes.InputDiv}>
        //                                 <label>Password</label>
        //                                 <ProfileInput
        //                                     placeholder="Password"
        //                                     type="password"
        //                                     id="password"
        //                                     name="password"
        //                                     onChange={formik.handleChange}
        //                                     value={aUser.user.password}
        //                                 />
        //                             </div>
        //                         </div>
        //                         <div className={classes.ButtonDiv}>
        //                             <SubmitButton />
        //                             <CancelButton />
        //                         </div>
        //                     </form>
        //                 </div>
        //             </div>
        //         </div>
        //     </AdminLayout>
        // </React.Fragment>

        
            <AdminLayout>
                <div className={classes.Content}>
                    <div className={classes.AdminProfile}>
                        <ProfileIconCard />
                        <h2>Summary</h2>
                        <div className={classes.ButtonDiv}>
                            <Link to = "/admin-summary/reports">
                                <AdminProfileButton>Reports</AdminProfileButton>
                            </Link>
                            <Link to = '/admin-summary/proposals'>
                                <AdminProfileButton>Proposals</AdminProfileButton>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h2>Personal Information</h2>
                        <div>
                            <div className={classes.AdminProfileFormDiv}>
                                <div>
                                    <div className={classes.InputDiv}>
                                        <label htmlFor="city_municipality">City/Municipality</label>
                                        <div className={classes.PseudoInput}>
                                            {aUser.user.city}
                                        </div>
                                    </div>
                                    <div className={classes.InputDiv}>
                                        <label htmlFor="region">Region</label>
                                        <div className={classes.PseudoInput}>
                                            {aUser.user.region}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* LOGIN CREDENTIALS */}

                        <h6>Fill this up to change password</h6>
                        <div>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}>
                                <Form>
                                    <div className={classes.AdminProfileFormDiv}>
                                        <div className={classes.InputDiv}>
                                            <label>Email Address</label>
                                            <Field
                                                className={classes.FormikInput}
                                                placeholder="Email address"
                                                type="email"
                                                id="email"
                                                name="email"
                                            />
                                            <ErrorMessage name='email' component={TextError} />
                                        </div>
                                        <div className={classes.InputDiv}>
                                            <label>Password</label>
                                            <Field
                                                className={classes.FormikInput}
                                                placeholder="Password"
                                                type="password"
                                                id="password"
                                                name="password"
                                            />
                                            <ErrorMessage name='password' component={TextError} />
                                        </div>
                                    </div>
                                    <div className={classes.ButtonDiv}>
                                        <SubmitButton />
                                        <CancelButton />
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        
    );
}

export default AdminProfile;
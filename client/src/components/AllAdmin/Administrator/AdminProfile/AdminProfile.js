import React, { useState } from 'react';
import { useFormik } from 'formik';

import AdminLayout from '../AdminLayout/AdminLayout';
import AdminProfileButton from '../../../UI/Buttons/AdminProfileButton/AdminProfileButton';
import ProfileIconCard from '../../../UI/Cards/ProfileIconCard/ProfileIconCard';
import ProfileInput from '../../../UI/Input/ProfileInput/ProfileInput';
import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';

import classes from './AdminProfile.module.css';

const initialValues = {
    city_municipality: '',
    region: '',
    email: '',
    password: ''
}

const onSubmit = values => {
    console.log('Form data', values)
};

const AdminProfile = () => {
    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            console.log('Form values', values)
        }
    });


    return (
        <React.Fragment>
            <AdminLayout>
                <div className={classes.Content}>
                    <div className={classes.AdminProfile}>
                        <ProfileIconCard />
                        <h2>Summary</h2>
                        <div className={classes.ButtonDiv}>
                            <a href="/admin-summary/reports">
                                <AdminProfileButton>Reports</AdminProfileButton>
                            </a>
                            <AdminProfileButton>Proposals</AdminProfileButton>
                        </div>
                    </div>
                    <div>
                        <h2>Personal Information</h2>
                        <div>
                            <form className={classes.AdminProfileFormDiv}>
                                <div>
                                    <div className={classes.InputDiv}>
                                        <label htmlFor="city_municipality">City/Municipality</label>
                                        <ProfileInput
                                            placeholder="City/Municipality"
                                            type="text"
                                            id="city_municipality"
                                            name="city_municipality"
                                            readOnly="readOnly"
                                            onChange={formik.handleChange}
                                            value={formik.values.city_municipality}
                                        />
                                    </div>
                                    <div className={classes.InputDiv}>
                                        <label htmlFor="region">Region</label>
                                        <ProfileInput
                                            placeholder="Region"
                                            type="text"
                                            id="region"
                                            name="region"
                                            readOnly="readOnly"
                                            onChange={formik.handleChange}
                                            value={formik.values.region}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* LOGIN CREDENTIALS */}

                        <h2>Login Credentials</h2>
                        <div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className={classes.AdminProfileFormDiv}>
                                    <div className={classes.InputDiv}>
                                        <label>Email Address</label>
                                        <ProfileInput
                                            placeholder="Email address"
                                            type="email"
                                            id="email"
                                            name="email"
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                        />
                                    </div>
                                    <div className={classes.InputDiv}>
                                        <label>Password</label>
                                        <ProfileInput
                                            placeholder="Password"
                                            type="password"
                                            id="password"
                                            name="password"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                        />
                                    </div>
                                </div>
                                <div className={classes.ButtonDiv}>
                                    <SubmitButton />
                                    <CancelButton />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </React.Fragment>
    );
}

export default AdminProfile;
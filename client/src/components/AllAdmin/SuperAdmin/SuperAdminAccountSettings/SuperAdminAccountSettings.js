import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import SuperAdminContainer from '../../../UI/SuperAdminContainer/SuperAdminContainer';
import SuperAdminLayout from '../SuperAdminLayout';
import Input from '../../../UI/Input/Input';

import classes from './SuperAdminAccountSettings.module.css';
import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';

const initialValues = {
    email_address: '',
    password: ''
};

const onSubmit = ( values ) => {
    console.log("Form values", values);
};

const validationSchema = Yup.object({
    email_address: Yup.string().email("Invalid format").required("Required"),
    password: Yup.string().required("Required")
});

const SuperAdminAccountSettings = ( props ) => {
    const [inputEmail, setInputEmail] = useState();

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    return (
        <React.Fragment>
            <SuperAdminLayout>
                <CardHeader>
                    <h2 className={classes.Text}>Account Settings</h2>
                </CardHeader>
                <SuperAdminContainer>
                    <form className={classes.SuperAdminForm}>
                        <div className={classes.SuperAdminContainerDiv}>
                            <label>Email address</label>
                            <Input
                                type="email"
                                placeholder="Email address"
                                id="email_address"
                                name="email_address"
                                { ...formik.getFieldProps('email_address') }
                            />
                            { formik.touched.email_address && formik.errors.email_address ? 
                                <div className={classes.InputValidation}>{formik.errors.email_address}</div> : null }
                        </div>

                        <div className={classes.SuperAdminContainerDiv}>
                            <label>Password</label>
                            <Input 
                                type="password"
                                placeholder="Password"
                                id="password"
                                name="password"
                                { ...formik.getFieldProps('password') }
                            />
                            { formik.touched.password && formik.errors.password ? 
                                <div className={classes.InputValidation}>{formik.errors.password}</div> : null }
                        </div>

                        <div className={classes.SuperAdminButtonDiv}>
                            <SubmitButton />
                            <CancelButton />
                        </div>
                        
                    </form>
                </SuperAdminContainer>
            </SuperAdminLayout>
        </React.Fragment>
    );
};

export default SuperAdminAccountSettings;
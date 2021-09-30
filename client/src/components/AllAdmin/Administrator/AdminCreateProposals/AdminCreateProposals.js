import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import AdminLayout from '../AdminLayout/AdminLayout';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import Input from '../../../UI/Input/Input';
import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';
import { Context } from '../../../../context/Context';

import classes from './AdminCreateProposals.module.css';


const AdminCreateProposals = () => {
    const { aUser } = useContext(Context);

    const validationSchema = Yup.object({
        userName: Yup.string().required('Required!'),
        title: Yup.string().required('Required!'),
        description: Yup.string().required('Required!'),
        location: Yup.string().required('Required!')
    });

    const formik = useFormik({
        initialValues: {
            userName: aUser.user.username,
            title: '',
            description: '',
            location: '',
        },
        onSubmit: values => {
            //const {...data} = values;

            console.log('Form data', values);
            axios.post('/api/proposals/', values);
        },
        validationSchema
    });

    const message = '“When we succeed, we succeed because of our individual initiative, but also because we do things together.” -Barack Obama';

    //console.log(aUser.user.username);
    //console.log('Form values', formik.values); 

    return(
        <AdminLayout>
            <div className={classes.AdminCreateProposalsHeader}>
                <CardHeader>
                    <h2 className={classes.Text}>Proposals</h2>
                </CardHeader>
            </div>
            <div className={classes.AdminCreateProposalsContentDiv}>
                <form className={classes.AdminCreateProposalForm} onSubmit={formik.handleSubmit}>
                    <div className={classes.AdminCreateProposalFormDiv}>
                        <div className={classes.AdminCreateProposalsFormInput}>
                            <label>Username</label>
                            <Input
                                type='text'
                                id='userName'
                                name='userName'
                                placeholder='User'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.userName}
                                disable
                            />
                            { formik.touched.userName && formik.errors.userName ? (
                                <div className={classes.InputValidation}>{formik.errors.userName}</div>
                                ) : null }
                        </div>
                        <div className={classes.AdminCreateProposalsFormInput}>
                            <label>Proposal Title</label>
                            <Input
                                type='text'
                                id='title'
                                name='title'
                                placeholder='Proposal Title'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title}
                            />
                            { formik.touched.title && formik.errors.title ? (
                                <div className={classes.InputValidation}>{formik.errors.title}</div>
                                ) : null}
                        </div>
                        <div className={classes.AdminCreateProposalsFormInput}>
                            <label>Description</label>
                            <Input
                                type='text'
                                id='description'
                                name='description'
                                placeholder='Description'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                            />
                            { formik.touched.description && formik.errors.description ? (
                                <div className={classes.InputValidation}>{formik.errors.description}</div>
                                ) : null}
                        </div>
                        <div className={classes.AdminCreateProposalsFormInput}>
                            <label>Location</label>
                            <Input
                                type='text'
                                id='location'
                                name='location'
                                placeholder='Location'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.location}
                            />
                            { formik.touched.location && formik.errors.location ? (
                                <div className={classes.InputValidation}>{formik.errors.location}</div>
                                ) : null}
                        </div>
                    </div>
                    <div className={classes.ButtonDiv}>
                        <SubmitButton />
                        <CancelButton />
                    </div>
                </form>
                <div className={classes.QuoteDiv}>
                    <p className={classes.Quote}>{message}</p>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminCreateProposals;

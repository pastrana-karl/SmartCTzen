import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import SuperAdminLayout from '../SuperAdminLayout';
import SuperAdminContentNavBar from './SuperAdminContentNavBar/SuperAdminContentNavBar';
import SuperAdminContentNavItems from './SuperAdminContentNavItems/SuperAdminContentNavItems';
import Input from '../../../UI/Input/Input';

import classes from './SuperAdminContent.module.css'
import SuperAdminContainer from '../../../UI/SuperAdminContainer/SuperAdminContainer';
import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';

const initialValues = {
    header: '',
    partner_communities: '',
    users: '',
    members: ''
};

const onSubmit = values => {
    console.log('Form values', values)
};

const validationSchema = Yup.object({
    header: Yup.string().required('Required'),
    partner_communities: Yup.number().required('Required'),
    users: Yup.number().required('Required'),
    members: Yup.number().required('Required')
});

const SuperAdminContent = ( props ) => {

    // const [inputHeader, setInputHeader] = useState();
    // const [inputPartnerCommunities, setInputPartnerCommunities] = useState();
    // const [inputUsers, setInputUsers] = useState();
    // const [inputMembers, setInputMembers] = useState();
    // const [inputMessage, setInputMessages] = useState();

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    return (
        <React.Fragment>
            <SuperAdminLayout>
                <SuperAdminContentNavBar>
                    <SuperAdminContentNavItems />
                </SuperAdminContentNavBar>
                <SuperAdminContainer>
                    <form className={classes.SuperAdminForm}>
                        <div className={classes.SuperAdminContainerDiv}>
                            <label>Header</label>
                            <Input 
                                type="text"
                                placeholder="Header"
                                id="header"
                                name="header"
                                { ...formik.getFieldProps('header') }
                            />
                            { formik.touched.header && formik.errors.header ? 
                                <div className={classes.InputValidation}>{formik.errors.header}</div> : null }
                        </div>
                        <div className={classes.SuperAdminContainerDiv}>
                            <label>Parter Communities</label>
                            <Input 
                                type="number"
                                placeholder="Partner communities"
                                id="partner_communities"
                                name="partner_communities"
                                {...formik.getFieldProps('partner_communities')}
                            />
                            { formik.touched.partner_communities && formik.errors.partner_communities ? 
                                <div className={classes.InputValidation}>{formik.errors.partner_communities}</div> : null }
                        </div>
                        <div className={classes.SuperAdminContainerDiv}>
                            <label>Users</label>
                            <Input 
                                type="number"
                                placeholder="Users"
                                id="users"
                                name="users"
                                { ...formik.getFieldProps('users')}
                            />
                            { formik.touched.users && formik.errors.users ? 
                                <div className={classes.InputValidation}>{formik.errors.users}</div> : null }
                        </div>
                        <div className={classes.SuperAdminContainerDiv}>
                            <label>Members</label>
                            <Input 
                                type="number"
                                placeholder="Members"
                                id="members"
                                name="members"
                                { ...formik.getFieldProps('members')}
                            />
                            { formik.touched.members && formik.errors.members ? 
                                <div className={classes.InputValidation}>{formik.errors.members}</div> : null}
                        </div>
                        <div className={classes.SuperAdminContainerDiv}>
                            <label>Message</label>
                            <textarea
                                className={classes.SuperAdminTextArea}
                                placeholder="Input CEO Message"
                                id="Enter CEO message"
                            />
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

export default SuperAdminContent;
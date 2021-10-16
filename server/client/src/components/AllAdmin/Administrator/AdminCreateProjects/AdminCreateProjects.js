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
                await axios.post('/api/projects', createProject);
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
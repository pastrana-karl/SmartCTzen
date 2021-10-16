import React, { useContext, useState } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../AdminLayout/AdminLayout';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';
import { Context } from '../../../../context/Context';
import classes from './AdminCreateProposals.module.css';
import Swal from 'sweetalert2';

const AdminCreateProposals = () => {
    const { aUser } = useContext(Context);
    const { register, handleSubmit, errors } = useForm();
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] =  useState(true);

    const onSubmit = async (data) => {
        const coverImage = '';

        const createProposal = {
            userName: data.userName,
            title: data.title,
            description: data.description,
            location: data.location,
            userType: aUser.data.user.userType,
            coverImage,
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
            createProposal.coverImage = res.data.secure_url;

            try {
                await axios.post('/api/proposals/', createProposal);
                Swal.fire({
                    icon: 'success',
                    title: 'Proposal Created!',
                    text: 'Your proposal is been posted . . .'
                });

                setLoading(true);
                setRedirect(true);
            } catch (err) {
                console.log(err);
                setLoading(true);
            }

        } catch (err) {
            console.log (err);
            setLoading(true);
        }
    }

    return (
        <>
        { redirect && (<Redirect to = '/admin-proposals' />) }
        {loading ? (
        <AdminLayout>
            <div className={classes.AdminCreateProposalsHeader}>
                <CardHeader>
                    <h2 className={classes.Text}>Proposals</h2>
                </CardHeader>
            </div>
            <div className={classes.AdminCreateProposalsContentDiv}>
                <form className={classes.AdminCreateProposalForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.AdminCreateProposalFormDiv}>
                        <div className={classes.AdminCreateProposalsFormInput}>
                            <label>Username</label>
                            <input
                                className={classes.Input}
                                type='text'
                                id='userName'
                                name='userName'
                                placeholder='Username'
                                defaultValue={aUser.data.user.username}
                                ref={register}
                                readOnly
                            />
                        </div>
                        <div className={classes.AdminCreateProposalsFormInput}>
                            <label>Proposal Title</label>
                            <input
                                className={classes.Input}
                                type='text'
                                id='title'
                                name='title'
                                placeholder='Proposal Title'
                                ref={register({ required: "Required!" })}
                            />
                            {errors.title && <p className={classes.InputValidation}>{errors.title.message}</p>}
                        </div>
                        <div className={classes.AdminCreateProposalsFormInput}>
                            <label>Description</label>
                            <textarea
                                className={classes.Textarea}
                                type='text'
                                id='description'
                                name='description'
                                placeholder='Description'
                                ref={register({ required: "Required!" })}
                            />
                            {errors.description && <p className={classes.InputValidation}>{errors.description.message}</p>}
                        </div>
                        <div className={classes.AdminCreateProposalsFormInput}>
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
                        <div className={classes.AdminCreateProposalsFormInput}>
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
    );
}

export default AdminCreateProposals;

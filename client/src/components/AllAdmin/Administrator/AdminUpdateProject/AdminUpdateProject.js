import React, { useState, useContext, useEffect } from "react";
import * as ReactBootStrap from 'react-bootstrap';
import { Redirect, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from "sweetalert2";
import AdminLayout from '../AdminLayout/AdminLayout';
import CardHeader from '../../../UI/Cards/CardHeader/CardHeader';
import { Context } from '../../../../context/Context';
import classes from './AdminUpdateProject.module.css';


const AdminUpdateProject = () => {
    const { aUser } = useContext(Context);
    const [currentProject, setCurrentProject] = useState([]);
    const params = useParams();
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] =  useState(true);

    useEffect(() => {
        const findProject = async () => {
          const response = await fetch('/api/projects/' + params.id);
          const responseData = await response.json();
          setCurrentProject(responseData.data.project);
        }
        findProject();
    }, [params.id]);

    const defaultValues = {
        title: currentProject.title,
        description: currentProject.description,
        location: currentProject.location,
        coverImage: currentProject.coverImage
    }

    const { register, handleSubmit, errors, reset } = useForm({ defaultValues });

      const onSubmit = async (data) => {
        const coverImage = '';

        const updateProject = {
            // userId: aUser.data.user.userId,
            userName: aUser.data.user.username,
            userType: aUser.data.user.userType,
            title: data.title,
            description: data.description,
            location: data.location,
            status: currentProject.status,
            coverImage
        };

        setLoading(false);
        const formData = new FormData();
        const filename = Date.now() + data.coverImage[0].name;
        formData.append('name', filename);
        formData.append('file', data.coverImage[0]);
        formData.append("upload_preset", "dev_prac");
        formData.append("cloud_name", "karlstorage");

        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/karlstorage/image/upload", formData);
            updateProject.coverImage = res.data.secure_url;

            try {
                await axios.put(`/api/projects/update-projects/${params.id}`, updateProject);
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Project updated . . .'
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
        { redirect && (<Redirect to = '/admin-projects' />) }
        {loading ? (
        <AdminLayout>
            <div className={classes.AdminProjects}>
                <CardHeader>
                    <h2 className={classes.Text}>Projects</h2>
                </CardHeader>
            </div>
            <div className={classes.AdminUpdateProjectsContentDiv}>
                <form className={classes.AdminUpdateProjectsForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.AdminUpdateProjectsFormDiv}>
                        <div className={classes.AdminUpdateProjectsFormInput}>
                            <label>Project Title</label>
                            <input
                                className={classes.Input}
                                type='text'
                                id='title'
                                name='title'
                                placeholder='Project Title'
                                defaultValue={defaultValues.title}
                                readOnly
                            />
                            {errors.title && <p className={classes.InputValidation}>{errors.title.message}</p>}
                        </div>
                        <div className={classes.AdminUpdateProjectsFormInput}>
                            <label>Description</label>
                            <textarea
                                className={classes.Textarea}
                                type='textfield'
                                id='description'
                                name='description'
                                placeholder='Description'
                                defaultValue={defaultValues.description}
                                ref={register({ required: "Required!" })}
                            />
                            {errors.description && <p className={classes.InputValidation}>{errors.description.message}</p>}
                        </div>
                        <div className={classes.AdminUpdateProjectsFormInput}>
                            <label>Location</label>
                            <input
                                className={classes.Input}
                                type='text'
                                id='location'
                                name='location'
                                placeholder='Location'
                                defaultValue={defaultValues.location}
                                readOnly
                            />
                            {errors.location && <p className={classes.InputValidation}>{errors.location.message}</p>}
                        </div>
                        <div className={classes.AdminUpdateProjectsFormInput}>
                            <label>Cover Image</label>
                            <input
                                type='file'
                                id='coverImage'
                                name='coverImage'
                                placeholder='Insert Image'
                                files={defaultValues.coverImage}
                                ref={register({ required: "Required!" })}
                            />
                            {errors.coverImage && <p className={classes.InputValidation}>{errors.coverImage.message}</p>}
                        </div>
                    </div>
                    <div className={classes.ButtonDiv}>
                        <button className={classes.UpdateButton} type="submit" >Update</button>
                        <button className={classes.LoadButton} type="button" onClick={() => {
                            console.log('Button');
                            reset({ defaultValues })
                        }}>Reset Data</button>
                    </div>
                </form>
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

export default AdminUpdateProject;

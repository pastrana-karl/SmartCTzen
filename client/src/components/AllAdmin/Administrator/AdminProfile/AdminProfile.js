import React, { useState, useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { Row, Col, Form, Container, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

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


const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required!'),
    password: Yup.string().required('Required!')
});

const AdminProfile = () => {
    const { aUser, dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
    const [profilePic, setProfilePic] = useState("");
    const [iconUpload, setIconUpload] = useState(false);
    const [logs, setLogs] = useState([]);

    // const onSubmit = values => {
    //     if (values.email !== aUser.user.email) {
    //         return false;
    //     }

    //     console.log('Form data', values);
    // };

    useEffect(() => {
        const fetchLogs = async () => {
            const res = await axios.get(`/api/history/administrator/?userType=Administrator`);
            setLogs(res.data);
        }

        fetchLogs();
    }, [])

    const initialValues = {
        email: '',
        password: ''
    }

    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            if (values.email !== aUser.data.user.email) {
                console.log("Incorrect email")
                return false;
            }
    
            console.log('Form data', values)
            axios.patch('/api/admin/' + aUser.data.user._id, values);
        }
    });

    const showLogs = async () => {
        Swal.fire({
            icon: 'info',
            title: 'Activity Logs',
            html: `${
                logs.map((L) => {
                const date = new Date(L.createdAt).toLocaleDateString();
                return "<p style ='text-align: justify'>Timestamp: " + date + " Reason: " + L.reason + " By: " + L.user + "<br/></p>";
            }).join('')}`,
        });
    }

    const setIconTrue = () => {
        setIconUpload(true);
    }

    const uploadPhotoHandler = async (e) => {
        e.preventDefault();

        dispatch({ type: "AUPDATE_START" });
        const updateAccount = {
            profilePic,
            token: aUser.token,
        }

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            data.append("upload_preset", "dev_prac");
            data.append("cloud_name", "karlstorage");

            try {
                const res = await axios.post("https://api.cloudinary.com/v1_1/karlstorage/image/upload", data);
                updateAccount.profilePic = res.data.secure_url;

                try {
                    const res = await axios.patch("/api/admin/" + aUser.data.user._id, updateAccount);
                    dispatch({ type: "AUPDATE_SUCCESS", payload: res.data });
                    Swal.fire({
                        icon: 'success',
                        title: 'Updated!',
                        text: 'Profile Picture Changed',
                    });

                    setIconUpload(false);
                } catch (err) {
                    console.log(err);
                    dispatch({ type: "AUPDATE_FAILURE" })
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Photo is required!',
                text: 'Upload a photo',
            });
            setIconUpload(false);
            setProfilePic("");
        }
    }

    console.log(aUser);
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

                        // <h2>Login Credentials</h2>
                        // <div>
                        //     <form onSubmit={formik.handleSubmit}>
                        //         <div className={classes.AdminProfileFormDiv}>
                        //             <div className={classes.InputDiv}>
                        //                 <label>Email Address</label>
                        //                 <ProfileInput
                        //                     placeholder="Email address"
                        //                     type="email"
                        //                     id="email"
                        //                     name="email"
                        //                     onChange={formik.handleChange}
                        //                     value={aUser.user.email}
                        //                 />
                        //             </div>
                        //             <div className={classes.InputDiv}>
                        //                 <label>Password</label>
                        //                 <ProfileInput
                        //                     placeholder="Password"
                        //                     type="password"
                        //                     id="password"
                        //                     name="password"
                        //                     onChange={formik.handleChange}
                        //                     value={aUser.user.password}
                        //                 />
                        //             </div>
                        //         </div>
                        //         <div className={classes.ButtonDiv}>
                        //             <SubmitButton />
                        //             <CancelButton />
                        //         </div>
                        //     </form>
                        // </div>
        //             </div>
        //         </div>
        //     </AdminLayout>
        // </React.Fragment>


            <AdminLayout>
                <div className={classes.Content}>
                    <div className={classes.AdminProfile}>
                        <div className={classes.AdminAccountShadow}>
                            <div className={classes.AdminAccountImage}>
                                <img src= {file ? (URL.createObjectURL(file)) : `${aUser.data.user.profilePic}`} alt="" ></img>
                            </div>
                        </div>

                        {iconUpload === false &&
                            <>
                                <div className={classes.AdminProfileChangeLink}>
                                    <p onClick={ setIconTrue }>Change Profile Picture?</p>
                                </div>

                                <div className={classes.AdminProfileChangeImg}>
                                    <Form.Label ><i class="fas fa-history" onClick = { showLogs }></i></Form.Label>
                                </div>
                            </>
                        }

                        {iconUpload &&
                            <div className={classes.AdminProfileChangeImg}>
                                <Form.Label  htmlFor="iconImg"><i className="fas fa-image"></i></Form.Label>
                                <Form.Label  htmlFor="btnImg"><i className="fas fa-upload"></i></Form.Label>
                            </div>
                        }

                        <Form className={classes.AdminProfileEdit} onSubmit={ uploadPhotoHandler }>
                            <Form.Group>
                                <Form.Control
                                    id="iconImg"
                                    type="file"
                                    name="adminImg"
                                    style = {{display: "none"}}
                                    onChange = {(e) => setFile(e.target.files[0])}
                                />
                            </Form.Group>
                            <Button id="btnImg" type='submit' style={{display:'none'}}></Button>
                        </Form>

                        <h3>{aUser.data.user.username}</h3>
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
                                            {aUser.data.user.city}
                                        </div>
                                    </div>
                                    <div className={classes.InputDiv}>
                                        <label htmlFor="region">Region</label>
                                        <div className={classes.PseudoInput}>
                                            {aUser.data.user.region}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

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
                                        />
                                    </div>
                                </div>
                                <div className={classes.ButtonDiv}>
                                    <SubmitButton />
                                    <CancelButton />
                                </div>
                            </form>
                        </div>

                        {/* LOGIN CREDENTIALS */}

                        {/* <h6>Fill this up to change password</h6>
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
                        </div> */}
                    </div>
                </div>
            </AdminLayout>

    );
}

export default AdminProfile;
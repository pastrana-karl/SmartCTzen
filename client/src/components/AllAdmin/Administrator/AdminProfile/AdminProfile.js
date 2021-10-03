import React, { useState, useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { Row, Col, Form, Container, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { Context } from '../../../../context/Context';
import AdminLayout from '../AdminLayout/AdminLayout';
import AdminProfileButton from '../../../UI/Buttons/AdminProfileButton/AdminProfileButton';
import ProfileInput from '../../../UI/Input/ProfileInput/ProfileInput';
import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';
import { Link } from 'react-router-dom';
import classes from './AdminProfile.module.css';
import axios from 'axios';

const AdminProfile = () => {
    const { aUser, dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
    const [profilePic, setProfilePic] = useState("");
    const [iconUpload, setIconUpload] = useState(false);
    const [logs, setLogs] = useState([]);
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    useEffect(() => {
        const fetchLogs = async () => {
            const res = await axios.get(`/api/history/administrator/?userType=Administrator`);
            setLogs(res.data);
        }

        fetchLogs();
    }, [])

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

    //Update Profile Picture
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
                    const res = await axios.put("/api/admin/" + aUser.data.user._id, updateAccount);
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

    //Update Password
    const passwordUpdate = async (e) => {
        e.preventDefault();

        const checkPass = {
            userId: aUser.data.user._id,
            oldPassword,
        }

        try {
            await axios.post("/api/admin/password-adminCompare", checkPass)

            dispatch({ type: "AUPDATE_START" })
            const updateAccount = {
                userId: aUser.data.user._id,
                newPassword,
                token: aUser.token,
            }
            try {
                const res = await axios.put("/api/admin/" + aUser.data.user._id, updateAccount);
                Swal.fire({
                    icon: 'success',
                    title: 'Update Successfull',
                    text: '',
                });
                
                Array.from(document.querySelectorAll("input")).forEach(
                    input => (input.value = ""),
                    setOldPassword(""),
                    setNewPassword(""),
                );
                
                dispatch({ type: "AUPDATE_SUCCESS", payload: res.data });
            } catch (err) {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: `${err.response.status}`,
                    text: `${err.response.data.message}`,
                });
                dispatch({ type: "AUPDATE_FAILURE" })
            }
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: `${err.response.status}`,
                text: `${err.response.data}`,
            });
        }
    }

    return (
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

                        <h2>Update Password</h2>
                        <div>
                            <Form className={classes.AdminProfileFormDiv} onSubmit = { passwordUpdate }>
                                <Form.Group className={classes.InputDiv}>
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control
                                        className={classes.PseudoInput}
                                        type="password"
                                        name="cpass"
                                        autoComplete="off"
                                        required
                                        onChange = {e => setOldPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className={classes.InputDiv}>
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        className={classes.PseudoInput}
                                        type="password"
                                        name="cpass"
                                        autoComplete="off"
                                        required
                                        onChange = {e => setNewPassword(e.target.value)}
                                    />
                                </Form.Group>
                                
                                <Row className='citizenPassUpdate-BtnContainer'>
                                    <Col className='BtnContainerCenter'>
                                        <Button className = 'citizenPassUpdate-Btn' variant = "danger" type = 'submit'>Change</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </AdminLayout>

    );
}

export default AdminProfile;
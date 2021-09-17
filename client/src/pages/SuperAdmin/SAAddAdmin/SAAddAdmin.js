import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import * as ReactBootStrap from 'react-bootstrap'
import './SAAddAdmin.css'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const SAAddAdmin = () => {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] =  useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(false);

        const newAdmin = {
            username,
            email,
            password,
            location,
            profilePic,
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            data.append("upload_preset", "dev_prac");
            data.append("cloud_name", "karlstorage");

            try {
                const res = await axios.post("https://api.cloudinary.com/v1_1/karlstorage/image/upload", data);
                newAdmin.profilePic = res.data.secure_url;
            } catch (err) {
                console.log(err)
            }
        } else {
            setProfilePic("");
        }

        try {
            await axios.post("/api/admin/register", newAdmin);
            setLoading(true);

            if(loading === true){
                Swal.fire('Awesome!', "You've successfully registered an Administrator!", 'success').then(
                    (result) => {
                        if (result.isConfirmed || result.isDismissed) {
                            setRedirect(true);
                        }
                    }
                );
            }
        } catch (err) {
            console.log(err);
            if (err.response) {
                if(loading === true){
                    setLoading(true);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'something wrong!',
                    }).then(
                        (result) => {
                            if (result.isConfirmed || result.isDismissed) {
                                window.location.reload();
                            }
                        }
                    )
                }
            }
        }
    };

    return (
        <>
            { redirect && (<Redirect to = '/SAManage-admin' />) }
            {loading ? (
                <Container>
                    <div className = 'SAaddAdmin'>
                        <h1>Register Admin</h1>
                    </div>

                    <div className = 'col-md-10 offset-md-1' id = 'SAaddAmin-body'>
                        <div className = 'SAaddAminImg'>
                            <img src= {file && (URL.createObjectURL(file))} alt="" onClick={()=> window.open(URL.createObjectURL(file), "_blank")} ></img>
                        </div>
                        <Form className = 'SAaddAmin-edit' onSubmit = { handleSubmit }>
                            <Form.Group>
                                <div className="SAaddAmin-uploadIcon">
                                    <Form.Label htmlFor="fileInput"><i className="writeIcon fas fa-image"></i></Form.Label>
                                </div>
                                <input
                                    type="file"
                                    name="validIDPic" 
                                    id="fileInput"  
                                    style={{display:"none"}}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </Form.Group>

                            <Form.Group>
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="userName"
                                onChange = {e => setUsername(e.target.value)}
                                autoComplete="off"
                            />
                            </Form.Group>

                            <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                onChange = {e => setEmail(e.target.value)}
                                autoComplete="off"
                            />
                            </Form.Group>

                            <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange = {e => setPassword(e.target.value)}
                                autoComplete="off"
                            />
                            </Form.Group>

                            <Form.Group>
                            <Form.Label>City or Municipality</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                onChange = {e => setLocation(e.target.value)}
                                autoComplete="off"
                            />
                            </Form.Group>


                            <Button variant="danger" type="submit">
                                Register
                            </Button>
                            <Button className = 'SAaddAmin-reset' variant="outline-light" type="reset">
                                Clear
                            </Button>
                            <Link className="SAaddAmin-links" to="/SAManage-admin">Back</Link>
                        </Form>
                    </div>
                </Container>
            ) : (
                <div className = 'SAAddAdminLoading'>
                    <h2>Processing Please Wait</h2>
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

export default SAAddAdmin

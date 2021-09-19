import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import * as ReactBootStrap from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import './SAAddFeaturedMember.css'

const SAAddFeaturedMember = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [message, setMessage] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] =  useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(false);

        const newFeaturedMember = {
            name,
            position,
            message,
            profilePic,
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
                newFeaturedMember.profilePic = res.data.secure_url;
            } catch (err) {
                console.log(err)
            }
        } else {
            setProfilePic("");
        }

        try {
            await axios.post("/api/mFeatured/featuredMember", newFeaturedMember);
            setLoading(true);

            if(loading === true){
                Swal.fire('Awesome!', "You've successfully created an featured member post!", 'success').then(
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
    }

    return (
        <>
            { redirect && (<Redirect to = '/SAContent-home' />) }
            {loading ? (
                <Container>
                    <div className = 'col-md-10 offset-md-1' id = 'SAFeaturedMember-body'>
                        <div className = 'SFMBody-container'>
                            <div className = 'SAFM-container'>
                                <img src= {file && (URL.createObjectURL(file))} alt="" onClick={()=> window.open(URL.createObjectURL(file), "_blank")}></img>
                            </div>
                        </div>

                        <Form className="SAContent-formFM" onSubmit = { handleSubmit }>
                            <div className = 'SAFMicon-container'>
                                <Form.Label htmlFor="fileInput"><i className="SAFM-icon fas fa-image"></i></Form.Label>
                            </div>
                            <input
                                type="file"
                                name="Featured-Photo" 
                                id="fileInput"  
                                style={{display:"none"}}
                                required
                                onChange={(e) => setFile(e.target.files[0])}
                            />

                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                type="text"
                                name="name"
                                required
                                onChange = {e => setName(e.target.value)}
                                autoComplete="off"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Position</Form.Label>
                                <Form.Control
                                type="text"
                                name="position"
                                required
                                onChange = {e => setPosition(e.target.value)}
                                autoComplete="off"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                type="text"
                                name="message"
                                required
                                onChange = {e => setMessage(e.target.value)}
                                autoComplete="off"
                                />
                            </Form.Group>


                            <Button variant="danger" type="submit">
                                Submit
                            </Button>

                            <Button className = 'SAFM-reset' variant="outline-light" type="reset">
                                Clear
                            </Button>

                            <Link to = '/SAContent-home' className = 'SAFM-link'>Back</Link>
                        </Form>
                    </div>
                </Container>
            ) : (
                <div className = 'SAAddFeaturedMLoading'>
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

export default SAAddFeaturedMember


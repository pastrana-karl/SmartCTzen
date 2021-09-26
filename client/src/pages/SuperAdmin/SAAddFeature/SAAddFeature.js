import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import * as ReactBootStrap from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import './SAAddFeature.css'

const SAAddFeature = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [position, setPosition] = useState("");
    const [featurePic, setFeaturePic] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] =  useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newFeature = {
            title,
            contents,
            position,
            featurePic,
        }

        if(file === null) {
            Swal.fire({
                icon: 'error',
                title: 'No Image!',
                text: 'A photo is required.',
            });
        } else {
            setLoading(false);

            if (file) {
                const data = new FormData();
                const filename = Date.now() + file.name;
                data.append("name", filename);
                data.append("file", file);
                data.append("upload_preset", "dev_prac");
                data.append("cloud_name", "karlstorage");
    
                try {
                    const res = await axios.post("https://api.cloudinary.com/v1_1/karlstorage/image/upload", data);
                    newFeature.featurePic = res.data.secure_url;
                } catch (err) {
                    console.log(err)
                }
            } else {
                setFeaturePic("");
            }
    
            try {
                await axios.post("/api/SAFeatures/newFeatures", newFeature);
                setLoading(true);
    
                if(loading === true){
                    Swal.fire('Awesome!', "You've successfully posted a new feature!", 'success').then(
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
                            title: `${err.response.status}`,
                            text: `${err.response.data.message}`,
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

    }
    
    return (
        <>
            { redirect && (<Redirect to = '/SAContent-feature' />) }
            {loading ? (
                <Container>
                    <div className = 'SAcontent-addFeatureHeader'>
                        <h1>Add Feature</h1>
                    </div>

                    <div className = 'col-md-10 offset-md-1' id = 'SAAddFeature-body'>
                        <Form  className="SAContent-featureAdd" onSubmit = { handleSubmit }>
                            <div className = 'SAContent-addFeatureImage'>
                                <div className = 'SAAF-container'>
                                    <img src= {file && (URL.createObjectURL(file))} alt="" onClick={()=> window.open(URL.createObjectURL(file), "_blank")}></img>
                                </div>
                            </div>
                           

                            <Form.Group>
                            <div className="SAContent-addFeatureUploadIcons">
                                <Form.Label htmlFor="fileInput"><i className="writeIcon fas fa-image"></i></Form.Label>
                            </div>
                            <input
                                type="file"
                                name="featuresPic" 
                                id="fileInput"  
                                style={{display:"none"}}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            </Form.Group>

                            <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                className='ContentAddFeature-input'
                                type="text"
                                name="email"
                                required
                                onChange = {e => setTitle(e.target.value)}
                                autoComplete="off"
                            />
                            </Form.Group>

                            <Form.Group>
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                className='ContentAddFeature-input'
                                type="text"
                                name="email"
                                required
                                onChange = {e => setContents(e.target.value)}
                                autoComplete="off"
                            />
                            </Form.Group>

                            <Form.Group>
                                <div>
                                    <Form.Label>Position</Form.Label>
                                </div>

                                <Form.Check
                                    name="Position"
                                    type="radio" 
                                    label="Left"
                                    value="Left"
                                    inline
                                    required
                                    onChange = {e => setPosition(e.target.value)}
                                />

                                <Form.Check 
                                    name="Position"
                                    type="radio" 
                                    label="Right"
                                    value="Right"
                                    inline
                                    required
                                    onChange = {e => setPosition(e.target.value)}
                                />
                            </Form.Group>

                            <Button variant="danger" type="submit">
                                Submit
                            </Button>
                            <Button className = 'SAContent-addFeatureReset' variant="outline-light" type="reset">
                                Clear
                            </Button>
                            <Link to = '/SAContent-feature' className = 'addFeatureLink'>Back</Link>
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

export default SAAddFeature

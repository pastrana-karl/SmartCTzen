import React, { useEffect, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { Link, useLocation, Redirect } from 'react-router-dom'
import axios from 'axios'
import './SAFeatures.css'

const SAFeatures = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [feature, setFeature] = useState("");
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [featurePic, setFeaturePic] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        const getAnnouncement = async ()=>{
            const res = await axios.get("/api/SAFeatures/" + path);
            setFeature(res.data._id);
            setTitle(res.data.title);
            setContents(res.data.contents);
            setFeaturePic(res.data.featurePic);
        }
        getAnnouncement();
    },[path]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.delete(`/api/SAFeatures/${feature}`);
            setRedirect(true);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            { redirect && (<Redirect to = '/SAContent-feature' />) }
            <Container>
                <div className = 'SAnew-feature'>
                    <h1>Delete Feature</h1>
                </div>

                <div className = 'col-md-10 offset-md-1' id = 'SANewFeature-body'>
                    <Form  className="SA-featuredelete" onSubmit = { handleSubmit }>
                        <div className = 'SA-FeatureImage'>
                            <img src= {featurePic} alt=""></img>
                        </div>

                        <h4>{title}</h4>
                        <p>{contents}</p>

                        <Button variant="danger" type="submit">
                            Delete
                        </Button>
                        <Link to = '/SAContent-feature' className = 'SADelete-FeaturesLink'>Back</Link>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default SAFeatures

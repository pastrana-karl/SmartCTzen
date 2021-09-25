import React, { useEffect, useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { Link, Redirect, useLocation } from 'react-router-dom'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import axios from 'axios'
import './SingleApplicants.css'

const SingleApplicants = () => {
    const settings = {
        dots: true,
        fade: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: false,
        slidesToScroll: 1,
        className: 'slides'
    }

    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [applicant, setApplicant] = useState([]);
    const [redirect, setRedirect] = useState(false); 

    useEffect(() => {
        const getApplicant = async ()=>{
            const res = await axios.get("/api/citizen/" + path);
            setApplicant(res.data.citizen)
        }

        console.log(applicant)

        getApplicant();

    },[path]);

    const handleAccept = async () => {
        try {
            await axios.post("/api/citizen/" + path);
            setRedirect(true);
        } catch (err) {
            console.log(err);
        }
    }

    const handleReject = async () => {
        try {
            await axios.delete(`/api/citizen/${path}`);
            setRedirect(true);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            { redirect && (<Redirect to = '/Applicants' />) }
            <Container className = 'Applicant-verificationContainer'>
                <div  className = 'ApplicantVerification-header'>
                    <h1>Applicant Verification</h1>
                </div>

                <div className = 'ApplicantVerification-body'>
                    <Form className="ApplicantVerification-form">
                        <Form.Group>
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {applicant.firstname}
                            disabled
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {applicant.lastname}
                            disabled
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Middle name</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {applicant.middlename}
                            disabled
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Suffix</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {applicant.suffix === "" ? "N/A" : applicant.suffix }
                            disabled
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Sex</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {applicant.sex}
                            disabled
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Birtdate</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {applicant.birthdate}
                            disabled
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {applicant.street + ' ' + applicant.barangay + ' ' + applicant.city}
                            disabled
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Region</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {applicant.region}
                            disabled
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Province</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {applicant.province}
                            disabled
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Zipcode</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {applicant.zipcode}
                            disabled
                        />
                        </Form.Group>
                        
                        <div  className = 'ApplicantVerification-header'>
                            <h1>Valid ID</h1>
                        </div>

                        <div className = 'applicantDocumentsImg'>
                            <Slider {...settings}>
                                <div>
                                    <img src= 'https://res.cloudinary.com/karlstorage/image/upload/v1631243465/free-img/sasjbg0hekrbn7vlc5eo.jpg' alt="" ></img>
                                </div>
                                <div>
                                    <img src= 'https://res.cloudinary.com/karlstorage/image/upload/v1631243465/free-img/sasjbg0hekrbn7vlc5eo.jpg' alt="" ></img>
                                </div>
                            </Slider>
                        </div>

                        <div  className = 'ApplicantVerification-header'>
                            <h1>Proof of Residency</h1>
                        </div>

                        
                        <div className = 'applicantDocumentsImg'>
                            <Slider {...settings}>
                                <div>
                                    <img src= 'https://res.cloudinary.com/karlstorage/image/upload/v1631243465/free-img/sasjbg0hekrbn7vlc5eo.jpg' alt="" ></img>
                                </div>
                                <div>
                                    <img src= 'https://res.cloudinary.com/karlstorage/image/upload/v1631243465/free-img/sasjbg0hekrbn7vlc5eo.jpg' alt="" ></img>
                                </div>
                            </Slider>
                        </div>


                        <div  className = 'ApplicantVerification-header'>
                            <h1>Birth Certificate</h1>
                        </div>

                        
                        <div className = 'applicantDocumentsImg'>
                            <Slider {...settings}>
                                <div>
                                    <img src= 'https://res.cloudinary.com/karlstorage/image/upload/v1631243465/free-img/sasjbg0hekrbn7vlc5eo.jpg' alt="" ></img>
                                </div>
                                <div>
                                    <img src= 'https://res.cloudinary.com/karlstorage/image/upload/v1631243465/free-img/sasjbg0hekrbn7vlc5eo.jpg' alt="" ></img>
                                </div>
                            </Slider>
                        </div>
                    </Form>

                    <div className = "applicantverification-buttonMargin">
                            <Button variant="danger" onClick = { handleAccept }>
                                Accept
                            </Button>
                            <Button variant="danger" onClick = { handleReject }>
                                Reject
                            </Button>
                        </div>
                        <Link to = '/Applicants' className = 'ApplicantVerificationLink'>Back</Link>
                </div>
            </Container>
        </>
    )
}

export default SingleApplicants

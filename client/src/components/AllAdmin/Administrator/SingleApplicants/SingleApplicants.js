import React, { useContext, useEffect, useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { Link, Redirect, useLocation } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import { Context } from '../../../../context/Context';
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Swal from 'sweetalert2';
import axios from 'axios';
import './SingleApplicants.css';

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
    const [validID, setValidID] = useState([]);
    const [birthCert, setBirthCert] = useState([]);
    const [residency, setResidency] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const { aUser } = useContext(Context); 

    useEffect(() => {
        const getApplicant = async ()=>{
            const res = await axios.get("/api/citizen/" + path)
            setApplicant(res.data)
            setValidID(res.data.validIDPic)
            setResidency(res.data.residencyPic)
            setBirthCert(res.data.birthCertPic)
        }

        getApplicant();

    }, [path]);
    
    const handleAccept = async () => {
        const admin = {
            username: aUser.data.user.username,
            usertype: aUser.data.user.userType
        }

        try {
            await axios.post("/api/citizen/" + path, admin);
            Swal.fire('Applicant Accepted', "You've successfuly accepted an applicant.", 'success').then(
                (result) => {
                  if (result.isConfirmed || result.isDismissed) {
                    setRedirect(true);
                   }
                }
            );
        } catch (err) {
            console.log(err.response)
            Swal.fire({
                icon: 'error',
                title: `${err.response.status}`,
                text: `${err.response.data.error}`,
            });
        }
    }

    const handleReject = async () => {
        const admin = {
            username: aUser.data.user.username,
            usertype: aUser.data.user.userType
        }

        try {
            await axios.delete(`/api/citizen/${path}`, { data: admin });
            Swal.fire('Applicant Rejected', "You've rejected an applicant.", 'success').then(
                (result) => {
                  if (result.isConfirmed || result.isDismissed) {
                    setRedirect(true);
                   }
                }
            );
        } catch (err) {
            console.log(err.response)
            Swal.fire({
                icon: 'error',
                title: `${err.response.status}`,
                text: `${err.response.data.error}`,
            });
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
                                    {validID.map((pic) => (
                                        <div key={pic}>
                                            <img src= {pic} alt=""  onClick={()=> window.open(pic, "_blank")} ></img>
                                        </div>
                                    ))}
                                </Slider>
                        </div>

                        <div  className = 'ApplicantVerification-header'>
                            <h1>Proof of Residency</h1>
                        </div>

                        
                        <div className = 'applicantDocumentsImg'>
                                <Slider {...settings}>
                                    {residency.map((pic) => (
                                        <div key={pic}>
                                            <img src= {pic} alt=""  onClick={()=> window.open(pic, "_blank")} ></img>
                                        </div>
                                    ))}
                                </Slider>
                        </div>

                        {birthCert[0] !== undefined &&
                            <> 
                                <div  className = 'ApplicantVerification-header'>
                                    <h1>Birth Certificate</h1>
                                </div>

                                
                                <div className = 'applicantDocumentsImg'>
                                    <Slider {...settings}>
                                        {birthCert.map((pic) => (
                                            <div key={pic}>
                                                <img src= {pic} alt=""  onClick={()=> window.open(pic, "_blank")} ></img>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </>
                        }
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

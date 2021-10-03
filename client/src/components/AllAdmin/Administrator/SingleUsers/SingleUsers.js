import React, { useContext, useEffect, useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import { Context } from '../../../../context/Context';
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import axios from 'axios';
import './SingleUsers.css';

const SingleUsers = () => {
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

    return (
        <>
            <Container className = 'acceptedUser-Container'>
                <div  className = 'acceptedSingleUsers-header'>
                    <h1>SmartCTzen User</h1>
                </div>

                <div className = 'acceptedSingleUsers-body'>
                    <Form className="acceptedSingleUsers-form">
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
                        
                        <div  className = 'acceptedSingleUsers-header'>
                            <h1>Valid ID</h1>
                        </div>

                        <div className = 'acceptedUsersDocumentsImg'>
                                <Slider {...settings}>
                                    {validID.map((pic) => (
                                        <div key={pic}>
                                            <img src= {pic} alt=""  onClick={()=> window.open(pic, "_blank")} ></img>
                                        </div>
                                    ))}
                                </Slider>
                        </div>

                        <div  className = 'acceptedSingleUsers-header'>
                            <h1>Proof of Residency</h1>
                        </div>

                        
                        <div className = 'acceptedUsersDocumentsImg'>
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
                                <div  className = 'acceptedSingleUsers-header'>
                                    <h1>Birth Certificate</h1>
                                </div>

                                
                                <div className = 'acceptedUsersDocumentsImg'>
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

                    <Link to = '/admin-users' className = 'acceptedSingleUsersLink'>Back</Link>
                </div>
            </Container>
        </>
    )
}

export default SingleUsers

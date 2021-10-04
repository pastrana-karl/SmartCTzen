import React, { useContext, useEffect, useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { Link, useLocation, Redirect } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import { Context } from '../../../../context/Context';
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import axios from 'axios';
import Swal from 'sweetalert2';
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
    const [citizenUser, setCitizenUser] = useState([]);
    const [validID, setValidID] = useState([]);
    const [birthCert, setBirthCert] = useState([]);
    const [residency, setResidency] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const { aUser } = useContext(Context); 

    useEffect(() => {
        const getCitizenUser = async ()=>{
            const res = await axios.get("/api/citizen/" + path)
            setCitizenUser(res.data)
            setValidID(res.data.validIDPic)
            setResidency(res.data.residencyPic)
            setBirthCert(res.data.birthCertPic)
        }

        getCitizenUser();

    }, [path]);

    const handleBan = async () => {
        const admin = {
            status: 'Banned',
            username: aUser.data.user.username,
            usertype: aUser.data.user.userType
        }

        try {
            await axios.post("/api/citizen/" + path, admin);
            Swal.fire('User banned!', "You've successfuly banned a user.", 'success').then(
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

    const handleUnban = async () => {
        const admin = {
            status: 'Unbanned',
            username: aUser.data.user.username,
            usertype: aUser.data.user.userType
        }

        try {
            await axios.post("/api/citizen/" + path, admin);
            Swal.fire('User unbanned!', "You've successfuly unbanned a user.", 'success').then(
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

    const handleDelete = async () => {
        const admin = {
            status: 'Deleted',
            username: aUser.data.user.username,
            usertype: aUser.data.user.userType
        }

        try {
            await axios.delete(`/api/citizen/${path}`, { data: admin });
            Swal.fire('User deleted', "You've deleted a user.", 'success').then(
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
            { redirect && (<Redirect to = '/admin-users' />) }
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
                            placeholder= {citizenUser.firstname}
                            disabled
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {citizenUser.lastname}
                            disabled
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Middle name</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {citizenUser.middlename}
                            disabled
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Suffix</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {citizenUser.suffix === "" ? "N/A" : citizenUser.suffix }
                            disabled
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Sex</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {citizenUser.sex}
                            disabled
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Birtdate</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {citizenUser.birthdate}
                            disabled
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {citizenUser.street + ' ' + citizenUser.barangay + ' ' + citizenUser.city}
                            disabled
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Region</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {citizenUser.region}
                            disabled
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Province</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {citizenUser.province}
                            disabled
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Zipcode</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder= {citizenUser.zipcode}
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

                    <div className = "applicantverification-buttonMargin">
                        {citizenUser.status !== 'Banned' ? 
                            <Button variant="danger" onClick = { handleBan }>
                                Ban User
                            </Button>
                        :
                            <Button variant="danger" onClick = { handleUnban }>
                                Unban User
                            </Button>
                        }
                            <Button variant="danger" onClick = { handleDelete }>
                                Delete User
                            </Button>
                    </div>

                    <Link to = '/admin-users' className = 'acceptedSingleUsersLink'>Back</Link>
                </div>
            </Container>
        </>
    )
}

export default SingleUsers

import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../context/Context';
import { Row, Col, Form, Container, Button } from 'react-bootstrap';
import * as ReactBootStrap from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactTooltip from "react-tooltip";
import './CitizenProfile.css';

const CitizenProfile = () => {
    const { user, dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
    const [profilePic, setProfilePic] = useState("");
    const [logs, setLogs] = useState([]);
    const [iconUpload, setIconUpload] = useState(false);
    const [reports, setReports] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [verifiedReports, setVerifiedReports] = useState([]);
    const [approvedProposals, setApprovedProposals] = useState([]);
    const [loading, setLoading] =  useState(true);
    
    const citizen = user.data.user.firstname + " " + user.data.user.lastname;

    console.log(citizen)

    useEffect(() => {
        const fetchLogs = async () => {
            const res = await axios.get(`/api/history/citizens/?user=${citizen}`);
            setLogs(res.data);
        }

        const fetchReports = async () => {
            const res = await axios.get(`/api/reports/?user=${citizen}`);
            let count = 0
            
            res.data.forEach(() => {
            count += 1;
            })

            setReports(count);
        }

        const fetchProposals = async () => {
            const res = await axios.get(`/api/proposals/?user=${citizen}`);
            let count = 0
            
            res.data.data.proposals.forEach(() => {
            count += 1;
            })

            setProposals(count);
        }

        const fetchVerifiedReports = async () => {
            const res = await axios.get(`/api/reports/confirmed/?user=${citizen}`);
            let count = 0
            
            res.data.forEach(() => {
            count += 1;
            })
            setVerifiedReports(count);
        }

        const fetchApprovedProposals = async () => {
            const res = await axios.get(`/api/proposals/approved/?user=${citizen}`);
            let count = 0
            
            res.data.forEach(() => {
            count += 1;
            })

            setApprovedProposals(count);
        }

        fetchLogs();
        fetchReports();
        fetchProposals();
        fetchVerifiedReports();
        fetchApprovedProposals();
    }, [])

    const setIconTrue = () => {
        setIconUpload(true);
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({ type: "UPDATE_START" });
        const updateAccount = {
            profilePic,
            token: user.token,
        }
        if (file) {
            setLoading(false);
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
                    const res = await axios.put("/api/citizen/" + user.data.user._id, updateAccount);
                    dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
                    Swal.fire({
                        icon: 'success',
                        title: 'Updated!',
                        text: 'Profile Picture Changed',
                    });
                    setLoading(true);
                    setIconUpload(false);
                } catch (err) {
                    console.log(err);
                    dispatch({ type: "UPDATE_FAILURE" })
                    setLoading(true);
                }
            } catch (err) {
                setLoading(true);
                console.log(err)
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Photo is requried!',
                text: 'Upload a photo',
            });
            setIconUpload(false);
            setProfilePic("");
            setLoading(true);
        }
    }
    return(
        <>
        {loading ? (
        <Container className = 'citizenProfile-container'>
            <div className = 'citizenAccountImg-shadow'>
                <div className = 'citizenAccountImg'>
                    <img src= {file ? (URL.createObjectURL(file)) : `${user.data.user.profilePic}`} alt="" ></img>
                </div>
            </div>
            
            {iconUpload === false &&
                <>
                    <div className = 'citizenProfile-changeLink'>
                        <p onClick = { setIconTrue }>Change Profile Picture?</p>
                    </div>

                    <div className="citizenProfile-changeImg">
                        <Form.Label ><i className="fas fa-history" onClick = { showLogs }></i></Form.Label>
                    </div>
                </>
            }

            {iconUpload &&
                <div className="citizenProfile-changeImg">
                    <Form.Label  htmlFor="iconImg"><i className="fas fa-image"></i></Form.Label>

                    <ReactTooltip id="infoBtn" place="top" effect="solid">
                        If button is clicked and not submitting please input photo again. . .
                    </ReactTooltip>
                    <Form.Label  data-tip data-for="infoBtn" htmlFor="btnImg"><i className="fas fa-upload"></i></Form.Label>
                </div>
            }

            <div  className = 'col-md-10 offset-md-1' id = 'citizenProfile-body'>
                <div className = 'citizenProfile-name'> 
                     <p>{user.data.user.firstname + " " + user.data.user.middlename + " " + user.data.user.lastname}</p>
                 </div>
                 <div className = 'citizenProfile-statsDesktop'>
                    <Row>
                        {approvedProposals === 10 || verifiedReports === 5 ? (
                            <Col className = 'citizenProfile-Badge'>
                            <h4>Badge</h4>
                            {verifiedReports === 5 &&
                            <>
                                <ReactTooltip id="reportsBadge" place="top" effect="solid">
                                    You have reached five (5) verified reports!
                                </ReactTooltip>
                                <div className = 'citizenProfile-BadgeImg'>
                                    <img data-tip data-for="reportsBadge" src='https://res.cloudinary.com/karlstorage/image/upload/v1633067410/free-img/lxegqxd9012mtsfbr0wk.png' alt="badge"></img> 
                                </div>
                            </>
                            }

                            {approvedProposals === 10 &&
                            <>
                                <ReactTooltip id="proposalsBadge" place="top" effect="solid">
                                    You have reached ten (10) verified proposals!
                                </ReactTooltip>
                                <div className = 'citizenProfile-BadgeImg'>
                                    <img data-tip data-for="proposalsBadge" src="https://res.cloudinary.com/karlstorage/image/upload/v1633067410/free-img/swr8qrfxityadpnchoft.png" alt="badge"></img>
                                </div>
                            </>
                            }
                        </Col>
                        ) : (<></>)}
                        <Col>
                            <Row>
                                <Col className = 'citizenProfile-Stats'>
                                    <h4>Proposals Created</h4>
                                    <p>{ proposals }</p>
                                </Col>
                                <Col className = 'citizenProfile-Stats'>
                                    <h4>Approved Proposals</h4>
                                    <p>{ approvedProposals }</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col className = 'citizenProfile-Stats'>
                                    <h4>Verified Reports</h4>
                                    <p>{ verifiedReports }</p>
                                </Col>
                                <Col className = 'citizenProfile-Stats'>
                                    <h4>Reports Created</h4>
                                    <p>{ reports }</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className = 'citizenProfile-statsMobile'>
                    <Col>
                        {approvedProposals === 10 || verifiedReports === 5 ? (
                            <Row className = 'citizenProfile-Badge'>
                                <Col>
                                    <Row>
                                        <Row><h4>Badge</h4></Row>
                                        {verifiedReports === 5 &&
                                        <>
                                            <ReactTooltip id="reportsBadge" place="top" effect="solid">
                                                You have reached five (5) verified reports!
                                            </ReactTooltip>
                                            <div className = 'citizenProfile-BadgeImg'>
                                                <img data-tip data-for="reportsBadge" src='https://res.cloudinary.com/karlstorage/image/upload/v1633067410/free-img/lxegqxd9012mtsfbr0wk.png' alt="badge"></img> 
                                            </div>
                                        </>
                                        }

                                        {approvedProposals === 10 &&
                                        <>
                                            <ReactTooltip id="proposalsBadge" place="top" effect="solid">
                                                You have reached ten (10) verified proposals!
                                            </ReactTooltip>
                                            <div className = 'citizenProfile-BadgeImg'>
                                                    <img data-tip data-for="proposalsBadge" src="https://res.cloudinary.com/karlstorage/image/upload/v1633067410/free-img/swr8qrfxityadpnchoft.png" alt="badge"></img>
                                            </div>
                                        </>
                                        }
                                    </Row>
                                </Col>
                            </Row>
                        ) : (<></>)}
                        
                        <Row className = 'citizenProfile-StatsMD'>
                            <Col>
                                <Row><h4>Proposals Created</h4></Row>
                                <Row><p>{ proposals }</p></Row>
                            </Col>
                        </Row>
                        <Row className = 'citizenProfile-StatsMD'>
                            <Col>
                            <Row><h4>Approved Proposals</h4></Row>
                            <Row><p>{ approvedProposals }</p></Row>
                            </Col>
                        </Row>
                        <Row className = 'citizenProfile-StatsMD'>
                            <Col>
                                <Row><h4>Verified Reports</h4></Row>
                                <Row><p>{ verifiedReports }</p></Row>
                            </Col>
                        </Row>
                        <Row className = 'citizenProfile-StatsMD'>
                            <Col>
                                <Row><h4>Reports Created</h4></Row>
                                <Row><p>{ reports }</p></Row>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
            
            <Form className = 'citizenProfile-edit' onSubmit = { handleSubmit }>
                <h3>Personal Information</h3>
                  <Form.Group>
                    <input
                        id="iconImg"
                        type="file"
                        name="citizenImg"
                        required
                        style = {{display: "none"}}
                        onChange = {(e) => setFile(e.target.files[0])}
                    />
                </Form.Group>

                
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="lname"
                        autoComplete="off"
                        disabled
                        placeholder={user.data.user.lastname}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="fname"
                        autoComplete="off"
                        disabled
                        placeholder={user.data.user.firstname}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="mname"
                        autoComplete="off"
                        disabled
                        placeholder={user.data.user.middlename}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Suffix</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="sname"
                        autoComplete="off"
                        disabled
                        placeholder={user.data.user.suffix}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Sex</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="sex"
                        autoComplete="off"
                        disabled
                        placeholder={user.data.user.sex}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Birth Date</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="birthday"
                        autoComplete="off"
                        disabled
                        placeholder={user.data.user.birthdate}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Full Address</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="address"
                        autoComplete="off"
                        disabled
                        placeholder={user.data.user.street +" "+user.data.user.barangay +" "+user.data.user.city +" "+user.data.user.region}
                    />
                </Form.Group>

                <Button id="btnImg" type = 'submit' style={{display:'none'}}></Button>
            </Form>
            <Link to = '/citizen-pass-update' className = 'citizenProfile-passwordUpdate'><i className="editIcon far fa-edit"></i></Link>
        </Container>
        ) : (
            <div className = 'citizenProfileLoading'>
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
    );
};

export default CitizenProfile;

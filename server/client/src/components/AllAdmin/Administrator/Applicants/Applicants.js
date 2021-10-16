import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AdminLayout from '../AdminLayout/AdminLayout';
import axios from 'axios'
import './Applicants.css'

const Applicants = () => {
    const [applicant, setApplicant] = useState([]);
    const [applicantID, setApplicantID] = useState("");

    useEffect(() => {
        const getApplicant = async () => {
            const res = await axios.get(`/api/citizen/?status=${false}`);
            setApplicant(res.data);

            if(res.data[0] === undefined) {
                setApplicantID(null);
            } else {
                setApplicantID(res.data[0]._id);
            }
        }

        getApplicant();
    }, [])

    return (
        <>
        <AdminLayout>
            <Container>
                <div  className = 'Applicants-header'>
                    <h1>Applicants</h1>
                </div>

                <div  className = 'col-md-10 offset-md-1' id = 'Applicants-body'>
                    {applicantID !== undefined && applicantID !== null ? (
                    <>
                        <Row>
                            <Col className='Applicants-searchTitle'><h4>Lastname</h4></Col>
                            <Col className='Applicants-searchTitle'><h4>Firstname</h4></Col>
                            <Col className='Applicants-searchTitle'><h4>Status</h4></Col>
                            <Col className='Applicants-searchTitle' id = 'applicantEmail'><h4>Email</h4></Col>
                            <Col className='Applicants-searchTitle'></Col>
                        </Row>
                        {applicant.map((A) => (
                            <Row key={A._id}>
                                <Col className='Applicants-searchResult'><h4>{A.lastname}</h4></Col>
                                <Col className='Applicants-searchResult'><h4>{A.firstname}</h4></Col>
                                <Col className='Applicants-searchResult'><h4>pending</h4></Col>
                                <Col className='Applicants-searchResult' id = 'applicantEmail'><h4>{A.email}</h4></Col>
                                <Col className='Applicants-searchResult'><h4><Link to = {`/Applicants-verification/${A._id}`}><i className="fas fa-external-link-alt"></i></Link></h4></Col>
                            </Row>
                        ))}
                    </>
                    ) : (
                        <h4 style={{textAlign: "center", color: "grey"}}>No current applicants</h4>
                    )}
                </div>
            </Container>
          </AdminLayout>
        </>
    )
}

export default Applicants;

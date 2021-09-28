import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { Row, Col, Button, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Formik, Form, Field, validateYupSchema } from 'formik';
import { Link } from 'react-router-dom';
import './CitizenViewProposal.css';
import FormikInput from '../../../../components/UI/Input/FormikInput/FormikInput';
import { Context } from '../../../../context/Context';
import * as Yup from 'yup';

const CitizenViewProposal = () => {
    const [proposal, setProposal] = useState([]);
    const [upvoteclicked, upvotesetClicked] = useState(true);
    const [downclicked, downsetClicked] = useState(true);
    const { user, dispatch } = useContext(Context);
    const proposalId = localStorage.getItem('proposalid');

    useEffect(() => {
        const sendRequest = async () => {
            // console.log(proposalId)
            const response = await fetch(`/api/proposals/${proposalId}`);
            // console.log(response)
            const responseData = await response.json();
            console.log(responseData)
            // const newResponseData = JSON.stringify(responseData.data);
            // console.log(newResponseData);
            setProposal(responseData.data.proposal);
        };
        sendRequest();
    },[]);

    const initialValues = {
        comment:''
    };

    const validationSchema = Yup.object({
        comments: Yup.string()
    });

    // console.log(user.data.user);
    // console.log(proposal);

    //called when upvote/downvote is clicked
    const castVote = async (proposalId) =>{
        console.log(proposalId);
        //if upvote is clicked, +1 to upvoted
        if(!upvoteclicked){
            // const response = await () => patch(`/api/proposals/${proposalId}`){
                
            // }
            upvotesetClicked(true);
            downsetClicked(false);
        //else +1 to downvoted
        }else{
            upvotesetClicked(false);
            downsetClicked(true);
        }
    }

    return(
        <Container className='citizenViewProposal-container'>
                <Row className='citizenViewProposal-long'>
                    <Col className='citizenViewProposal-title'>
                        <h1>{proposal.title}</h1>
                    </Col>
                    <Col className='citizenViewProposal-description'>
                        <p>{proposal.description}
                        </p>

                        <p>Where: {proposal.location}</p>
                    </Col> 
                    
                        <Col className='citizenViewProposal-img-frame'>
                            <img src='https://imgur.com/7pFJPjg.png'  className='citizenViewProposal-img' alt='Proposal'/>
                        </Col>
                    
                    <Col className='citizenViewProposal-auth'>
                            <p>Proposed by: {proposal.userName}</p>
                            <p>Proposed on: {proposal.createdAt}</p>
                            <p>Status: {proposal.status}</p>
                    </Col>
                    <Col className='citizenViewProposal-status'>Status: {proposal.status}</Col>
                    <Col className='citizenViewProposal-btn-container'>
                        <Row className='citizenViewProposal-btn-frame'>
                            {/* Set button to disabled when current user upvoted propopsal */}
                            <Button disabled={!upvoteclicked} onClick={() => castVote(proposal._id)} className='citizenViewProposal-btn'>Upvote {proposal.upvote}</Button>
                        </Row>
                        <Row  className='citizenViewProposal-btn-frame'>
                            {/* Set button to disabled when current user downvoted propopsal */}
                            <Button disabled={!downclicked} onClick={() => castVote()} className='citizenViewProposal-btn'>Downvote {proposal.upvote}</Button>
                        </Row>
                    </Col>
                </Row>

                <Row className='citizenViewProposal-writecomment-container'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        <Form >
                            <Field
                                className='citizenViewProposal-writecomment'
                                type='text'
                                placeholder='write a comment'
                                id='title'
                                name='title'/>
                        </Form>
                    </Formik>
                </Row>
                <Row className='citizenViewProposal-writecomment-container'>
                    <Col className='citizenViewProposal-comment'>
                        <Row className='citizenViewProposal-comment-img'>
                            <img src='https://imgur.com/82XUVjV.png'/>
                        </Row>
                        <Row className='citizenViewProposal-comment-body'>
                            <Col>Kevin Gojocco</Col>
                            <Col>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                            anim id est laborum.</Col>
                        </Row>
                    </Col>
                    <Col className='citizenViewProposal-comment'>
                        <Row className='citizenViewProposal-comment-img' c={9}>
                            <img src='https://imgur.com/urZfDtd.png'/>
                        </Row>
                        <Row className='citizenViewProposal-comment-body'>
                            <Col>John Doe</Col>
                            <Col>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                            anim id est laborum.</Col>
                        </Row>
                    </Col>
                </Row>
        </Container>
        
    );
};

export default CitizenViewProposal;

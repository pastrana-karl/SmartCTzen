import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import './CitizenViewProposal.css';
import SubmitButton from '../../../../components/UI/Buttons/SubmitButton/SubmitButton';
import { Context } from '../../../../context/Context';
import * as Yup from 'yup';
const CitizenViewProposal = () => {
    const [proposal, setProposal] = useState([]);
    const [comments, setComments] = useState();
    const [upvoteclicked, upvotesetClicked] = useState(false);
    const [downclicked, downsetClicked] = useState(false);
    const { user } = useContext(Context);
    
    const proposalId = localStorage.getItem('proposalid');

    // Proposal
    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch(`/api/proposals/${proposalId}`);
            const responseData = await response.json();
            setProposal(responseData.data.proposal);
            setComments(responseData.data.proposal.comments)
        };
        sendRequest();
    },[proposalId]);

    useEffect(()=>{
        if(proposal.upvote){
            const checkUser = async () => {
                // Get UserId from context
                const userId = user.data.user._id;
                // Get UserId from upvotes Array (get proposal ID, get vote array)
                const test = userId;
                //Compare the two
                const upvotes = proposal.upvote;
                const result = upvotes.includes(test);
                //if true Disable Button
                if(result===true){
                    upvotesetClicked(true)
                }else{
                    upvotesetClicked(false)
                }
            };
            checkUser();
        }
    },[proposal, user.data.user._id])

    useEffect(()=>{
        if(proposal.downvote){
            const checkUser = async () => {
                // Get UserId from context
                const userId = user.data.user._id;
                // Get UserId from upvotes Array (get proposal ID, get vote array)
                const test = userId;
                //Compare the two
                const upvotes = proposal.downvote;
                const result = upvotes.includes(test);

                //if true Disable Button
                if(result===true){
                    downsetClicked(true)
                }else{
                    downsetClicked(false)
                }
            };
            checkUser();
        }
    },[proposal, user.data.user._id])

    const castUpVote = async (proposalId, userId) =>{
        upvotesetClicked(true);
        const removeVote = {
            downvote:userId
        }
        try{
            if(downclicked){
                await axios.patch(`/api/proposals/removeDownVote/${proposalId}`, removeVote).then((result)=>{
                        if (result) {
                            window.location.reload(false);
                        }
                    }
                );
                const addUserVote = {
                    upvote:userId
                };
                await axios.patch(`/api/proposals/upVote/${proposalId}`, addUserVote).then((result)=>{
                    if (result) {
                        window.location.reload(false);
                        }
                    }
                );
            }
            else{
                const addUserVote = {
                    upvote:userId
                };
                await axios.patch(`/api/proposals/upVote/${proposalId}`, addUserVote).then((result)=>{
                        if (result) {
                            window.location.reload(false);
                        }
                    }
                );
            }
        }
        catch(err){
            console.log(err.response)
        }
    }


    const castDownVote = async (proposalId, userId) =>{
        downsetClicked(true);
        const removeVote = {
            upvote:userId
        }
        try{
            if(upvoteclicked){
                
                    await axios.patch(`/api/proposals/removeUpVote/${proposalId}`, removeVote).then((result)=>{
                            if (result) {
                                window.location.reload(false);
                            }
                        }
                    );
                    const addUserVote = {
                        downvote:userId
                    };
                    // Add userId to proposals upvote array
                    await axios.patch(`/api/proposals/downVote/${proposalId}`, addUserVote).then((result)=>{
                            if (result) {
                                window.location.reload(false);
                            }
                        }
                    );
            }
            else{
                const addUserVote = {
                    downvote:userId
                };
                //Add userId to proposals upvote array
                await axios.patch(`/api/proposals/downVote/${proposalId}`, addUserVote).then((result)=>{
                        if (result) {
                            window.location.reload(false);
                        }
                    }
                );
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const initialValues = {
        user:user.data.user.firstname+" "+user.data.user.lastname,
        message:''
    };

    const validationSchema = Yup.object({
        user: Yup.string(),
        message:  Yup.string().required("Please enter a comment")

    });

    const onSubmit = async (values) => {
        await axios.patch(`/api/proposals/comments/${proposalId}`, values).catch(err => {
            console.log('Error: ', err.res.values);
        });
        window.location.reload(false);
    };

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
                            <img src={proposal.coverImage}  className='citizenViewProposal-img' alt='Proposal'/>
                        </Col>
                    
                    <Col className='citizenViewProposal-auth'>
                            <p>Proposed by: {proposal.userName}</p>
                            <p>Proposed on: {proposal.createdAt}</p>
                    </Col>
                    <Col className='citizenViewProposal-status'>Status: {proposal.status}</Col>
                    <Col className='citizenViewProposal-btn-container'>
                        <Row className='citizenViewProposal-btn-frame'>
                            {/* Set button to disabled when current user upvoted propopsal onClick={() => castUpVote(proposal._id, user.data.user._id)} {proposal.upvote.length ? proposal.upvote.length : 0}*/}
                            <Button disabled={ upvoteclicked } onClick={() => castUpVote(proposal._id, user.data.user._id)} className='citizenViewProposal-btn'>Upvote </Button>
                        </Row>
                        <Row  className='citizenViewProposal-btn-frame'>
                            {/* Set button to disabled when current user downvoted propopsal  onClick={() => castDownVote(proposal._id, user.data.user._id)} {proposal.downvote.length ? proposal.downvote.length : 0}*/}
                            <Button disabled={ downclicked } onClick={() => castDownVote(proposal._id, user.data.user._id)} className='citizenViewProposal-btn'>Downvote </Button>
                        </Row>
                    </Col>
                </Row>

                <Row className='citizenViewProposal-inputcomment-container'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>
                            <Field
                                className='citizenViewProposal-writecomment'
                                type='text'
                                placeholder='Comment Your Thoughts'
                                //idk what this is
                                id='comment'
                                //Goes to Validation schema
                                name='message'/>
                                <ErrorMessage name='comment'>
                                    {errorMsg => <div className="InputValidation">{errorMsg}</div>}
                                </ErrorMessage>
                                <div className='buttonContainer'>
                                    <SubmitButton />
                                </div>
                        </Form>
                    </Formik>
                </Row>
                <Row className='citizenViewProposal-writecomment-container'>
                    {comments && comments.map(comment => (
                    <Col className='citizenViewProposal-comment' key={comment._id}>
                        <Row className='citizenViewProposal-comment-body'>
                            <Col>{comment.user}</Col>
                            <Col>{comment.message}</Col>
                        </Row>
                    </Col>
                    ))}
                </Row>
        </Container>
    );
};

export default CitizenViewProposal;

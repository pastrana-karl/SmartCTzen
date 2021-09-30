import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { Row, Col, Button, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Formik, Form, ErrorMessage, Field, validateYupSchema } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import './CitizenViewProposal.css';
import FormikInput from '../../../../components/UI/Input/FormikInput/FormikInput';
import SubmitButton from '../../../../components/UI/Buttons/SubmitButton/SubmitButton';
import { Context } from '../../../../context/Context';
import * as Yup from 'yup';

const CitizenViewProposal = () => {
    const [proposal, setProposal] = useState([]);
    const [upvoteclicked, upvotesetClicked] = useState(false);
    const [downclicked, downsetClicked] = useState(false);
    const { user, dispatch } = useContext(Context);
    const [disable, setDisable] = useState(false);
    const [arrEmpty, setarrEmpty] = useState();
    const proposalId = localStorage.getItem('proposalid');
    

    useEffect(() => {
        const sendRequest = async () => {
            // console.log(proposalId)
            const response = await fetch(`/api/proposals/${proposalId}`);
            // console.log(response)
            const responseData = await response.json();
            // console.log(responseData)
            // const newResponseData = JSON.stringify(responseData.data);
            // console.log(newResponseData);
            setProposal(responseData.data.proposal);
        };
        sendRequest();
    },[]);

    useEffect(()=>{
        if(proposal.upvote){
            const checkUser = async () => {
                // Get UserId from context
                const userId = user.data.user._id;
                // Get UserId from upvotes Array (get proposal ID, get vote array)
                const test = `{"${userId}":""}`;
                //Compare the two
                const upvotes = proposal.upvote;
                const result = upvotes.includes(test);

                // console.log(result); // true
                //if true Disable Button
                if(result==true){
                    upvotesetClicked(true)
                }else{
                    upvotesetClicked(false)
                }
            };
            checkUser();
        }
    },[proposal])

    useEffect(()=>{
        if(proposal.downvote){
            const checkUser = async () => {
                // Get UserId from context
                const userId = user.data.user._id;
                // Get UserId from upvotes Array (get proposal ID, get vote array)
                const test = `{"${userId}":""}`;
                //Compare the two
                const upvotes = proposal.downvote;
                const result = upvotes.includes(test);

                // console.log(result); // true
                //if true Disable Button
                if(result==true){
                    downsetClicked(true)
                }else{
                    downsetClicked(false)
                }
            };
            checkUser();
        }
    },[proposal])

    

    const castUpVote = async (proposalId, userId) =>{
        upvotesetClicked(true);

        try{
            // if(downsetClicked == true){
                // const response = await axios.patch(`/api/proposals/removeDownVote/${proposalId}`, userId).then((result)=>{
                //         if (result) {
                //             console.log(result)
                //             window.location.reload(false);
                //         }
                //     }
                // );
                const addUserVote = user.data.user._id;
                const response2 = await axios.patch(`/api/proposals/upVote/${proposalId}`, addUserVote).then((result)=>{
                    if (result) {
                        console.log(result)
                        window.location.reload(false);
                        }
                    }
                );
            // }
            // else{
            //     const addUserVote = user.data.user._id;
            //     const response = await axios.patch(`/api/proposals/upVote/${proposalId}`, addUserVote).then((result)=>{
            //             if (result) {
            //                 console.log(result)
            //                 window.location.reload(false);
            //             }
            //         }
            //     );
            // }
        }
        catch(err){
            console.log(err.response)
        }
    }


    const initialValues = {
        comment:'',
    };

    const validationSchema = Yup.object({
        comment: Yup.string().required("Required"),
    });


    const castDownVote = async (proposalId, userId) =>{
        downsetClicked(true);
        try{
            // if(upvoteclicked == true){
                
                    // const response = await axios.patch(`/api/proposals/removeUpVote/${proposalId}`, userId).then((result)=>{
                    //         if (result) {
                    //             console.log(result)
                    //             window.location.reload(false);
                    //         }
                    //     }
                    // );
                    const addUserVote = user.data.user._id;
                    //Add userId to proposals upvote array
                    const response2 = await axios.patch(`/api/proposals/downVote/${proposalId}`, addUserVote).then((result)=>{
                            if (result) {
                                console.log(result)
                                window.location.reload(false);
                            }
                        }
                    );
            // }
            // else{
            //     const addUserVote = user.data.user._id;
            //     //Add userId to proposals upvote array
            //     const response = await axios.patch(`/api/proposals/downVote/${proposalId}`, addUserVote).then((result)=>{
            //             if (result) {
            //                 console.log(result)
            //                 window.location.reload(false);
            //             }
            //         }
            //     );
            // }
        }
        catch(err){
            console.log(err)
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
                            <Button disabled={ upvoteclicked } onClick={() => castUpVote(proposal._id, user.data.user._id)} className='citizenViewProposal-btn'>Upvote</Button>
                        </Row>
                        <Row  className='citizenViewProposal-btn-frame'>
                            {/* Set button to disabled when current user downvoted propopsal */}
                            <Button disabled={ downclicked } onClick={() => castDownVote(proposal._id, user.data.user._id)} className='citizenViewProposal-btn'>Downvote</Button>
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
                                id='comment'
                                name='comment'/>
                            <ErrorMessage name="comment">
                                    {errorMsg => <div className="InputValidation">{errorMsg}</div>}
                                </ErrorMessage>
                                <SubmitButton />
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

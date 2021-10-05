import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import './CitizenProposals.css';
import { Row, Col, Container} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Context } from '../../../context/Context';


const CitizenProposals = () => {
    const {user} = useContext(Context)
    const [proposals, setProposals] = useState([]);
    const currentCitizenUser = user.data.user.firstname + " " + user.data.user.lastname;
    // const [proposals, setProposals] = useState([]);
    // const [proposals, setProposals] = useState([]);
    // const [proposals, setProposals] = useState([]);

    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch('/api/proposals');
            const responseData = await response.json();
            // console.log(responseData)
            setProposals(responseData.data.proposals);
        };
        sendRequest();
    }, []);

    const deleteProposal = async (proposalId) => {
        console.log(proposalId);
        const citizen = {
            username: currentCitizenUser,
            usertype: user.data.user.userType
        }
        const response = await axios.delete(`/api/proposals/${proposalId}`, {data: citizen});
        const refresh = await fetch('/api/proposals');
        const responseData = await refresh.json();
        setProposals(responseData.data.proposals);
    }

    const getProposalId = async (proposalId) => {
        console.log(proposalId);
        localStorage.setItem('proposalid', proposalId);
    }
    
    
    //ALL Category
    //onClick={() => categoryAll(status:lahat ng status na meron)}  initialize nalang ng local array na ["Pending","Approved","Rejected"] 
    const categoryAll = async () => {
        const response = await fetch('/api/proposals');
        const responseData = await response.json();
        // console.log(responseData)
        setProposals(responseData.data.proposals);
    }
    
    //const categoryAll = async (status) =>{}
    // dito icocompare mo yung local content array to all proposal status
    // if nag true ididsplay natin

    const categoryApproved = async () => {
        const response = await fetch('/api/proposals/approved');
        const responseData = await response.json();
        // console.log(responseData)
        setProposals(responseData);
        // console.log(responseData)
    }

    const categoryRejected = async () => {
        const response = await axios.get('/api/proposals/rejected');
        // const responseData = await response.json();
        // console.log(response.data)
        setProposals(response.data);
    }
    //APPROVED/REJECTED Category
    //onClick={() => categoryApproved/Rejected(status:Approved/Rejected)}
    //const categoryApproved/Rejected = async (status) =>{}
    // dito icocompare mo yung Approved/Rejected na status to all proposals
    // if nag true ididsplay natin

    const categoryOwn = async () => {
        // const currentuserid = user.user.data.user._id;
        // const useridfilter = {
        //     citizenId: currentuserid,
        // }
        // const response = await fetch('/api/proposals', userId);
        // const responseData = await response.json();
        // // console.log(responseData)
        // setProposals(responseData.data.proposals);
        const response = await axios.get(`/api/proposals/self/${user.data.user._id}`);
        // // const responseData = await response.json();
        // console.log(response.data);
        setProposals(response.data);
    }
    //OWN Category
    //onClick={() => categoryOwn(user.data.user._id)}
    //const categoryOwn = async (userId) =>{}
    //dito icocompare mo ang userId mo sa lahat ng userIds na meron sa proposals
    //if nag true ididisplay
    console.log(user.data.user._id);

    return(
        <Container className="proposalsContainer">
            <Row className="proposalsMain">
                <div className='citizenproposals-catbar-container'>
                    <ul className='citizenproposals-catbar'> 
                        <li className='citizenproposals-catbar-item' onClick={() => categoryAll()}>All</li> 
                        <li className='citizenproposals-catbar-item' onClick={() => categoryApproved()}>Approved</li>
                        <li className='citizenproposals-catbar-item' onClick={() => categoryRejected()}>Rejected</li>
                        <li className='citizenproposals-catbar-item' onClick={() => categoryOwn()}>My Proposals</li>
                    </ul>
                </div>
                        <NavLink to="/citizen-create-proposals">
                            <button className="proposalCreate">Create Proposal</button>
                        </NavLink>

            {proposals && proposals.map(proposal => (
                <Col className="proposalShortContainer" key={proposal._id}>
                    <div className="proposalShort">
                        <div className="proposalTitleContainer">
                            <div className="proposalTitle">
                                <h2>{proposal.title}</h2>
                            </div>
                            <div className="proposalAuthImg">
                                <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Author"/>
                            </div>
                            <div className="proposalAuth">
                                {proposal.userName}
                            </div>
                        </div>
                        <div className="proposalContent">
                            <div className="proposalShortInfo">
                                <h2>{proposal.title}</h2>
                                <div className="proposalAuthContainer">
                                    <div className="proposalAuthImg">
                                        <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Author"/>
                                    </div>
                                    <div className="proposalAuth">
                                        {proposal.userName}
                                    </div>
                                </div>
                                    <p>{proposal.description} </p>
                                <div className="proposalsBody">
                                    <i className="fas fa-thumbs-up"/>{proposal.upvote.length ? proposal.upvote.length : 0}
                                    <i className="fas fa-thumbs-down"/>{proposal.downvote.length ? proposal.downvote.length : 0}
                                    {proposal.userId === user.data.user._id ?
                                    null
                                    :
                                    <i onClick={()=> deleteProposal(proposal._id)} style = {{cursor: 'pointer'}} className="fas fa-trash"></i>
                                    }
                                </div>
                                {proposal.status === "Rejected" ?  
                                null
                                :
                                <Link className='proposalsViewMore' to={`/citizen-view-proposals`} onClick={()=> getProposalId(proposal._id)}>
                                    View More
                                </Link>
                                }
                            </div>
                            <div className="proposalShortImgContainer">
                                <div className="proposalShortImgFrame">
                                    <img src={proposal.coverImage ? proposal.coverImage : "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available-225x300.png"} alt="" className="proposalImg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            ))}
        </Row>      
    </Container>
    );
}

export default CitizenProposals;


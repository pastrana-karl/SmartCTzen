import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import './CitizenProposals.css';
import { Row, Col, Container} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Context } from '../../../context/Context';


const CitizenProposals = () => {
    const {user} = useContext(Context)
    const [proposals, setProposals] = useState([]);
    const currentCitizenUser = user.data.user.firstname + " " + user.data.user.lastname;

    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch('/api/proposals');
            const responseData = await response.json();
            setProposals(responseData.data.proposals);
        };
        sendRequest();
    }, []);

    const deleteProposal = async (proposalId) => {
        const citizen = {
            username: currentCitizenUser,
            usertype: user.data.user.userType
        }
        await axios.delete(`/api/proposals/${proposalId}`, {data: citizen});
        const refresh = await fetch('/api/proposals');
        const responseData = await refresh.json();
        setProposals(responseData.data.proposals);
    }

    const getProposalId = async (proposalId) => {
        localStorage.setItem('proposalid', proposalId);
    }
    
    
    //ALL Category
    const categoryAll = async () => {
        const response = await fetch('/api/proposals');
        const responseData = await response.json();
        setProposals(responseData.data.proposals);
    }
    
    //const categoryAll = async (status) =>{}
    // dito icocompare mo yung local content array to all proposal status
    // if nag true ididsplay natin

    const categoryApproved = async () => {
        const response = await fetch('/api/proposals/approved');
        const responseData = await response.json();
        setProposals(responseData);
    }

    const categoryRejected = async () => {
        const response = await axios.get('/api/proposals/rejected');
        setProposals(response.data);
    }
 
    const categoryOwn = async () => {
        const response = await axios.get(`/api/proposals/self/${user.data.user._id}`);

        setProposals(response.data);
    }

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
                                {proposal.userId === user.data.user._id ?
                                <img src={user.data.user.profilePic} alt="Author"/>
                                :
                                null
                                }
                            </div>
                            <div className="proposalAuth">
                                {proposal.userName}
                            </div>
                        </div>
                        <div className="proposalContent">
                            <div className="proposalShortInfo">
                                <h2>{proposal.title}</h2>
                                <div className="proposalAuthContainer">
                                    <div className="proposalAuth">
                                        {proposal.userName}
                                    </div>
                                </div>
                                    <p>{proposal.description} </p>
                                <div className="proposalsBody">
                                    <i className="fas fa-thumbs-up"/>{proposal.upvote.length ? proposal.upvote.length : 0}
                                    <i className="fas fa-thumbs-down"/>{proposal.downvote.length ? proposal.downvote.length : 0}
                                    {proposal.userId === user.data.user._id ?
                                    <i onClick={()=> deleteProposal(proposal._id)} style = {{cursor: 'pointer'}} className="fas fa-trash"></i>
                                    :
                                    null
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


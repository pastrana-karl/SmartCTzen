import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import './CitizenProposals.css';
import { Row, Col, Container} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';


const CitizenProposals = () => {
    const [proposals, setProposals] = useState();


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
        const response = await axios.delete(`/api/proposals/${proposalId}`);
        const refresh = await fetch('/api/proposals');
        const responseData = await refresh.json();
        setProposals(responseData.data.proposals);
    }

    const getProposalId = async (proposalId) => {
        console.log(proposalId);
        localStorage.setItem('proposalid', proposalId);
    }
    

    return(
        <Container className="proposalsContainer">
            <div className="proposalsMain">
                <Row className='citizenproposals-catbar-container'>
                    <Col className='citizenproposals-catbar'>
                        <Link className='citizenproposals-catbar-item' to='/'>All</Link>
                        <Link className='citizenproposals-catbar-item' to='/'>Approved</Link>
                        <Link className='citizenproposals-catbar-item' to='/'>Rejected</Link>
                        <Link className='citizenproposals-catbar-item' to='/'>My Proposals</Link>
                    </Col>
                </Row>
                {/* <div className="proposalsCreateBtnContainer"> */}
                        <NavLink to="/citizen-create-proposals">
                            <button className="proposalCreate">Create Proposal</button>
                        </NavLink>
                {/* </div> */}

            {/* <div className="proposalShortContainer">
                <div className="proposalShort">
                    <div className="proposalTitleContainer">
                        <div className="proposalTitle">
                            <h2>Lorem Ipsum</h2>
                        </div>
                        <div className="proposalAuthImg">
                            <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Author"/>
                        </div>
                        <div className="proposalAuth">
                            Juan Carlos
                        </div>
                    </div>
                    <div className="proposalContent">
                        <div className="proposalShortInfo">
                            <h2>Lorem ipsum</h2>
                            <div className="proposalAuthContainer">
                                <div className="proposalAuthImg">
                                    <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Author"/>
                                </div>
                                <div className="proposalAuth">
                                    Juan Carlos
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis efficitur orci et interdum vulputate. 
                                Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut vel euismod leo. Ut varius a magna 
                                eu vulputate. </p>
                            <p>Upvote: 14 </p><p> Downvote: 3</p>
                        </div>
                        <div className="proposalShortImgContainer">
                            <div className="proposalShortImgFrame">
                                <img src="https://th.bing.com/th/id/R.b647d58e6001e77b9471b110f44c2641?rik=Kariecnl8cUg1g&riu=http%3a%2f%2ffilipinoaustralianjournal.com.au%2fwp-content%2fuploads%2f2016%2f03%2fphilippine-tricycles.jpg&ehk=%2fECLwkRpQ1vL3g8sFPsT8JnrucAFmfXhwjRaYgXJmxw%3d&risl=&pid=ImgRaw&r=0" alt="" className="proposalImg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {proposals && proposals.map(proposal => (
                <div className="proposalShortContainer" key={proposal._id}>
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
                                    <p><i className="fas fa-thumbs-up"/>{proposal.upvote}</p>
                                    <p><i className="fas fa-thumbs-down"/>{proposal.downvote}</p>
                                    <i onClick={()=> deleteProposal(proposal._id)} className="fas fa-trash"></i>
                                </div>
                                <Link className='proposalsViewMore' to={`/citizen-view-proposals`} onClick={()=> getProposalId(proposal._id)}>
                                    View More
                                </Link>
                            </div>
                            <div className="proposalShortImgContainer">
                                <div className="proposalShortImgFrame">
                                    <img src="https://th.bing.com/th/id/R.b647d58e6001e77b9471b110f44c2641?rik=Kariecnl8cUg1g&riu=http%3a%2f%2ffilipinoaustralianjournal.com.au%2fwp-content%2fuploads%2f2016%2f03%2fphilippine-tricycles.jpg&ehk=%2fECLwkRpQ1vL3g8sFPsT8JnrucAFmfXhwjRaYgXJmxw%3d&risl=&pid=ImgRaw&r=0" alt="" className="proposalImg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>      
    </Container>
    );
}

export default CitizenProposals;


//Backup code
{/* <Row className="proposalShortContainer"> gawing citizenproposals-shorts-container  dito lahat nakalagay


        <Row className="proposalShort">           citizenproposals-mobile-shortinfo
            <Row className="proposalTitleContainer">   delete
                <Row className="proposalTitle">          
                    <h2>Lorem Ipsum</h2>               citizenproposal-mobile-shortinfo > h2
                </Row>
                <Col className="proposalAuthImg">      citizenproposal-mobile-shortinfo > img
                    <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Author"/>
                </Col>
                <Row className="proposalAuth">Juan Carlos</Row>      citizenproposal-mobile-shortinfo > p
            </Row>
        </Row>



    <Row className="proposalContent">                   citizenproposals-shortinfo
        <Row className="proposalShortInfo">             delete
            <h2>Lorem ipsum</h2>                        citizenproposals-shortinfo > h2
            <div className="proposalAuthContainer">     delete
                <div className="proposalAuthImg">       delete   citizenproposals-shortinfo > h2
                    <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Author"/>
                </div>
                <div className="proposalAuth">          delete citizenproposals-shortinfo > h5
                    <h5>Juan Carlos</h5>
                </div>
            </div>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis efficitur orci et interdum vulputate. 
                Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut vel euismod leo. Ut varius a magna 
                eu vulputate. </p>
            <p>Upvote: 14 </p><p> Downvote: 3</p>       citizenproposals-shortinfo > p
        </div>
        <div className="proposalShortImgContainer">     citizenproposals-shortinfo-img-frame
            <div className="proposalShortImgFrame">     citizenproposals-shortinfo-img-frame > img   
                <img src="https://th.bing.com/th/id/R.b647d58e6001e77b9471b110f44c2641?rik=Kariecnl8cUg1g&riu=http%3a%2f%2ffilipinoaustralianjournal.com.au%2fwp-content%2fuploads%2f2016%2f03%2fphilippine-tricycles.jpg&ehk=%2fECLwkRpQ1vL3g8sFPsT8JnrucAFmfXhwjRaYgXJmxw%3d&risl=&pid=ImgRaw&r=0" alt="" className="proposalImg" />
            </div>
        </div>
    </div>
</Row> */}
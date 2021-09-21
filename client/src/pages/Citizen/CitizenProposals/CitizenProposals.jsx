// import "../../UI/Citizen/Proposals/proposals.css";
// import "../Bars/catbar.css";
import React from 'react';
import './CitizenProposals.css';
import { Row, Col, Form, Button, Container} from 'react-bootstrap';
import ProposalNav from '../../../components/Citizen/ProposalNav/ProposalNav';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import NavigationItem from '../../UI/Navigation/NavigationItems/NavigationItem/NavigationItem';
// import NavigationItems from '../../UI/Navigation/NavigationItems/NavigationItems';
// import Toolbar from '../../UI/Navigation/Toolbar/Toolbar';
// import NavBarProposals from "./ProposalStatus/NavBarProposals";
// import ProposalBar from "../../UI/Citizen/Proposals/ProposalBar";

// const showAll = () => {
//     return <h1>show All Proposals</h1>
// }
// const showRejected = () => {
//     return <h1>show Rejected Proposals</h1>
// }
// const showApproved = () => {
//     return <h1>show Approved Proposals</h1>
// }
// const showUserProposals = () => {
//     return <h1>show User Proposals</h1>
// 

const CitizenProposals = () => (
    <>
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

            <div className="proposalShortContainer">
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
            </div>
        </div>      
                    
                  
      
    </Container>
    </>
    )

export default CitizenProposals;



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
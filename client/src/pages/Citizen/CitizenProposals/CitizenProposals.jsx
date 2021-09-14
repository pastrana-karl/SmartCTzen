// import "../../UI/Citizen/Proposals/proposals.css";
// import "../Bars/catbar.css";
import React from 'react';
import './CitizenProposals.css';
import { Row, Col, Form, Button, Container} from 'react-bootstrap';
import ProposalNav from '../../../components/Citizen/ProposalNav/ProposalNav';
import { NavLink } from 'react-router-dom';
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
                <React.Fragment>
                    <ProposalNav/>
                </React.Fragment>
                {/* <div className="proposalsCreateBtnContainer"> */}
                        <NavLink to="/citizen-create-proposals">
                            <button className="proposalCreate">Create Proposal</button>
                        </NavLink>
                {/* </div> */}
                <div className="proposalShortContainer">
                    <div className="proposalShort">
                        <div className="proposalTitleContainer">
                            <div className="proposalTitle">
                                <h2>Hell Week</h2>
                            </div>
                            <div className="proposalAuthImg">
                                <img src="https://imgur.com/8gnOL2V.jpg" alt="Author"/>
                            </div>
                            <div className="proposalAuth">
                                G Floaty
                            </div>
                        </div>
                        <div className="proposalContent">
                            <div className="proposalShortInfo">
                                <h2>Hell Week</h2>
                                <div className="proposalAuthContainer">
                                    <div className="proposalAuthImg">
                                        <img src="https://imgur.com/8gnOL2V.jpg" alt="Author"/>
                                    </div>
                                    <div className="proposalAuth">
                                        G Floaty
                                    </div>
                                </div>
                                <p>Basta ayun nashotgun ako sa utak tapos pinapatigil ako sa paggawa sa comp kasi di raw ako nag aaral pag sa harap ng lappy</p>
                                <p>Upvote: 14</p><p>Downvote: 3</p>
                            </div>
                            <div className="proposalShortImgContainer">
                                <div className="proposalShortImgFrame">
                                    <img src="https://static1.srcdn.com/wordpress/wp-content/uploads/2020/05/Elmo-Flames-Meme.jpg" alt="" className="proposalImg" />
                                </div>
                            </div>
                        </div>
                    </div>
                    

                    
                    <div className="proposalShort">
                        <div className="proposalTitleContainer">
                            <div className="proposalTitle">
                                <h2>Birthday Ni Jack</h2>
                            </div>
                            <div className="proposalAuthImg">
                                <img src="https://imgur.com/8gnOL2V.jpg" alt="Author"/>
                            </div>
                            <div className="proposalAuth">
                                Kevin Eugene Allan C. Gojoco
                            </div>
                        </div>
                        <div className="proposalContent">
                            <div className="proposalShortInfo">
                                <h2>Birthday ni Jack</h2>
                                <div className="proposalAuthContainer">
                                    <div className="proposalAuthImg">
                                        <img src="https://imgur.com/8gnOL2V.jpg" alt="Author"/>
                                    </div>
                                    <div className="proposalAuth">
                                        Kevin Eugene Allan C. Gojoco
                                    </div>
                                </div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis efficitur orci et interdum vulputate. 
                                    Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut vel euismod leo. Ut varius a magna 
                                    eu vulputate. Nullam ornare neque ut scelerisque hendrerit. Donec ac arcu at diam placerat cursus 
                                    nec non mi. Vestibulum sed leo quis magna vehicula vulputate. Sed tempus ac ante nec venenatis. 
                                    Sed molestie fermentum pharetra. Etiam maximus blandit rutrum. Duis est sem, accumsan vel sapien quis, 
                                    lacinia lacinia risus. </p>
                                <p>Upvote: 5</p><p>Downvote: 1</p>
                            </div>
                            <div className="proposalShortImgContainer">
                                <div className="proposalShortImgFrame">
                                    <img src="https://imgur.com/8c0aFJp.jpg" alt="" className="proposalImg" />
                                </div>
                            </div>
                        </div>
                    </div>
                      
                    
                    <div className="proposalShort">
                        <div className="proposalTitleContainer">
                            <div className="proposalTitle">
                                <h2>Hello</h2>
                            </div>
                            <div className="proposalAuthImg">
                                <img src="https://imgur.com/8gnOL2V.jpg" alt="Author"/>
                            </div>
                            <div className="proposalAuth">
                                John Doe
                            </div>
                        </div>
                        <div className="proposalContent">
                            <div className="proposalShortInfo">
                                <h2>Hello</h2>
                                <div className="proposalAuthContainer">
                                    <div className="proposalAuthImg">
                                        <img src="https://imgur.com/8gnOL2V.jpg" alt="Author"/>
                                    </div>
                                    <div className="proposalAuth">
                                        John Doe
                                    </div>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis efficitur orci et interdum vulputate. 
                                    Interdum et malesuada fames ac ante ipsum primis in faucibus.
                                </p>
                                <p>Upvote: 5</p><p>Downvote: 1</p>
                            </div>
                            <div className="proposalShortImgContainer">
                                <div className="proposalShortImgFrame">
                                    {/* <img src="https://static1.srcdn.com/wordpress/wp-content/uploads/2020/05/Elmo-Flames-Meme.jpg" alt="" className="proposalImg" /> */}
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
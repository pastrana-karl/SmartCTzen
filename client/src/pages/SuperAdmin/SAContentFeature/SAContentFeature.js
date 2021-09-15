import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './SAContentFeature.css'

const SAContentFeature = () => {
    return (
       <>
        <Container className = 'SAcontent-featuresContainer'>
            <div className = 'SAcontent-feature'>
                <h1>Features</h1>
            </div>
            <Row className = 'SAcontent-featureRow'>
                    <Col className = 'SAcontent-featureDisplayVisibility'>
                        <div className = 'col-md-10 offset-md-1'>
                            <div className = 'SAcontent-featureDisplay'>
                                <div className = 'SAcontent-featureImg'>
                                <img  
                                    src = "https://res.cloudinary.com/karlstorage/image/upload/v1630487534/free-img/bjcsaiqydxgy2qpgmm3p.png" 
                                    alt = "login-display">
                                </img>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className = 'col-md-10 offset-md-1'>
                            <div className = 'SAcontent-featureMobileDisplay'>
                                <div className = 'SAcontent-featureImg'>
                                <img  
                                    src = "https://res.cloudinary.com/karlstorage/image/upload/v1630487534/free-img/bjcsaiqydxgy2qpgmm3p.png" 
                                    alt = "login-display">
                                </img>
                                </div>
                            </div>
                            <div className = 'SAcontent-featureDescription'>
                                <h4>Create Proposals</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className = 'SAcontent-featureRow'>
                    <Col className = 'SAcontent-featureDisplayVisibility'>
                        <div className = 'col-md-10 offset-md-1'>
                            <div className = 'SAcontent-featureDisplay'>
                                <div className = 'SAcontent-featureImg'>
                                <img  
                                    src = "https://res.cloudinary.com/karlstorage/image/upload/v1630487533/free-img/povx7po4k1gnrmgvf70x.png" 
                                    alt = "login-display">
                                </img>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className = 'col-md-10 offset-md-1'>
                            <div className = 'SAcontent-featureMobileDisplay'>
                                <div className = 'SAcontent-featureImg'>
                                <img  
                                    src = "https://res.cloudinary.com/karlstorage/image/upload/v1630487533/free-img/povx7po4k1gnrmgvf70x.png" 
                                    alt = "login-display">
                                </img>
                                </div>
                            </div>
                            <div className = 'SAcontent-featureDescription'>
                                <h4>Monitor Projects</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className = 'SAcontent-featureRow'>
                    <Col className = 'SAcontent-featureDisplayVisibility'>
                        <div className = 'col-md-10 offset-md-1'>
                            <div className = 'SAcontent-featureDisplay'>
                                <div className = 'SAcontent-featureImg'>
                                <img  
                                    src = "https://res.cloudinary.com/karlstorage/image/upload/v1630487533/free-img/mic8edrmhxn85rggyofi.png" 
                                    alt = "login-display">
                                </img>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className = 'col-md-10 offset-md-1'>
                            <div className = 'SAcontent-featureMobileDisplay'>
                                <div className = 'SAcontent-featureImg'>
                                <img  
                                    src = "https://res.cloudinary.com/karlstorage/image/upload/v1630487533/free-img/mic8edrmhxn85rggyofi.png" 
                                    alt = "login-display">
                                </img>
                                </div>
                            </div>
                            <div className = 'SAcontent-featureDescription'>
                                <h4>Submit Reports</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div>
                        </div>
                    </Col>
                </Row>

                <div className = 'SAContent-addFeature'>
                    <Link to = '/SAAdd-feature'><i className="fas fa-plus-circle"></i></Link>
                </div>
        </Container>
       </>
    )
}

export default SAContentFeature

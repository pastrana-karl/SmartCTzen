import React from 'react'
import './Features.css'
import Footer from '../../../components/Landing/Footer/Footer'
import { Container, Row, Col } from 'react-bootstrap'

function Features() {
    return (
        <>
            <Container className = 'citizenFeatures-container'>
                <div className = "citizenFeatures">
                    <h4>Features</h4>
                </div>
                <Row className = 'citizenFeatures-row'>
                    <Col className = 'citizenDisplay-visibility'>
                        <div className = 'col-md-10 offset-md-1'>
                            <div className = 'citizenFeature-display'>
                                <div className = 'citizenFeature-img'>
                                <img  
                                    src = "https://res.cloudinary.com/karlstorage/image/upload/v1630487534/free-img/bjcsaiqydxgy2qpgmm3p.png" 
                                    alt = "citizenFeature-display">
                                </img>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className = 'col-md-10 offset-md-1'>
                            <div className = 'citizenFeature-mobileDisplay'>
                                <div className = 'citizenFeature-img'>
                                <img  
                                    src = "https://res.cloudinary.com/karlstorage/image/upload/v1630487534/free-img/bjcsaiqydxgy2qpgmm3p.png" 
                                    alt = "citizenFeature-display">
                                </img>
                                </div>
                            </div>
                            <div className = 'citizenFeature-description'>
                                <h4>Create Proposals</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className = 'citizenFeatures-row'>
                    <Col>
                        <div className = 'col-md-10 offset-md-1'>
                            <div className = 'citizenFeature-mobileDisplay'>
                                <div className = 'citizenFeature-img'>
                                <img  
                                    src = "https://res.cloudinary.com/karlstorage/image/upload/v1630487533/free-img/povx7po4k1gnrmgvf70x.png" 
                                    alt = "citizenFeature-display">
                                </img>
                                </div>
                            </div>
                            <div className = 'citizenFeature-description'>
                                <h4>Monitor Projects</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div>
                        </div>
                    </Col>
                    <Col className = 'citizenDisplay-visibility'>
                        <div className = 'col-md-10 offset-md-1'>
                            <div className = 'citizenFeature-display'>
                                <div className = 'citizenFeature-img'>
                                <img  
                                    src = "https://res.cloudinary.com/karlstorage/image/upload/v1630487533/free-img/povx7po4k1gnrmgvf70x.png" 
                                    alt = "citizenFeature-display">
                                </img>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className = 'citizenFeatures-row'>
                    <Col className = 'citizenDisplay-visibility'>
                        <div className = 'col-md-10 offset-md-1'>
                            <div className = 'citizenFeature-display'>
                                <div className = 'citizenFeature-img'>
                                <img  
                                    src = "https://res.cloudinary.com/karlstorage/image/upload/v1630487533/free-img/mic8edrmhxn85rggyofi.png" 
                                    alt = "citizenFeature-display">
                                </img>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className = 'col-md-10 offset-md-1'>
                            <div className = 'citizenFeature-mobileDisplay'>
                                <div className = 'citizenFeature-img'>
                                <img  
                                    src = "https://res.cloudinary.com/karlstorage/image/upload/v1630487533/free-img/mic8edrmhxn85rggyofi.png" 
                                    alt = "citizenFeature-display">
                                </img>
                                </div>
                            </div>
                            <div className = 'citizenFeature-description'>
                                <h4>Submit Reports</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className = 'sticky-bottom'>
                <Footer />
            </div>
        </>
    )
}

export default Features

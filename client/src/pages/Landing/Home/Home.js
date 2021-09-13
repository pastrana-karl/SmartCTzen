import React from 'react'
import './Home.css'
import Footer from '../../../components/Landing/Footer/Footer'
import { Container, Row, Col } from 'react-bootstrap'

function Home() {
    return (
        <>
            <Container className = 'home-container'>
                <div className = 'home-banner'>
                    <h1>SmartCT</h1>
                    <p>Citizens x Technology</p>
                    <h1>Citizen Participatory Portal</h1>
                </div>

                <Row>
                    <div className = 'homeStats-visibility'>
                        <div>
                            <h2>140</h2>
                            <p>PARTNER COMMUNITIES</p>
                        </div> 
                        <div>
                            <h2>140</h2>
                            <p>USERS</p>
                        </div>
                        <div>
                            <h2>140</h2>
                            <p>MEMBERS</p>
                        </div> 
                    </div>

                    <Col className = 'homeStats-container'>
                        <div className = 'home-stats'>
                            <h2>140</h2>
                            <p>PARTNER COMMUNITIES</p>
                        </div>  
                    </Col>
                    <Col className = 'homeStats-container'>
                        <div className = 'home-stats'>
                            <h2>140</h2>
                            <p>USERS</p>
                        </div> 
                    </Col>
                    <Col className = 'homeStats-container'>
                        <div className = 'home-stats'>
                            <h2>140</h2>
                            <p>MEMBERS</p>
                        </div> 
                    </Col>
                </Row>

                <Row className = 'homeFeat-container'>
                    <div className = 'homeFeat-visibility'>
                        <i className="fas fa-clipboard-list"></i>
                        <div>
                            <h2>Create Proposals</h2>
                        </div>
                        <div>
                            <h2>Monitor Projects</h2>
                        </div>
                        <div>
                            <h2>Submit Reports</h2>
                        </div> 
                    </div>

                    <Col className = 'home-features'>
                        <div>
                            <i className="fas fa-clipboard-list"></i>
                            <h2>Create Proposals</h2>
                        </div>  
                    </Col>
                    <Col className = 'home-features'>
                        <div>
                            <i className="fas fa-clipboard-list"></i>
                            <h2>Monitor Projects</h2>
                        </div> 
                    </Col>
                    <Col className = 'home-features'>
                        <div>
                            <i className="fas fa-clipboard-list"></i>
                            <h2>Submit Reports</h2>
                        </div> 
                    </Col>
                </Row>

                <Row className = 'homeFeaturedSuperAdmin-mobile'>
                    <div className = 'col-md-10 offset-md-2' id = 'homePanel-superAdminFeature'>
                        <div className = 'homeContainer-superAdminImg'>
                            <div className = 'home-superAdminImg'>
                                <img src = 'https://res.cloudinary.com/karlstorage/image/upload/v1631243465/free-img/sasjbg0hekrbn7vlc5eo.jpg' alt ='superAdminFeature'></img>
                            </div>
                        </div>
                        <h2>Kris Libunao</h2>
                        <h3>Executive Director</h3>
                    </div>

                    <div className = 'homeFeaturedSA-textContainer'>
                        <p>" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "</p>
                    </div>
                </Row>

                <Row className = 'homeFeaturedSuperAdmin'>
                    <Col>
                        <div className = 'col-md-10 offset-md-2' id = 'homePanel-superAdminFeature'>
                            <div className = 'homeContainer-superAdminImg'>
                                <div className = 'home-superAdminImg'>
                                    <img src = 'https://res.cloudinary.com/karlstorage/image/upload/v1631243465/free-img/sasjbg0hekrbn7vlc5eo.jpg' alt ='superAdminFeature'></img>
                                </div>
                            </div>
                            <h2>Kris Libunao</h2>
                            <h3>Executive Director</h3>
                        </div>
                    </Col>
                    <Col>
                        <div className = 'homeFeaturedSA-textContainer'>
                            <p>" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "</p>
                        </div>
                    </Col>
                </Row>

                <div className = "homeAnnounemnets">
                    <h4>Announcements</h4>
                </div>

                <div className = 'col-md-10 offset-md-0' id = 'home-announcements'>
                    <div className = 'homeContainer-announcements'>
                        <h4>SmartCT: </h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>
            </Container>
            <div className = 'sticky-bottom'>
                <Footer />
            </div>
        </>
    )
}

export default Home

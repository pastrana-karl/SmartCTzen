import React, { useEffect, useState } from 'react'
import './Home.css'
import Footer from '../../../components/Landing/Footer/Footer'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';

function Home() {
    const [count, setCount] = useState("");
    const [community, setCommunity] = useState("");
    const [users, setUsers] = useState("");
    const [members, setMembers] = useState("");
    const [announcement, setAnnouncement] = useState([]);
    const [featuredM, setFeaturedM] = useState([]);
    const [feature, setFeature] = useState([]);

    useEffect(() => {
        const fetchFeatures = async () => {
            const res = await axios.get("/api/SAFeatures");
            setFeature(res.data);
        }
    
        fetchFeatures();
    }, []);

    useEffect(() => {
        const fetchCount = async () => {
            const res = await axios.get("/api/partners");
            if(res.data[0] !== undefined) {
                setCount(res.data[0]._id);
                setCommunity(res.data[0].communities);
                setUsers(res.data[0].users);
                setMembers(res.data[0].members);
            }
        }

        fetchCount();
    }, []);

    useEffect(() => {
        const fetchAnnouncement = async () => {
            const res = await axios.get("/api/saAnnounce");
            setAnnouncement(res.data);
        }

        fetchAnnouncement();
    }, []);

    useEffect(() => {
        const fetchFeaturedMember = async () => {
            const res = await axios.get("/api/mFeatured");
            setFeaturedM(res.data);
        }
    
        fetchFeaturedMember();
    }, []);

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
                            <h2>{ count && community !== null ? community : "N/A" }</h2>
                            <p>PARTNER COMMUNITIES</p>
                        </div> 
                        <div>
                            <h2>{ count && users !== null ? users : "N/A" }</h2>
                            <p>USERS</p>
                        </div>
                        <div>
                            <h2>{ count && members !== null ? members : "N/A" }</h2>
                            <p>MEMBERS</p>
                        </div> 
                    </div>

                    <Col className = 'homeStats-container'>
                        <div className = 'home-stats'>
                            <h2>{ count && community !== null ? community : "N/A" }</h2>
                            <p>PARTNER COMMUNITIES</p>
                        </div>  
                    </Col>
                    <Col className = 'homeStats-container'>
                        <div className = 'home-stats'>
                            <h2>{ count && users !== null ? users : "N/A" }</h2>
                            <p>USERS</p>
                        </div> 
                    </Col>
                    <Col className = 'homeStats-container'>
                        <div className = 'home-stats'>
                            <h2>{ count && members !== null ? members : "N/A" }</h2>
                            <p>MEMBERS</p>
                        </div> 
                    </Col>
                </Row>

                {announcement[0] !== undefined && 
                    <>
                        <div className = "homeAnnounemnets">
                            <h4>Announcements</h4>
                        </div>

                        <div className = 'col-md-10 offset-md-0' id = 'home-announcements'>
                            {announcement.map((message) => (
                                <div  key={message._id}>
                                    <h4>{message.username}: </h4>
                                    <p>{message.message}</p>
                                </div> )
                            )}
                        </div>
                    </>
                }

                {feature[0] !== undefined && 
                    <>
                        <div className = "homeFeatures">
                            <h4>Features</h4>
                        </div>

                        {feature.map((featTitle) => (
                            <Row className = 'homeFeat-container' key={featTitle._id}>
                                <div className = 'homeFeat-visibility'>
                                    <i className="fas fa-clipboard-list"></i>
                                    <div>
                                        <h2>{featTitle.title}</h2>
                                    </div>
                                </div>
                                    
                                {featTitle.position === "Left" ? (
                                    <>
                                        <Col className = 'home-features'>
                                            <div>
                                                <i className="fas fa-clipboard-list"></i>
                                            </div>  
                                        </Col>
                                        <Col className = 'home-features'>
                                            <div>
                                                <h2>{featTitle.title}</h2>
                                            </div>  
                                        </Col>
                                    </>
                                ) : (
                                    <>
                                        <Col className = 'home-features'>
                                            <div>
                                                <h2>{featTitle.title}</h2>
                                            </div>  
                                        </Col>
                                        <Col className = 'home-features'>
                                            <div>
                                                <i className="fas fa-clipboard-list"></i>
                                            </div>  
                                        </Col>
                                    </>
                                )}
                            </Row>
                        ))}
                    </>
                }

                {featuredM[0] !== undefined && 
                    <>
                        <div className = "homeCommunity">
                            <h4>Community</h4>
                        </div>

                        {featuredM.map((featured) => (
                            <div key={featured._id}>
                                <Row className = 'homeFeaturedSuperAdmin-mobile'>
                                    <div className = 'col-md-10 offset-md-2' id = 'homePanel-superAdminFeature'>
                                        <div className = 'homeContainer-superAdminImg'>
                                            <div className = 'home-superAdminImg'>
                                                <img src = {featured.profilePic} alt ='superAdminFeature'></img>
                                            </div>
                                        </div>
                                        <h2>{featured.name}</h2>
                                        <h3>{featured.position}</h3>
                                    </div>

                                    <div className = 'homeFeaturedSA-textContainer'>
                                        <p>" {featured.message} "</p>
                                    </div>
                                </Row>

                                <Row className = 'homeFeaturedSuperAdmin'>
                                    <Col>
                                        <div className = 'col-md-10 offset-md-2' id = 'homePanel-superAdminFeature'>
                                            <div className = 'homeContainer-superAdminImg'>
                                                <div className = 'home-superAdminImg'>
                                                    <img src = {featured.profilePic} alt ='superAdminFeature'></img>
                                                </div>
                                            </div>
                                            <h2>{featured.name}</h2>
                                            <h3>{featured.position}</h3>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className = 'homeFeaturedSA-textContainer'>
                                            <p>" {featured.message} "</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </>
                }
            </Container>
            <div className = 'sticky-bottom'>
                <Footer />
            </div>
        </>
    )
}

export default Home

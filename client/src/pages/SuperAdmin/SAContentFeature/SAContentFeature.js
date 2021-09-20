import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './SAContentFeature.css'

const SAContentFeature = () => {
    const [feature, setFeature] = useState([]);

    useEffect(() => {
        const fetchFeatures = async () => {
            const res = await axios.get("/api/SAFeatures");
            setFeature(res.data);
        }
    
        fetchFeatures();
    }, []);


    return (
       <>
        <Container className = 'SAcontent-featuresContainer'>
            <div className = 'SAcontent-feature'>
                <h1>Features</h1>
            </div>
            {feature.map((newFeature) => (
                <Row className = 'SAcontent-featureRow' key={newFeature._id}>
                    <Col className = 'SAcontent-featureDisplayVisibility'>
                        <div className = 'col-md-10 offset-md-1'>
                            <div className = 'SAcontent-featureDisplay'>
                                <div className = 'SAcontent-featureImg'>
                                <Link to = {`/SA-feature/${newFeature._id}`}>
                                    <img  
                                        src = {newFeature.featurePic} 
                                        alt = "login-display">
                                    </img>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className = 'col-md-10 offset-md-1'>
                            <div className = 'SAcontent-featureMobileDisplay'>
                                <div className = 'SAcontent-featureImg'>
                                <Link to = {`/SA-feature/${newFeature._id}`}>
                                    <img  
                                        src = {newFeature.featurePic} 
                                        alt = "login-display">
                                    </img>
                                </Link>
                                </div>
                            </div>
                            <div className = 'SAcontent-featureDescription'>
                                <h4><Link to = {`/SA-feature/${newFeature._id}`}>{newFeature.title}</Link></h4>
                                <p><Link to = {`/SA-feature/${newFeature._id}`}>{newFeature.contents}</Link></p>
                            </div>
                        </div>
                    </Col>
                </Row>
            ))}

            <div className = 'SAContent-addFeature'>
                <Link to = '/SAAdd-feature'><i className="fas fa-plus-circle"></i></Link>
            </div>
        </Container>
       </>
    )
}

export default SAContentFeature

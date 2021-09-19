import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import './Features.css'
import Footer from '../../../components/Landing/Footer/Footer'

function Features() {
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
            <Container className = 'citizenFeatures-container'>
                <div className = "citizenFeatures">
                    <h4>Features</h4>
                </div>
                {feature.map((newFeature) => (
                    <div key={newFeature._id}>
                        {newFeature.position === "Left" ? (
                            <Row className = 'citizenFeatures-row'>
                                <Col className = 'citizenDisplay-visibility'>
                                    <div className = 'col-md-10 offset-md-1'>
                                        <div className = 'citizenFeature-display'>
                                            <div className = 'citizenFeature-img'>
                                            <img  
                                                src = {newFeature.featurePic} 
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
                                                src = {newFeature.featurePic} 
                                                alt = "citizenFeature-display">
                                            </img>
                                            </div>
                                        </div>
                                        <div className = 'citizenFeature-description'>
                                            <h4>{newFeature.title}</h4>
                                            <p>{newFeature.contents}</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        ) : (
                            <Row className = 'citizenFeatures-row'>
                                <Col>
                                    <div className = 'col-md-10 offset-md-1'>
                                        <div className = 'citizenFeature-mobileDisplay'>
                                            <div className = 'citizenFeature-img'>
                                            <img  
                                                src = {newFeature.featurePic} 
                                                alt = "citizenFeature-display">
                                            </img>
                                            </div>
                                        </div>
                                        <div className = 'citizenFeature-description'>
                                            <h4>{newFeature.title}</h4>
                                            <p>{newFeature.contents}</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col className = 'citizenDisplay-visibility'>
                                    <div className = 'col-md-10 offset-md-1'>
                                        <div className = 'citizenFeature-display'>
                                            <div className = 'citizenFeature-img'>
                                            <img  
                                                src = {newFeature.featurePic} 
                                                alt = "citizenFeature-display">
                                            </img>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            )
                        }
                    </div>
                ))}
            </Container>
            <div className = 'sticky-bottom'>
                <Footer />
            </div>
        </>
    )
}

export default Features

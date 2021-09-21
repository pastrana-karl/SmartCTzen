import "./CitizenProjects.css";
import React, { Component } from 'react';
import { Col, Column, Row, Container } from 'react-bootstrap'
import { Link, NavLink } from "react-router-dom";

class CitizenProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
          count: 0
        }
    }

    add = () => {
        this.setState({count: this.state.count + 1})
    }


    render() {
        return (
            <div className='citizenprojects-container'>
                {/* <Row className='citizenprojects-catbar-container'>
                    <Col className='citizenprojects-catbar'>
                        <Link className='citizenprojects-catbar-item' to='/'>All</Link>
                        <Link className='citizenprojects-catbar-item' to='/'>Accomplished</Link>
                        <Link className='citizenprojects-catbar-item' to='/'>Ongoing</Link>
                    </Col>
                </Row> */}
                
                <Row  className='citizenprojects-short' onClick={this.add}>
                    <Col className='citizenprojects-shortinfo'>
                        <Row className='citizenprojects-shortinfo-auth'>
                            <h2>Lorem Ipusm</h2>
                            <Col className='citizenprojects-auth-container'>
                                <div className='citizenprojects-authimg-container'>
                                    <img src='https://media.istockphoto.com/photos/mameshibainu-picture-id950213314?s=612x612'/>
                                </div>
                                <div className='citizenprojects-auth'>John Doe</div>
                            </Col>
                        </Row>
                        <Row className='citizenprojects-shortinfo-desc'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis efficitur orci et interdum vulputate. 
                            Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut vel euismod leo. Ut varius a magna 
                            eu vulputate.
                        </Row>
                        <Row className='citizenprojects-shortinfo-status'>
                            <p>Status: Ongoing</p>
                            <div className='citizenprojects-shortinfo-status-views'>
                                <i class="fas fa-eye"/> <span>{this.state.count}</span>
                            </div>
                        </Row>
                    </Col>

                    <Col className='citizenprojects-shortinfo-img-container'>
                        <div className='citizenprojects-shortinfo-img-frame'>
                            <img src='https://th.bing.com/th/id/R.843ccf40456139bf82541b2c490a9a80?rik=4kQR3J%2bO4hbj5Q&riu=http%3a%2f%2fthumbs.dreamstime.com%2fz%2fasia-economic-growth-metro-manila-philippines-june-construction-workers-building-construction-site-front-ali-mall-33602935.jpg&ehk=ybE3aSz5wJG8oZCXUpfbl2%2b%2bb%2fUPNYRNySKXahn%2fL4k%3d&risl=&pid=ImgRaw&r=0'/>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default CitizenProjects;




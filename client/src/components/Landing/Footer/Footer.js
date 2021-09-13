import React from 'react'
import './Footer.css'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

function Footer() {
    return (
        <div className = 'footer'>
            <MDBFooter className="font-small pt-4 mt-4">
                <MDBContainer fluid className="text-center text-md-left">
                    <MDBRow>
                        <MDBCol className = 'desc-conatiner' md="6">
                            <p className = 'footer-desc'>
                                SmartCT is the first tech non-profit in the Philippines
                                and a pioneer in the smart cities field.<br/><br/>

                                We aim to create a movement that transforms the way
                                we think, do, and plan smart cities and communities
                                especially in developing countries such as the
                                Philippines trough a co-developed, citizen-centric
                                approach that puts openness and citizens at the heart
                                of development.
                            </p>
                        </MDBCol>
                        <MDBCol className = 'footer-links' md="6">
                            <ul>
                                <li className="list-unstyled">
                                <a href="#!"><i className="fab fa-facebook"></i> @SmartCTorg</a>
                                </li>
                                <li className="list-unstyled">
                                <a href="#!"><i className="fab fa-instagram"></i> smartct_org</a>
                                </li>
                            </ul>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                        &copy; {new Date().getFullYear()} Copyright: <a href="#!"> SmartCT </a>
                    </MDBContainer>
                </div>
            </MDBFooter>
      </div>
    )
}

export default Footer

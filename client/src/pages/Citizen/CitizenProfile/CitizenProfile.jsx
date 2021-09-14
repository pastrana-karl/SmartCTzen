import React from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CitizenProfile.css';

const CitizenProfile = () => (
    <>
        <Container className = 'citizenProfile-container'>
            <div className = 'citizenAccountImg-shadow'>
                <div className = 'citizenAccountImg'>
                    <img src= 'https://res.cloudinary.com/karlstorage/image/upload/v1631243465/free-img/sasjbg0hekrbn7vlc5eo.jpg' alt="" ></img>
                </div>
            </div>

            <div  className = 'col-md-10 offset-md-1' id = 'citizenProfile-body'>
                <div className = 'citizenProfile-name'>
                    <p>Juan Miguel Dela Cruz</p>
                </div>

                <div className = 'citizenProfile-statsDesktop'>
                    <Row>
                        <Col className = 'citizenProfile-Badge'>
                            <div className = 'citizenProfile-BadgeImg'>
                                    <img src="https://imgur.com/vxihw43.png" alt="FUCKSHIT"></img>
                            </div>
                            <h4>KEVIN</h4>
                        </Col>
                        <Col>
                            <Row>
                                <Col className = 'citizenProfile-Stats'>
                                    <h4>Proposals Created</h4>
                                    <p>1</p>
                                </Col>
                                <Col className = 'citizenProfile-Stats'>
                                    <h4>Approved Proposals</h4>
                                    <p>1</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col className = 'citizenProfile-Stats'>
                                    <h4>Verified Reports</h4>
                                    <p>1</p>
                                </Col>
                                <Col className = 'citizenProfile-Stats'>
                                    <h4>Voted Proposals</h4>
                                    <p>1</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>

                <div className = 'citizenProfile-statsMobile'>
                    <Col>
                        <Row className = 'citizenProfile-Badge'>
                            <Col>
                                <Row>
                                    <div className = 'citizenProfile-BadgeImg'>
                                        <img src="https://imgur.com/vxihw43.png" alt="FUCKSHIT"></img>
                                    </div>
                                </Row>
                                <Row><h4>KEVIN</h4></Row>
                            </Col>
                        </Row>
                        <Row className = 'citizenProfile-StatsMD'>
                                <Col>
                                    <Row><h4>Proposals Created</h4></Row>
                                    <Row><p>1</p></Row>
                                </Col>
                        </Row>
                        <Row className = 'citizenProfile-StatsMD'>
                            <Col>
                            <Row><h4>Approved Proposals</h4></Row>
                            <Row><p>1</p></Row>
                            </Col>
                            
                            
                        </Row>
                        <Row className = 'citizenProfile-StatsMD'>
                            <Col>
                                <Row><h4>Verified Reports</h4></Row>
                                <Row><p>1</p></Row>
                            </Col>
                        </Row>
                        <Row className = 'citizenProfile-StatsMD'>
                            <Col>
                                <Row><h4>Voted Proposals</h4></Row>
                                <Row><p>1</p></Row>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
            
            <Form className = 'citizenProfile-edit'>
                <h3>Personal Information</h3>

                <Form.Group controlId="email">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="lname"
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="fname"
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="mname"
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Suffix</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="sname"
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Sex</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="sex"
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Birth Date</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="birthday"
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Full Address</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="address"
                        autoComplete="off"
                    />
                </Form.Group>
                
                <h3>Login Credentials</h3>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="birthday"
                        autoComplete="off"
                    />
                </Form.Group>
              
                <Form.Group controlId="email">
                    <Form.Label>Password</Form.Label>
                        <Form.Control
                            className='citizenProfile-input'
                            type="text"
                            name="password"
                            autoComplete="off"
                        />               
                </Form.Group>
            </Form>

            <Link to = '/citizen-pass-update' className = 'citizenProfile-passwordUpdate'><i className="editIcon far fa-edit"></i></Link>

        </Container>
    </>
);


export default CitizenProfile;

// import React, { useState } from 'react';
// import { useFormik } from 'formik';

// import ProfileIconCard from '../../../UI/Cards/ProfileIconCard/ProfileIconCard';
// import ProfileInput from '../../../UI/Input/ProfileInput/ProfileInput';
// import SubmitButton from '../../../UI/Buttons/SubmitButton/SubmitButton';
// import CancelButton from '../../../UI/Buttons/CancelButton/CancelButton';

// import classes from './CitizenProfile.module.css';

// const initialValues = {
//     last_name: '',
//     first_name: '',
//     middle_name: '',
//     suffix: '',
//     sex: '',
//     birthdate: '',
//     address:'',
//     email: '',
//     password: ''
// }

// const onSubmit = values => {
//     console.log('Form data', values)
// };

// const CitizenProfile = () => {
//     const formik = useFormik({
//         initialValues,
//         onSubmit: values => {
//             console.log('Form values', values)
//         }
//     });


//     return (
//         <React.Fragment>
//             <CitizenLayout>
//                 <div className={classes.Content}>
//                     <div className={classes.CitizenProfile}>
//                         <ProfileIconCard />
                        
//                         <div className={classes.ButtonDiv}>
//                             <CitizenProfileButton>Proposals Created</CitizenProfileButton>
//                             <CitizenProfileButton>Approved Proposals</CitizenProfileButton>
//                             <CitizenProfileButton>Verified Reports</CitizenProfileButton>
//                             <CitizenProfileButton>Voted Proposals</CitizenProfileButton>
//                         </div>
//                     </div>
//                     <div>
//                         <h2>Personal Information</h2>
//                         <div>
//                             <form className={classes.CitizenProfileFormDiv}>
//                                 <div>
//                                     <div className={classes.InputDiv}>
//                                         <label htmlFor="last_name">Last Name</label>
//                                         <ProfileInput
//                                             placeholder="Last Name"
//                                             type="text"
//                                             id="last_name"
//                                             name="last_name"
//                                             readOnly="readOnly"
//                                             onChange={formik.handleChange}
//                                             value={formik.values.last_name}
//                                         />
//                                     </div>
//                                     <div className={classes.InputDiv}>
//                                         <label htmlFor="first_name">First Name</label>
//                                         <ProfileInput
//                                             placeholder="First Name"
//                                             type="text"
//                                             id="first_name"
//                                             name="first_name"
//                                             readOnly="readOnly"
//                                             onChange={formik.handleChange}
//                                             value={formik.values.first_name}
//                                         />
//                                     </div>
//                                     <div className={classes.InputDiv}>
//                                         <label htmlFor="middle_name">Middle Name</label>
//                                         <ProfileInput
//                                             placeholder="Middle Name"
//                                             type="text"
//                                             id="middle_name"
//                                             name="middle_name"
//                                             readOnly="readOnly"
//                                             onChange={formik.handleChange}
//                                             value={formik.values.middle_name}
//                                         />
//                                     </div>
//                                     <div className={classes.InputDiv}>
//                                         <label htmlFor="suffix">Suffix</label>
//                                         <ProfileInput
//                                             placeholder="Suffix"
//                                             type="text"
//                                             id="suffix"
//                                             name="suffix"
//                                             readOnly="readOnly"
//                                             onChange={formik.handleChange}
//                                             value={formik.values.suffix}
//                                         />
//                                     </div>
//                                     <div className={classes.InputDiv}>
//                                         <label htmlFor="sex">Sex</label>
//                                         <ProfileInput
//                                             placeholder="sex"
//                                             type="text"
//                                             id="sex"
//                                             name="sex"
//                                             readOnly="readOnly"
//                                             onChange={formik.handleChange}
//                                             value={formik.values.sex}
//                                         />
//                                     </div>
//                                     <div className={classes.InputDiv}>
//                                         <label htmlFor="birthdate">Birthdate</label>
//                                         <ProfileInput
//                                             placeholder="Birthdate"
//                                             type="text"
//                                             id="birthdate"
//                                             name="birthdate"
//                                             readOnly="readOnly"
//                                             onChange={formik.handleChange}
//                                             value={formik.values.birthdate}
//                                         />
//                                     </div>
//                                     <div className={classes.InputDiv}>
//                                         <label htmlFor="address">Full Addreses</label>
//                                         <ProfileInput
//                                             placeholder="Address"
//                                             type="text"
//                                             id="address"
//                                             name="address"
//                                             readOnly="readOnly"
//                                             onChange={formik.handleChange}
//                                             value={formik.values.address}
//                                         />
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>

//                         {/* LOGIN CREDENTIALS */}

//                         <h2>Login Credentials</h2>
//                         <div>
//                             <form onSubmit={formik.handleSubmit}>
//                                 <div className={classes.CitizenProfileFormDiv}>
//                                     <div className={classes.InputDiv}>
//                                         <label>Email Address</label>
//                                         <ProfileInput
//                                             placeholder="Email address"
//                                             type="email"
//                                             id="email"
//                                             name="email"
//                                             onChange={formik.handleChange}
//                                             value={formik.values.email}
//                                         />
//                                     </div>
//                                     <div className={classes.InputDiv}>
//                                         <label>Password</label>
//                                         <ProfileInput
//                                             placeholder="Password"
//                                             type="password"
//                                             id="password"
//                                             name="password"
//                                             onChange={formik.handleChange}
//                                             value={formik.values.password}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className={classes.ButtonDiv}>
//                                     <SubmitButton />
//                                     <CancelButton />
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </CitizenLayout>
//         </React.Fragment>
//     );
// }

// export default CitizenProfile;
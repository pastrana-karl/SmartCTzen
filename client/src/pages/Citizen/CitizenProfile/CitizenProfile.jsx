import React, { useContext, useState } from 'react';
import { Context } from '../../../context/Context';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CitizenProfile.css';

const CitizenProfile = () => {
    const { user, dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
    const [profilePic, setProfilePic] = useState("");

    console.log(user);
    const handleSubmit = async () => {

        dispatch({ type: "UPDATE_START" });
        const updateAccount = {
            profilePic,
            token: user.token,
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            data.append("upload_preset", "dev_prac");
            data.append("cloud_name", "karlstorage");
            try {
                const res = await axios.post("https://api.cloudinary.com/v1_1/karlstorage/image/upload", data);
                updateAccount.profilePic = res.data.secure_url;
            } catch (err) {
                console.log(err)
            }
        } else {
            setProfilePic("");
        }

        console.log(updateAccount.profilePic)

        try {
            const res = await axios.put("/api/citizen/" + user.data.user._id, updateAccount);
            console.log(res.data)
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            console.log(err);
            dispatch({ type: "UPDATE_FAILURE" })
        }
    }
    return(
        <Container className = 'citizenProfile-container'>
            <div className = 'citizenAccountImg-shadow'>
                <div className = 'citizenAccountImg'>
                    <img src= {file ? (URL.createObjectURL(file)) : `${user.data.user.profilePic}`} alt="" ></img>
                </div>
            </div>
            <div className="citizenProfile-changeImg">
                <Form.Label  htmlFor="iconImg"><i className="fas fa-image"></i></Form.Label>
                <i className="fas fa-upload" onClick = { handleSubmit }></i>
            </div>
            <div  className = 'col-md-10 offset-md-1' id = 'citizenProfile-body'>
                <div className = 'citizenProfile-name'> 
                     <p>{user.data.user.firstname + " " + user.data.user.middlename + " " + user.data.user.lastname}</p>
                 </div>
                 <div className = 'citizenProfile-statsDesktop'>
                    <Row>
                        <Col className = 'citizenProfile-Badge'>
                            <div className = 'citizenProfile-BadgeImg'>
                                    <img src='' alt="badge"></img> 
                             </div>
                            <h4>Badge</h4>
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
                                        <img src="https://imgur.com/vxihw43.png" alt="badge"></img>
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
                  <Form.Group>
                    <Form.Control
                        id="iconImg"
                        type="file"
                        name="citizenImg"
                        style = {{display: "none"}}
                        required
                        onChange = {(e) => setFile(e.target.files[0])}
                    />
                </Form.Group>
                
                <Form.Group controlId="email">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="lname"
                        autoComplete="off"
                        disabled
                        placeholder={user.data.user.lastname}
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="fname"
                        autoComplete="off"
                        disabled
                        placeholder={user.data.user.firstname}
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="mname"
                        autoComplete="off"
                        disabled
                        placeholder={user.data.user.middlename}
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Suffix</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="sname"
                        autoComplete="off"
                        disabled
                        placeholder={user.data.user.suffix}
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Sex</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="sex"
                        autoComplete="off"
                        disabled
                        placeholder={user.data.user.sex}
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Birth Date</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="birthday"
                        autoComplete="off"
                        disabled
                        placeholder={user.data.user.birthdate}
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Full Address</Form.Label>
                    <Form.Control
                        className='citizenProfile-input'
                        type="text"
                        name="address"
                        autoComplete="off"
                        disabled
                        placeholder={user.data.user.street +" "+user.data.user.barangay +" "+user.data.user.city +" "+user.data.user.region}
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
                        disabled
                        placeholder={user.data.user.email}
                    />
                </Form.Group>
            </Form>
            <Link to = '/citizen-pass-update' className = 'citizenProfile-passwordUpdate'><i className="editIcon far fa-edit"></i></Link>
        </Container>
    );
};

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

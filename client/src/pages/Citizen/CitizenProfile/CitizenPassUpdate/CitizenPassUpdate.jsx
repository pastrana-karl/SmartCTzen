import React, { useState, useContext } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { Context } from '../../../../context/Context';
import axios from 'axios';
import Swal from 'sweetalert2'
import './CitizenPassUpdate.css';

const CitizenPassUpdate = () => {
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { user, dispatch } = useContext(Context);

    const passwordUpdate = async (e) => {
        e.preventDefault();

        const checkPass = {
            userId: user.data.user._id,
            oldPassword,
        }

        console.log(checkPass)

        try {
            await axios.post("/api/citizen/password-citizenCompare", checkPass)

            dispatch({ type: "UPDATE_START" })
            const updateAccount = {
                userId: user.data.user._id,
                newPassword,
                token: user.token,
            }
            try {
                const res = await axios.put("/api/citizen/" + user.data.user._id, updateAccount);
                Swal.fire({
                    icon: 'success',
                    title: 'Update Successfull',
                    text: '',
                });
                
                Array.from(document.querySelectorAll("input")).forEach(
                    input => (input.value = ""),
                    setOldPassword(""),
                    setNewPassword(""),
                );

                setRedirect(true);
                
                dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
            } catch (err) {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: `${err.response.status}`,
                    text: `${err.response.data.message}`,
                });
                dispatch({ type: "UPDATE_FAILURE" })
            }
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: `${err.response.status}`,
                text: `${err.response.data}`,
            });
        }
    }

    return (
        <>
            { redirect && (<Redirect to = '/citizen-profile' />) }
            <Container className = 'citizenPassUpdate-container'>
                <Form className = 'citizenPassUpdate-edit' onSubmit = { passwordUpdate }>
                        <h3>Update Password</h3>

                        <Form.Group>
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                className='citizenPassUpdate-input'
                                type="password"
                                name="cpass"
                                autoComplete="off"
                                required
                                minLength="8"
                                onChange = {e => setOldPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                className='citizenPassUpdate-input'
                                type="password"
                                name="cpass"
                                autoComplete="off"
                                required
                                minLength="8"
                                onChange = {e => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        
                        <Row className='citizenPassUpdate-BtnContainer'>
                            <Col className='BtnContainerCenter'>
                                <Link to = '/citizen-profile' className = 'citizenPassUpdate-BtnCancel'>Cancel</Link>
                            </Col>
                            <Col className='BtnContainerCenter'>
                                <Button className = 'citizenPassUpdate-Btn' variant = "danger" type = 'submit'>Change</Button>
                            </Col>
                        </Row>
                    </Form>
            </Container>
        </>
    );
}
export default CitizenPassUpdate;
    
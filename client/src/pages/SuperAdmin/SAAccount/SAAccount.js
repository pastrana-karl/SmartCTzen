import React, { useState ,useContext } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { Context } from '../../../context/Context'
import axios from 'axios'
import Swal from 'sweetalert2'
import './SAAccount.css'

const SAAccount = () => {
    const { saUser, dispatch } = useContext(Context);
    const [username, setUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [oldEmail, setOldEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(username === "" && oldEmail === "" && newEmail === "") {
            Swal.fire({
                icon: 'error',
                title: 'No Input . . .',
                text: 'You need to input data to update your account!',
            });
        } else {
            dispatch({ type: "SAUPDATE_START" })
            const updateAccount = {
                userId: saUser.others._id,
                username,
                newEmail,
                token: saUser.token,
            }

            const res = await axios.get("/api/superAdmin/" + saUser.others._id);

            if(newEmail !== "") {
                if(oldEmail === "") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Old Email Required',
                        text: 'You need to input your old email!',
                    });
                    dispatch({ type: "SAUPDATE_FAILURE" })
                }

                if(oldEmail !== res.data.email) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Old Email Mismatch',
                        text: 'Your old email is wrong!',
                    });
                    dispatch({ type: "SAUPDATE_FAILURE" })
                }
            }

            if(updateAccount.username === "") {
                updateAccount.username = res.data.username;
            } else {
                updateAccount.username = username;
            }

            if(updateAccount.newEmail === "") {
                updateAccount.newEmail = res.data.email;
            } else {
                updateAccount.newEmail = newEmail;
            }

            try {
                await axios.put(`/api/saAnnounce/?user=${saUser.others.username}`, updateAccount);

                try {
                    const res = await axios.put("/api/superAdmin/" + saUser.others._id, updateAccount);
                    Swal.fire({
                        icon: 'success',
                        title: 'Update Successfull',
                        text: '',
                    });
                    
                    Array.from(document.querySelectorAll("input")).forEach(
                        input => (input.value = ""),
                        setUsername(""),
                        setOldEmail(""),
                        setNewEmail(""),
                    );
                    dispatch({ type: "SAUPDATE_SUCCESS", payload: res.data });
                } catch (err) {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: `${err.response.status}`,
                        text: `${err.response.data.message}`,
                    });
                    dispatch({ type: "SAUPDATE_FAILURE" })
                }

            } catch (err) {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: `${err.response.status}`,
                    text: `${err.response.data.message}`,
                });
            }
        }
    }

    const passwordUpdate = async (e) => {
        e.preventDefault();

        const checkPass = {
            userId: saUser.others._id,
            oldPassword,
        }

        try {
            await axios.post("/api/superAdmin/password-compare", checkPass)

            dispatch({ type: "SAUPDATE_START" })
            const updateAccount = {
                userId: saUser.others._id,
                newPassword,
                token: saUser.token,
            }
            try {
                const res = await axios.put("/api/superAdmin/" + saUser.others._id, updateAccount);
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
                dispatch({ type: "SAUPDATE_SUCCESS", payload: res.data });
            } catch (err) {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: `${err.response.status}`,
                    text: `${err.response.data.message}`,
                });
                dispatch({ type: "SAUPDATE_FAILURE" })
            }
        } catch (err) {
            console.log(err.response)
            Swal.fire({
                icon: 'error',
                title: `${err.response.status}`,
                text: `${err.response.data}`,
            });
        }
    }

    return (
        <>
            <Container>
                <div className = 'SAaccount'>
                    <h1>Account Settings</h1>
                </div>

                <div className = 'col-md-10 offset-md-1' id = 'SAaccount-body'>
                    <Form className = 'SAaccount-edit' onSubmit = { handleSubmit }>
                        <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder = {saUser.others.username}
                            onChange = {e => setUsername(e.target.value)}
                            autoComplete="off"
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Old Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="oldEmail"
                            onChange = {e => setOldEmail(e.target.value)}
                            autoComplete="off"
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>New Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="newEmail"
                            onChange = {e => setNewEmail(e.target.value)}
                            autoComplete="off"
                        />
                        </Form.Group>

                        <Button variant="danger" type="submit">
                            Update
                        </Button>
                        <Button className = 'SAaccount-reset' variant="outline-light" type="reset">
                            Clear
                        </Button>
                    </Form>
                </div>

                <div className = 'col-md-10 offset-md-1' id = 'SAaccount-body'>
                    <Form className = 'SAaccount-edit' onSubmit = { passwordUpdate }>
                        <Form.Group>
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="oldPassword"
                            required
                            onChange = {e => setOldPassword(e.target.value)}
                            autoComplete="off"
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="newPassword"
                            required
                            onChange = {e => setNewPassword(e.target.value)}
                            autoComplete="off"
                        />
                        </Form.Group>


                        <Button variant="danger" type="submit">
                            Update
                        </Button>
                        <Button className = 'SAaccount-reset' variant="outline-light" type="reset">
                            Clear
                        </Button>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default SAAccount

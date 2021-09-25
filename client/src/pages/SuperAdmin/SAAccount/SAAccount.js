import React, { useState ,useContext } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { Context } from '../../../context/Context'
import axios from 'axios'
import './SAAccount.css'

const SAAccount = () => {
    const { saUser, dispatch } = useContext(Context);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({ type: "SAUPDATE_START" })
        const updateAccount = {
            userId: saUser.others._id,
            username,
            email,
            password,
            token: saUser.token,
        }

        const res = await axios.get("/api/superAdmin/" + saUser.others._id);
        console.log(res.data)

        if(username !== "" || email !== "" || password !== "") {
            if(updateAccount.username === "") {
                updateAccount.username = res.data.username;
            } else {
                updateAccount.username = username;
            }
    
            if(updateAccount.email === "") {
                updateAccount.email = res.data.email;
            } else {
                updateAccount.email = email;
            }

            try {
                await axios.put(`/api/saAnnounce/?user=${saUser.others.username}`, updateAccount);

                try {
                    const res = await axios.put("/api/superAdmin/" + saUser.others._id, updateAccount);
                    Array.from(document.querySelectorAll("input")).forEach(
                        input => (input.value = "")
                      );
                    dispatch({ type: "SAUPDATE_SUCCESS", payload: res.data });
                } catch (err) {
                    console.log(err);
                    dispatch({ type: "SAUPDATE_FAILURE" })
                }

            } catch (err) {
                console.log(err);
            }
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
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder = {saUser.others.email}
                            onChange = {e => setEmail(e.target.value)}
                            autoComplete="off"
                        />
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            onChange = {e => setPassword(e.target.value)}
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
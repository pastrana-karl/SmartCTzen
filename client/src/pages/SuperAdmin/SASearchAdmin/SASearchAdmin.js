import React, { useEffect, useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { Link, Redirect, useLocation } from 'react-router-dom'
import './SASearchAdmin.css'
import axios from 'axios'

const SASearchAdmin = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [adminId, setAdminId] = useState("");
    const [email,setEmail] = useState("");
    const [loc,setLoc] = useState("");
    const [adminDP, setAdminDP] = useState("");
    const [redirect, setRedirect] = useState(false);


    useEffect(()=>{
        const getAdmin = async ()=>{
            const res = await axios.get("/api/admin/" + path);
            console.log(res)
            setAdminId(res.data._id);
            setEmail(res.data.email);
            setLoc(res.data.location);
            setAdminDP(res.data.profilePic);
        }
        getAdmin();
    },[path]);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await axios.delete(`/api/admin/${adminId}`);
            setRedirect(true);
        } catch (err) {
            console.log(err);
        }
    };
    
    console.log(adminId);

    return (
        <>
            { redirect && (<Redirect to = '/SAManage-admin' />) }
            <Container className = 'SAmanage-adminSearchContainer'>
                <div className = 'SAmanage-searchResultBody'>
                    <div className = 'searchResultImg-container'>
                        <div className = 'searchResultImg'>
                            {adminDP === "" ? <i style = {{fontSize: '100px', display: 'flex', justifyContent: 'center', marginTop: '25%'}} class="fas fa-user"></i> : <img src = {adminDP} alt = "" ></img>}
                        </div>
                    </div>
                    <Form className="SAmanage-result" onSubmit = {handleDelete}>
                        <Form.Group controlId="email">
                        <Form.Label>City or Municipality</Form.Label>
                        <Form.Control
                            className='SAmanage-searchResultInput'
                            defaultValue = {loc}
                            type="text"
                            name="email"
                            disabled
                        />
                        </Form.Group>

                        <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            className='SAmanage-searchResultInput'
                            defaultValue = {email}
                            type="text"
                            name="email"
                            disabled
                        />
                        </Form.Group>
                        
                        
                        <Button variant="danger" type="submit">
                            Remove
                        </Button>
                        <Link to = '/SAManage-admin' className = 'SAmanageLink'>Back</Link>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default SASearchAdmin

import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useLocation, Redirect } from 'react-router-dom'
import './SAAnnouncements.css'

const SAAnnouncements = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [user, setUser] = useState("");
    const [message, setMessage] = useState("");
    const [announceId, setAnnounceId] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        const getAnnouncement = async ()=>{
            const res = await axios.get("/api/saAnnounce/" + path);
            console.log(res)
            setAnnounceId(res.data._id);
            setUser(res.data.username);
            setMessage(res.data.message);
        }
        getAnnouncement();
    },[path]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.delete(`/api/saAnnounce/${announceId}`);
            Swal.fire('Delete Successful!', "You've successfully deleted an announcement post.", 'success').then(
                (result) => {
                  if (result.isConfirmed || result.isDismissed) {
                    setRedirect(true);
                   }
                }
            );
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: `${err.response.status}`,
                text: `${err.response.data.message}`,
            });
        }
    }

    return (
        <>
            { redirect && (<Redirect to = '/SAContent-home' />) }
            <div className = 'col-md-10 offset-md-1' id = 'SAAnouncement-body'>
                <Form className="SAContent-announcement" onSubmit = { handleSubmit }>
                    <h4>By: {user}</h4>
                    <h4>Message</h4>
                    <p>{message}</p>

                    <Button variant="danger" type="submit">
                        Delete
                    </Button>

                    <Link to = '/SAContent-home' className = 'SAannounceLink'>Back</Link>
                </Form>
            </div>
        </>
    )
}

export default SAAnnouncements

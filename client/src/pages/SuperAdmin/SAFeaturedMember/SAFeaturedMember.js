import React, { useEffect, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { Link, useLocation, Redirect } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import './SAFeaturedMember.css'

const SAFeaturedMember = () => {
    const [featuredM, setFeaturedM] = useState([]);
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const fetchFeaturedMember = async () => {
            const res = await axios.get("/api/mFeatured/" + path);
            setFeaturedM(res.data);
        }
    
        fetchFeaturedMember();
    }, [path]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.delete(`/api/mFeatured/${featuredM._id}`);
            Swal.fire('Delete Successful!', "You've successfully deleted a featured member post.", 'success').then(
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
            <Container>
                <div className = 'col-md-10 offset-md-1' id = 'SAFeaturedMemberDisplay-body'>
                    <div className = 'SFMD-container'>
                        <div className = 'SFMD-imgContainer'>
                            <img src= {featuredM.profilePic} alt=""></img>
                        </div>
                    </div>

                    <h2>{featuredM.name}</h2>
                    <h3>{featuredM.position}</h3>

                    <div className = 'SAFMD-message'>
                        <p>" {featuredM.message} "</p>
                    </div>

                    <Form className="SAContent-formFM" onSubmit = { handleSubmit }>

                        <Button variant="danger" type="submit">
                            Delete
                        </Button>

                        <Link to = '/SAContent-home' className = 'SAFMD-link'>Back</Link>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default SAFeaturedMember

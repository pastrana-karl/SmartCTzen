import React, { useState, useEffect } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import './SAEula.css'

const SAEula = () => {
    const [updateMode,setUpdateMode] = useState(false);
    const [agreement,setAgreement] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [eulaID, setEulaID] = useState("");

    useEffect(() => {
        const fetchEula = async () => {
            const res = await axios.get('/api/eula');
            setEulaID(res.data[0]._id);
            setAgreement(res.data[0].message);
        }

        fetchEula();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateEula = {
            message: agreement,
        }

        try {
            await axios.put('/api/eula/' + eulaID, updateEula);
            Swal.fire('Awesome!', "You've successfully updated the end-user license agreement!", 'success').then(
                (result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        setRedirect(true);
                    }
                }
            );
        } catch (err) {
            console.log(err.response)
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
                    <div className = 'SAcontent-addFeatureHeader'>
                        <h1>End-User License Agreement</h1>
                    </div>

                    <div className = 'col-md-10 offset-md-1' id = 'SAAddFeature-body'>
                        <Form  className="SAContent-featureAdd" onSubmit = { handleSubmit }>
                            <h4 style = {{textAlign:'center'}}>SmartCTzen End-User License Agreement</h4>
                            {updateMode ? (
                                <Form.Group>
                                    <Form.Control as="textarea" rows={20} value ={agreement && agreement} onChange = {(e) => setAgreement(e.target.value)} />
                                </Form.Group>
                            ) : (
                                <p style = {{textAlign: 'justify', whiteSpace: 'pre-wrap'}}>{agreement && agreement}</p>
                            )}

                            {updateMode === false && 
                                <div className="eulaEdit">
                                    <i className = "eulaIcon far fa-edit" onClick = {() => setUpdateMode(true)}></i>
                                </div>
                            }

                            {updateMode && 
                                <Button variant="danger" type="submit">
                                    Submit
                                </Button>
                            }

                            <Link to = '/SAContent-home' className = 'addFeatureLink'>Back</Link>
                        </Form>
                    </div>
                </Container>
        </>
    )
}

export default SAEula

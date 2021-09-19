import React, { useContext, useState, useEffect } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './SAContentHome.css'
import axios from 'axios'
import { Context } from '../../../context/Context'

const SAContentHome = () => {
  const [communities, setCommunities] = useState("");
  const [users, setUsers] = useState("");
  const [members, setMembers] = useState("");
  const [currentCom, setCurrentCom] = useState("");
  const [currentUsers, setCurrentUsers] = useState("");
  const [currentMembers, setCurrentMembers] = useState("");
  const [message, setMessage] = useState("");
  const { saUser } = useContext(Context);
  const [announcement, setAnnouncement] = useState([]);
  const [featuredM, setFeaturedM] = useState([]);

  useEffect(() => {
    const fetchAnnouncement = async () => {
        const res = await axios.get("/api/saAnnounce");
        setAnnouncement(res.data);
    }

    fetchAnnouncement();
  }, []);

  useEffect(() => {
    const fetchFeaturedMember = async () => {
        const res = await axios.get("/api/mFeatured");
        setFeaturedM(res.data);
    }

    fetchFeaturedMember();
  }, []);

  const handlePartners = async (e) => {
    e.preventDefault();

    const updateCount = {
      communities,
      users,
      members,
    };

    const res = await axios.get("/api/partners");
    console.log(res.data)
    setCurrentCom(res.data[0].communities)
    setCurrentUsers(res.data[0].members)
    setCurrentMembers(res.data[0].users)

    if(communities !== "" || users !== "" || members !== "") {
      if(currentCom === communities) {
        updateCount.communities = currentCom;
      } else if(updateCount.communities === "") {
        updateCount.communities = currentCom;
      } else {
        updateCount.communities = communities;
      }

      if(currentUsers === users) {
        updateCount.users = currentUsers;
      } else if(updateCount.users === "") {
        updateCount.users = currentUsers;
      } else {
        updateCount.users = users;
      }

      if(currentMembers === members) {
        updateCount.members = currentMembers;
      } else if(updateCount.members === "") {
        updateCount.members = currentMembers;
      } else {
        updateCount.members = members;
      }

      if(res.data[0]._id) {
        try {
          await axios.delete(`/api/partners/${res.data[0]._id}`);
        } catch (err) {
          console.log(err);
        }
      }

      try {
        await axios.post("/api/partners/update", updateCount);
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleAnnouncement = async (e) => {
    e.preventDefault();

    const newAnnouncement = {
      username: saUser.username,
      message,
    };

    if(message !== "") {
      try {
        await axios.post("/api/saAnnounce/announcement", newAnnouncement);
      } catch (err) {
        console.log(err)
      }
    }
  }

    return (
        <>
        <Container>
            <div className = 'SAcontent-header'>
                <h1>Home</h1>
            </div>

            <div className = "SAContent-partnersHeader">
              <h4>Partners</h4>
            </div>

            <div className = 'col-md-10 offset-md-1' id = 'SAHome-body'>
                <Form className="SAContent-home" onSubmit = { handlePartners }>
                  <Form.Group>
                    <Form.Label>Partner Communities</Form.Label>
                    <Form.Control
                      type="number"
                      name="communities"
                      autoComplete="off"
                      onChange = {e => setCommunities(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Users</Form.Label>
                    <Form.Control
                      type="number"
                      name="users"
                      autoComplete="off"
                      onChange = {e => setUsers(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Members</Form.Label>
                    <Form.Control
                      type="number"
                      name="members"
                      autoComplete="off"
                      onChange = {e => setMembers(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="danger" type="submit">
                    Submit
                  </Button>
                  <Button className = 'SAContent-reset' variant="outline-light" type="reset">
                    Clear
                  </Button>
                </Form>
            </div>

            <div className = "SAContent-homeAnnounemnets">
              <h4>Announcements</h4>
            </div>

            <div className = 'col-md-10 offset-md-1' id = 'SAContenthome-announcements'>
              {announcement.map((message) => (
                <div key={message._id}>
                  <h4><Link to = {`/SAContent-announcements/${message._id}`}>{message.username}: </Link></h4>
                  <p>{message.message}</p>
                </div> )
              )}
            </div>

            <div className = 'col-md-10 offset-md-1' id = 'SAHome-body'>
                <Form className="SAContent-home" onSubmit = { handleAnnouncement }>
                  <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      type="text"
                      name="announcement"
                      autoComplete="off"
                      onChange = {e => setMessage(e.target.value)}
                    />
                  </Form.Group>


                  <Button variant="danger" type="submit">
                    Submit
                  </Button>
                  <Button className = 'SAContent-reset' variant="outline-light" type="reset">
                    Clear
                  </Button>
                </Form>
            </div>

            <div className = "SAContent-featuredMembers">
              <h4>Featured Members</h4>
            </div>

            <div className = 'col-md-10 offset-md-1' id = 'SAHome-body'>
              {featuredM.map((featured) => (
                <div className = 'featuredMembers-imgContainer' key={featured._id}>
                    <div className = 'SAContent-homeImage'>
                      <Link to = {`/SAContent-FeaturedMember/${featured._id}`}>
                        <img src= {featured.profilePic} alt=""></img>
                      </Link>
                      
                      <h2><Link to = {`/SAContent-FeaturedMember/${featured._id}`}>{featured.name}</Link></h2>
                      <h3>{featured.position}</h3>
                    </div>
                </div>)
              )}

                <div className = 'SAContent-addFeaturedMember'>
                    <Link to = '/SAContent-addFeaturedMember'><i className="fas fa-plus-circle"></i></Link>
                </div>
            </div>
        </Container>
        </>
    )
}

export default SAContentHome

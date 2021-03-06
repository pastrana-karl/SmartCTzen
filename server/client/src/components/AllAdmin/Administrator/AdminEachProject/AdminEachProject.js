import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import CardHeader from "../../../UI/Cards/CardHeader/CardHeader";
import AdminLayout from "../AdminLayout/AdminLayout";
import classes from "./AdminEachProject.module.css";
import { Context } from "../../../../context/Context";
import SubmitButton from "../../../UI/Buttons/SubmitButton/SubmitButton";
import { useForm } from 'react-hook-form';

const AdminEachProject = () => {
  const [currentProject, setCurrentProject] = useState([]);
  const [followUps, setFollowUps] = useState();
  const { aUser } = useContext(Context);
  const [redirect, setRedirect] = useState(false);
  const params = useParams();
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    const findProject = async () => {
      const response = await fetch('/api/projects/' + params.id);
      const responseData = await response.json();
      setCurrentProject(responseData.data.project);
      setFollowUps(responseData.data.project.updates);
    }
    findProject();
  }, [params.id]);

  const accomplished = async () => {
    axios.put('/api/projects/update-projects/' + params.id, {
      status: 'Accomplished',
      userType: aUser.data.user.userType,
      username: aUser.data.user.username
    });
    setRedirect(true);
  };

  const ongoing = async () => {
    axios.put('/api/projects/update-projects/' + params.id, {
      status: 'Ongoing',
      userType: aUser.data.user.userType,
      username: aUser.data.user.username
    });
    setRedirect(true);
  };

  const onSubmit = async (data) => {
    
    const values = {
      user: aUser.data.user.username,
      message: data.updates
    }

    await axios.patch(`/api/projects/follow-ups/${currentProject._id}`, values)
      .catch(err => {
        console.log(err);
      });
      window.location.reload(false);
  }
  
  return (
    <>
    { redirect && (<Redirect to = '/admin-projects' />) }
    <AdminLayout>
      <div className={classes.AdminEachProject}>
        <CardHeader>
          <h2 className={classes.Text}>Projects</h2>
        </CardHeader>
      </div>
      <div className={classes.ProjectDiv}>
        <h3 className={classes.TitleText}>{currentProject.title}</h3>
        <div className={classes.ProjectInfo}>
          <div className={classes.DescriptionContainer}>
            <p className={classes.ParagraphText}>
             {currentProject.description}
            </p>
          </div>
          <div className={classes.Gallery}>
            <img src={currentProject.coverImage} className={classes.Image} alt =""/>
          </div>
        </div>
      </div>
      <div className={classes.ButtonDiv}>
          <button className={classes.Button} onClick={ongoing}>Ongoing</button>
          <button className={classes.Button} onClick={accomplished}>Accomplished</button>
          <Link to={'/admin-update-project/' + params.id}>
            <button className={classes.Button}>Update</button>
          </Link>
      </div>
      <div className={classes.AdminFollowUpFormDivContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.AdminFollowUpProjectFormDiv}>
            <input
              className={classes.Input}
              type='text'
              id='updates'
              name='updates'
              placeholder='Update this project?'
              ref={register({ maxLength: 500 })}
              required="true"
              />
              {errors.updates && <p className={classes.InputValidation}>500 characters only</p>}
            
            <div className={classes.ButtonContainer}>
              <SubmitButton />
            </div>
          </div>
        </form>
      </div>
      {
        followUps && followUps.map(followUps => (
          <div className={classes.AdminViewProjectFollowUp} key={followUps._id}>
            <div className={classes.AdminViewProjectFollowUpBody}>
              <div style={{fontWeight: 'bold'}}>Admin {followUps.user}</div>
              <div>Posted on: {followUps.date}</div>
              <div>{followUps.message}</div>
            </div>
          </div>
        ))
      }
    </AdminLayout>
    </>
  );
};

export default AdminEachProject;

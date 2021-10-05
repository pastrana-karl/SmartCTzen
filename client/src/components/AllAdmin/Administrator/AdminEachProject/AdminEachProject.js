import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import CardHeader from "../../../UI/Cards/CardHeader/CardHeader";
import AdminLayout from "../AdminLayout/AdminLayout";
import classes from "./AdminEachProject.module.css";
import { Context } from "../../../../context/Context";

const AdminEachProject = () => {
  const [currentProject, setCurrentProject] = useState([]);
  const [disable, setDisable] = useState(false);
  const { aUser } = useContext(Context);
  const [redirect, setRedirect] = useState(false);
  const params = useParams();

  useEffect(() => {
    const findProject = async () => {
      const response = await fetch('/api/projects/' + params.id);
      const responseData = await response.json();
      //console.log(responseData);
      setCurrentProject(responseData.data.project);
    }
    findProject();
  }, []);

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
            <img src={currentProject.coverImage} className={classes.Image} />
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
    </AdminLayout>
    </>
  );
};

export default AdminEachProject;

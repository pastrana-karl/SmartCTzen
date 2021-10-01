import React, { useState, useRef, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import axios from 'axios';
import CardHeader from "../../../UI/Cards/CardHeader/CardHeader";
import AdminLayout from "../AdminLayout/AdminLayout";
import classes from "./AdminEachProject.module.css";

const AdminEachProject = () => {
  const [currentProject, setCurrentProject] = useState([]);
  const [disable, setDisable] = useState(false);

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
    const response = await axios.patch('/api/projects/' + params.id, {
      status: 'Accomplished'
    });
    console.log(response);
  };

  const ongoing = async () => {
    const response = await axios.patch('/api/projects/' + params.id, {
      status: 'Ongoing'
    });
    console.log(response);
  };
  
  console.log(currentProject.coverImage);
  return (
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
          <button 
            className={classes.Button} 
            onClick={ongoing} 
            disabled={disable}
            >Ongoing</button>
          <button className={classes.Button} onClick={accomplished}>Accomplished</button>
          <Link to={'/admin-update-project/' + params.id}>
            <button className={classes.Button}>Update</button>
          </Link>
      </div>
    </AdminLayout>
  );
};

export default AdminEachProject;

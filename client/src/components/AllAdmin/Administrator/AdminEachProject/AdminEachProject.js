import React, { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import CardHeader from "../../../UI/Cards/CardHeader/CardHeader";
import AdminLayout from "../AdminLayout/AdminLayout";
import classes from "./AdminEachProject.module.css";

const AdminEachProject = () => {
  const [currentProject, setCurrentProject] = useState([]);

  const params = useParams();
  //console.log(params.id);

  useEffect(() => {
    const findProject = async () => {
      const response = await fetch('/api/projects/' + params.id);
      const responseData = await response.json();
      console.log(responseData);
      setCurrentProject(responseData.data.project);
    }
    findProject();
  }, []);

  //console.log(params);
  //console.log(currentProject);
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
          <p>Image Source</p>
        </div>
        <div className={classes.Gallery}>
            <h5>Image Placeholder</h5>
        </div>
      </div>
      <div className={classes.ButtonDiv}>
          <button className={classes.Button}>Accomplished</button>
          <button className={classes.Button}>Ongoing</button>
          <button className={classes.Button}>Update</button>
      </div>
    </AdminLayout>
  );
};

export default AdminEachProject;

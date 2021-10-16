import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import CardHeader from "../../../UI/Cards/CardHeader/CardHeader";
import AdminLayout from "../AdminLayout/AdminLayout";
import classes from "./AdminEachReport.module.css";
import { Context } from "../../../../context/Context";

const AdminEachReport = () => {
  const [currentReport, setCurrentReport] = useState([]);
  const params = useParams();
  const { aUser } = useContext(Context);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const findReport = async () => {
      const response = await fetch('/api/reports/' + params.id);
      const responseData = await response.json();
 
      setCurrentReport(responseData.data.report);
    }
    findReport();
  }, [params.id]);

  const confirmReport = async () => {
    await axios.patch('/api/reports/' + params.id, {
      status: 'Confirmed',
      userType: aUser.data.user.userType,
      username: aUser.data.user.username
    });
    setRedirect(true);
  };

  const cancelReport = async () => {
    await axios.patch('/api/reports/' + params.id, {
      status: 'Cancelled',
      userType: aUser.data.user.userType,
      username: aUser.data.user.username
    });
    setRedirect(true);
  }

  const resolveReport = async () => {
    await axios.patch('/api/reports/' + params.id, {
      status: 'Resolved',
      userType: aUser.data.user.userType,
      username: aUser.data.user.username
    });
    setRedirect(true);
  }

  const deleteReport = async () => {
    const admin = {
      username: aUser.data.user.username,
      userType: aUser.data.user.userType
    }
    await axios.delete('/api/reports/' + params.id, {data: admin});
    window.location.replace('/admin-reports');
  }

  return (
    <AdminLayout>
      { redirect && (<Redirect to = '/admin-reports' />) }
      <div className={classes.AdminEachReport}>
        <CardHeader>
          <h2 className={classes.Text}>Reports</h2>
        </CardHeader>
      </div>
      <div className={classes.ReportDiv}>
        <h3 className={classes.TitleText}>{currentReport.title}</h3>
        <div className={classes.ReportInfo}>
          <div className={classes.DescriptionContainer}>
            <p className={classes.ParagraphText}>
              {currentReport.description}
            </p>
          </div>
        </div>
        <div className={classes.Gallery}>
            <img src = {currentReport.images} alt = ''/>
        </div>
      </div>
      <div className={classes.ButtonDiv}>
          <button className={classes.Button} onClick={confirmReport}>Confirm</button>
          <button className={classes.Button} onClick={cancelReport}>Cancel</button>
          <button className={classes.Button} onClick={resolveReport}>Resolved</button>
          <button className={classes.Button} onClick={deleteReport}>Delete</button>
      </div>
    </AdminLayout>
  );
};

export default AdminEachReport;

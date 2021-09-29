import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardHeader from "../../../UI/Cards/CardHeader/CardHeader";
import AdminLayout from "../AdminLayout/AdminLayout";
import classes from "./AdminEachReport.module.css";

const AdminEachReport = () => {
  const [currentReport, setCurrentReport] = useState([]);
  const params = useParams();

  useEffect(() => {
    const findReport = async () => {
      const response = await fetch('/api/reports/' + params.id);
      const responseData = await response.json();
 
      setCurrentReport(responseData.data.report);
    }
    findReport();
  }, []);

  console.log(currentReport);
  return (
    <AdminLayout>
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
          <p>Image Source</p>
        </div>
        <div className={classes.Gallery}>
            <h5>Image Placeholder</h5>
        </div>
      </div>
      <div className={classes.ButtonDiv}>
          <button className={classes.Button}>Confirm</button>
          <button className={classes.Button}>Cancel</button>
          <button className={classes.Button}>Resolved</button>
      </div>
    </AdminLayout>
  );
};

export default AdminEachReport;

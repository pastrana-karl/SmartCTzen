import React from "react";
import CardHeader from "../../../UI/Cards/CardHeader/CardHeader";
import AdminLayout from "../AdminLayout/AdminLayout";
import classes from "./AdminEachReport.module.css";

const AdminEachReport = () => {
  return (
    <AdminLayout>
      <div className={classes.AdminEachReport}>
        <CardHeader>
          <h2 className={classes.Text}>Reports</h2>
        </CardHeader>
      </div>
      <div className={classes.ReportDiv}>
        <h3 className={classes.TitleText}>Report Title</h3>
        <div className={classes.ReportInfo}>
          <div className={classes.DescriptionContainer}>
            <p className={classes.ParagraphText}>
              Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
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

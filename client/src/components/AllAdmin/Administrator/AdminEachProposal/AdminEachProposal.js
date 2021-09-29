import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardHeader from "../../../UI/Cards/CardHeader/CardHeader";
import AdminLayout from "../AdminLayout/AdminLayout";
import classes from "./AdminEachProposal.module.css";

const AdminEachProposal = () => {
  const [currentProposal, setCurrentProposal] = useState([]);

  const params = useParams();

  useEffect(() => {
    const findProposal = async () => {
      const response = await fetch('/api/proposals/' + params.id);
      const responseData = await response.json();

      setCurrentProposal(responseData.data.proposal);
    }
    findProposal();
  }, []);

  return (
    <AdminLayout>
      <div className={classes.AdminEachProposals}>
        <CardHeader>
          <h2 className={classes.Text}>Proposals</h2>
        </CardHeader>
      </div>
      <div className={classes.ProposalDiv}>
        <h3 className={classes.TitleText}>{currentProposal.title}</h3>
        <div className={classes.ProposalInfo}>
          <div className={classes.DescriptionContainer}>
            <p className={classes.ParagraphText}>
              {currentProposal.description}
            </p>
          </div>
          <p>Image Source</p>
        </div>
        <div className={classes.Gallery}>
            <h5>Image Placeholder</h5>
        </div>
      </div>
      <div className={classes.ButtonDiv}>
          <button className={classes.Button}>Approve</button>
          <button className={classes.Button}>Reject</button>
      </div>
    </AdminLayout>
  );
};

export default AdminEachProposal;

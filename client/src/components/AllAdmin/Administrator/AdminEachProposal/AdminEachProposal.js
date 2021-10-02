import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  
  const approveProposal = () => {
    axios.patch('/api/proposals/' + params.id, {
      status: 'Approved'
    });
  };

  const rejectProposal = () => {
    axios.patch('/api/proposals/' + params.id, {
      status: 'Rejected'
    });
  };

  const deleteProposal = () => {
    axios.delete('/api/proposals/' + params.id);
    console.log('Delete')
  };

  //console.log(currentProposal.coverImage);

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
          <div className={classes.Gallery}>
            <img src={currentProposal.coverImage} className={classes.Image} />
          </div>
        </div>
      </div>
      <div className={classes.ButtonDiv}>
          <button className={classes.Button} onClick={approveProposal}>Approve</button>
          <button className={classes.Button} onClick={rejectProposal}>Reject</button>
          <button className={classes.Button} onClick={deleteProposal}>Delete</button>
      </div>
    </AdminLayout>
  );
};

export default AdminEachProposal;

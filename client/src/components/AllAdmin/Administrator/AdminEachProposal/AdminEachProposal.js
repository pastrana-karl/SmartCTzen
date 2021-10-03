import React, { useState, useEffect, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";
import { Context } from "../../../../context/Context";
import CardHeader from "../../../UI/Cards/CardHeader/CardHeader";
import AdminLayout from "../AdminLayout/AdminLayout";
import classes from "./AdminEachProposal.module.css";

const AdminEachProposal = () => {
  const [currentProposal, setCurrentProposal] = useState([]);
  const { aUser } = useContext(Context);
  const params = useParams();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const findProposal = async () => {
      const response = await fetch('/api/proposals/' + params.id);
      const responseData = await response.json();

      setCurrentProposal(responseData.data.proposal);
    }
    findProposal();
  }, []);
  
  const approveProposal = () => {
    axios.put('/api/proposals/' + params.id, {
      status: 'Approved',
      userType: aUser.data.user.userType,
      username: aUser.data.user.username
    });

    setRedirect(true);
  };

  const rejectProposal = () => {
    axios.put('/api/proposals/' + params.id, {
      status: 'Rejected',
      userType: aUser.data.user.userType,
      username: aUser.data.user.username
    });

    setRedirect(true);
  };

  const deleteProposal = () => {
    const admin = {
      username: aUser.data.user.username,
      usertype: aUser.data.user.userType
    }

    axios.delete('/api/proposals/' + params.id, {data: admin});

    window.location.replace('/admin-proposals');
  };

  const upVoteProposal = () => {
    axios.patch('/api/proposals/upVote/' + params.id);
    console.log('Upvote');
  }

  const downVoteProposals = () => {
    axios.patch('/api/proposals/downVote/' + params.id);
    console.log('Downvote');
  }
  //console.log(currentProposal.coverImage);

  return (
    <AdminLayout>
      { redirect && (<Redirect to = '/admin-proposals' />) }
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
      <div className={classes.VoteDiv}>
        <button className={classes.VoteButton} onClick={upVoteProposal}>Upvote</button>
        <button className={classes.VoteButton} onClick={downVoteProposals}>Downvote</button>
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

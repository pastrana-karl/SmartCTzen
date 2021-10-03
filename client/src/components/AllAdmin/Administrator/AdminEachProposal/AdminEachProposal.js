import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "axios";

import SubmitButton from "../../../UI/Buttons/SubmitButton/SubmitButton";
import CardHeader from "../../../UI/Cards/CardHeader/CardHeader";
import AdminLayout from "../AdminLayout/AdminLayout";
import { Context } from '../../../../context/Context';
import classes from "./AdminEachProposal.module.css";


const AdminEachProposal = () => {
  const [currentProposal, setCurrentProposal] = useState([]);
  const [comments, setComments] = useState();
  const { aUser } = useContext(Context);
  const { register, handleSubmit, errors } = useForm();

  const params = useParams();
  
  //console.log(aUser.data.user.username);
  
  useEffect(() => {
    const findProposal = async () => {
      const response = await fetch('/api/proposals/' + params.id);
      const responseData = await response.json();

      setCurrentProposal(responseData.data.proposal);
      setComments(responseData.data.proposal.comments);
    }
    findProposal();
  }, []);

  //console.log(currentProposal);
  //console.log(comments);
  
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

  const onSubmit = async (data) => {
    console.log(data);
    
    const values = {
      user: aUser.data.user.username,
      message: data.comment
    }

    console.log(values)

    const res = await axios.patch(`/api/proposals/comments/${currentProposal._id}`, values)
      .catch(err => {
        console.log(err);
      });
      //setComments(responseData.data.proposal.comments);
      //console.log(values);
      window.location.reload(false);
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
      <div className={classes.AdminCommentFormDivContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.AdminCommentProposalFormDiv}>
            <input
              className={classes.Input}
              type='text'
              id='comment'
              name='comment'
              placeholder='Comment your thoughts...'
              ref={register({ maxLength: 500 })}
              />
              {errors.comment && <p className={classes.InputValidation}>500 characters only</p>}
            
            <div className={classes.ButtonContainer}>
              <SubmitButton />
            </div>
          </div>
        </form>
      </div>
      {
        comments && comments.map(comment => (
          <div className={classes.AdminViewProposalComment} key={comment._id}>
            <div className={classes.AdminViewProposalCommentDivImg}>
              <img src='https://imgur.com/urZfDtd.png'/>
            </div>
            <div className={classes.AdminViewProposalCommentBody}>
              <div>{comment.user}</div>
              <div>{comment.message}</div>
            </div>
          </div>
        ))
      }
    </AdminLayout>
  );
};

export default AdminEachProposal;

import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import axios from "axios";

import SubmitButton from "../../../UI/Buttons/SubmitButton/SubmitButton";
import CardHeader from "../../../UI/Cards/CardHeader/CardHeader";
import AdminLayout from "../AdminLayout/AdminLayout";
import { Context } from "../../../../context/Context";
import classes from "./AdminEachProposal.module.css";

const AdminEachProposal = () => {
  const [currentProposal, setCurrentProposal] = useState([]);
  const [upvoteClick, setupvoteClick] = useState(false);
  const [downvoteClick, setdownvoteClick] = useState(false);
  const [comments, setComments] = useState();
  const [redirect, setRedirect] = useState(false);
  const { aUser } = useContext(Context);
  const { register, handleSubmit, errors } = useForm();

  const params = useParams();

  //console.log(aUser.data.user.username);

  useEffect(() => {
    const findProposal = async () => {
      const response = await fetch("/api/proposals/" + params.id);
      const responseData = await response.json();

      setCurrentProposal(responseData.data.proposal);
      setComments(responseData.data.proposal.comments);
    };
    findProposal();
  }, []);

  useEffect(() => {
    if (currentProposal.upvote) {
      const checkUser = async () => {
        // Get UserId from context
        const userId = aUser.data.user._id;
        // Get UserId from upvotes Array (get currentProposal ID, get vote array)
        const test = userId;
        //Compare the two
        const upvotes = currentProposal.upvote;
        const result = upvotes.includes(test);

        // console.log(result); // true
        //if true Disable Button
        if (result == true) {
          setupvoteClick(true);
        } else {
          setupvoteClick(false);
        }
      };
      checkUser();
    }
  }, [currentProposal]);

  useEffect(() => {
    if (currentProposal.downvote) {
      const checkUser = async () => {
        // Get UserId from context
        const userId = aUser.data.user._id;
        // Get UserId from upvotes Array (get currentProposal ID, get vote array)
        const test = userId;
        //Compare the two
        const upvotes = currentProposal.downvote;
        const result = upvotes.includes(test);

        // console.log(result); // true
        //if true Disable Button
        if (result == true) {
          setdownvoteClick(true);
        } else {
          setdownvoteClick(false);
        }
      };
      checkUser();
    }
  }, [currentProposal]);


  const approveProposal = () => {
    axios.put("/api/proposals/" + params.id, {
      status: "Approved",
      userType: aUser.data.user.userType,
      username: aUser.data.user.username,
    });

    setRedirect(true);
  };

  const rejectProposal = () => {
    axios.put("/api/proposals/" + params.id, {
      status: "Rejected",
      userType: aUser.data.user.userType,
      username: aUser.data.user.username,
    });

    setRedirect(true);
  };

  const deleteProposal = () => {
    const admin = {
      username: aUser.data.user.username,
      usertype: aUser.data.user.userType,
    };

    axios.delete("/api/proposals/" + params.id, { data: admin });

    window.location.replace("/admin-proposals");
  };

  const upVoteProposal = async (proposalId, userId) => {
    setupvoteClick(true);
    const removeVote = {
      downvote: userId,
    };

    try {
      if (downvoteClick) {
        const response = await axios
          .patch(`/api/proposals/removeDownVote/${proposalId}`, removeVote)
          .then((result) => {
            if (result) {
              console.log(result);
              window.location.reload(false);
            }
          });

        const addUserVote = {
          upvote: userId,
        };

        const response2 = await axios
          .patch(`/api/proposals/upVote/${proposalId}`, addUserVote)
          .then((result) => {
            if (result) {
              console.log(result);
              window.location.reload(false);
            }
          });
      } else {
        const addUserVote = {
          upvote: userId,
        };

        const response = await axios
          .patch(`/api/proposals/upVote/${proposalId}`, addUserVote)
          .then((result) => {
            if (result) {
              console.log(result);
              window.location.reload(false);
            }
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const downVoteProposal = async (proposalId, userId) => {
    setdownvoteClick(true);
    const removeVote = {
      upvote: userId
    }

    try {
      if (upvoteClick) {
        const response = await axios
          .patch(`/api/proposals/removeUpVote/${proposalId}`, removeVote)
          .then((result) => {
            if (result) {
              console.log(result);
              window.location.reload(false);
            }
          }
        );

        const addUserVote = {
          downvote: userId
        }

        const response2 = await axios
          .patch(`/api/proposals/downVote/${proposalId}`, addUserVote)
          .then((result) => {
            if (result) {
              console.log(result);
              window.location.reload(false);
            }
          });
      }
    } catch (err) {
      console.log(err);
    }

  };

  const onSubmit = async (data) => {
    console.log(data);

    const values = {
      user: aUser.data.user.username,
      message: data.comment,
    };

    console.log(values);

    const res = await axios
      .patch(`/api/proposals/comments/${currentProposal._id}`, values)
      .catch((err) => {
        console.log(err);
      });
    //setComments(responseData.data.proposal.comments);
    //console.log(values);
    window.location.reload(false);
  };
  //console.log(currentProposal.coverImage);

  console.log(params.id);
  console.log(aUser);

  return (
    <AdminLayout>
      {redirect && <Redirect to="/admin-proposals" />}
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
        <button className={classes.VoteButton} onClick={() => upVoteProposal(params.id, aUser.data.user._id)} disabled={upvoteClick}>
          Upvote
        </button>
        <button className={classes.VoteButton} onClick={() => downVoteProposal(params.id, aUser.data.user._id)} disabled={downvoteClick}>
          Downvote
        </button>
      </div>
      <div className={classes.ButtonDiv}>
        <button className={classes.Button} onClick={approveProposal}>
          Approve
        </button>
        <button className={classes.Button} onClick={rejectProposal}>
          Reject
        </button>
        <button className={classes.Button} onClick={deleteProposal}>
          Delete
        </button>
      </div>
      <div className={classes.AdminCommentFormDivContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.AdminCommentProposalFormDiv}>
            <input
              className={classes.Input}
              type="text"
              id="comment"
              name="comment"
              placeholder="Comment your thoughts..."
              ref={register({ maxLength: 500 })}
            />
            {errors.comment && (
              <p className={classes.InputValidation}>500 characters only</p>
            )}

            <div className={classes.ButtonContainer}>
              <SubmitButton />
            </div>
          </div>
        </form>
      </div>
      {comments &&
        comments.map((comment) => (
          <div className={classes.AdminViewProposalComment} key={comment._id}>
            <div className={classes.AdminViewProposalCommentDivImg}>
              <img src="https://imgur.com/urZfDtd.png" />
            </div>
            <div className={classes.AdminViewProposalCommentBody}>
              <div>{comment.user}</div>
              <div>{comment.message}</div>
            </div>
          </div>
        ))}
    </AdminLayout>
  );
};

export default AdminEachProposal;

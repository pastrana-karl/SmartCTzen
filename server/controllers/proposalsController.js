const Proposals = require('../models/proposalsModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const diffCollection = require("../models/diffCollectionModel");

exports.getApprovedProposals = async (req, res, next) => {
    if(req.query.user) {
        try {
            const acceptedProposals = await Proposals.find({ userName: req.query.user, status: 'Approved' });
            res.status(200).json(acceptedProposals);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        try {
            const acceptedProposals = await Proposals.find({status: "Approved"});
            res.status(200).json(acceptedProposals);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

exports.getRejectedProposals = async (req, res, next) => {
    try {
        const rejectedProposals = await Proposals.find({status: "Rejected"});
        res.status(200).json(rejectedProposals);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getOwnProposals = async (req, res, next) => {
    console.log(req.params.id);
    try {
        const ownProposals = await Proposals.find({userId:req.params.id});
        res.status(200).json(ownProposals);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAllProposals = catchAsync(async (req, res, next) => {
    //This does not return all the reports this requires a query when getting all reports there is no query
    //Execute query
    // const features = new APIFeatures(Proposals.find(), req.query)
    // .filter()
    // .sort()
    // .limit();

    // const proposals = await features.query;

    // //Send response
    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         proposals
    //     }
    // });

    
    if(req.query.user) {
        try {
            const proposals = await Proposals.find({ userName:req.query.user });
            res.status(200).json({
                status: 'success',
                data: {
                    proposals
                }
            });
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        try {
            const proposals = await Proposals.find();
            res.status(200).json({
                status: 'success',
                data: {
                    proposals
                }
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
});

exports.getProposal = catchAsync(async (req, res, next) => {
    const proposal = await Proposals.findById(req.params.id);

    if (!proposal) {
        return next(new AppError('No proposal found with that ID', 404));
    }

    res.status(200).json({
        status: 'Success',
        data: {
            proposal
        } 
    });
});

exports.postProposal = catchAsync(async (req, res, next) => {
    const newProposal = await Proposals.create(req.body);

    const newProposalHist = new diffCollection({
        collectionName: 'Proposal',
        userType: newProposal.userType,
        user: newProposal.userName,
        reason: 'Created new proposal',
    });

    await newProposalHist.save()

    const proposal = await newProposal.save();
    res.status(201).json({
        status: 'success',
        data: {
            proposal
        }
    });
});

exports.updateProposal = catchAsync(async (req, res, next) => {
    const proposal = await Proposals.findByIdAndUpdate(req.params.id, {status: req.body.status}, {
        new: true,
        runValidators: true
    });

    if(proposal.status === 'Approved') {
        const newProposalHist = new diffCollection({
            collectionName: 'Proposal',
            userType: req.body.userType,
            user: req.body.username,
            reason: 'Approved a proposal entitled "' + proposal.title + '"',
        });
    
        await newProposalHist.save()
    }

    if(proposal.status === 'Rejected') {
        const newProposalHist = new diffCollection({
            collectionName: 'Proposal',
            userType: req.body.userType,
            user: req.body.username,
            reason: 'Rejected a proposal entitled "' + proposal.title + '"',
        });
    
        await newProposalHist.save()
    }

    res.status(200).json({
        status: "success",
        data: {
            proposal
        }
    });
});

// exports.upVote = catchAsync(async (req, res, next) => {
//     const proposal = await Proposals.findByIdAndUpdate(
//         req.params.id
//         ,{
//             $push:{
//                 // upvote: JSON.stringify(req.body)
//                 upvote: req.body
//             }
//         },{
//             new:true,
//             runValidators:true
//         },function(err,model){
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log("Vote Recieved! ID: ", model)
//             }});

//     res.status(200).json({
//         status: "success",
//         data: {
//             proposal
//         }
//     });
// });

        
exports.testroute = catchAsync(async (req, res, next)=>{
    // const tes = Proposals.
    // findOne({userId:''}),
    // populate('userId').exec(function(err,story){
    //     if(err)
    //         return handleError(err);
    //     console.log("User is, ", story)
    // });
    // res.status(200).json({
    //     status: 'Success',
    //     data: {
    //         tes
    //     } 
    // });
});

exports.upVote = catchAsync(async (req, res, next) => {
    // const proposal = await Proposals.findByIdAndUpdate(
    //     req.params.id
    //     ,{
    //         $push:{
    //             upvote: JSON.stringify(req.body)
               
    //         }
    //     },{
    //         new:true,
    //         runValidators:true
    //     },function(err,model){
    //         if(err){
    //             console.log(err);
    //         }else{
    //             console.log("Vote Received! ID: ", model)
    //         }});

    // res.status(200).json({
    //     status: "success",
    //     data: {
    //         proposal
    //     }
    // });
    const proposalid = req.params.id;
    const upvote = req.body.upvote;

    const result = Proposals.findByIdAndUpdate(proposalid,{$push:{upvote:upvote}},function(err,proposal){
        if(err){
            console.log(err)
        }else{
            res.status(200).json({
                status: "success",
                data:{
                    proposal
                }
            })
        }
    })
    // res.status(200).json({
    //     status: "success",
    //     data:{
    //         upvote
    //     }
    // });
});

exports.downVote = catchAsync(async (req, res, next) => {
//     try{
//     const proposal = await Proposals.findByIdAndUpdate(
//         req.params.id
//         ,{$push:{
//                 "downvote": JSON.stringify(req.body)
//             }
//         },{
//             new:true,
//             runValidators:true
//         },function(err,model){
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log("Vote Recieved! ID: ", model)
//             }});

//     res.status(200).json({
//         status: "success",
//         data: {
//             proposal
//         }
//     });
//     }catch(err){
//         console.log(err);
//     }
    const proposalid = req.params.id;
    const downvote = req.body.downvote;

    const result = Proposals.findByIdAndUpdate(proposalid,{$push:{downvote:downvote}},function(err,proposal){
        if(err){
            console.log(err)
        }else{
            res.status(200).json({
                status: "success",
                data:{
                    proposal
                }
            })
        }
    })
});

exports.removeUpVote = catchAsync(async (req, res, next) => {
    const upvote = await Proposals.findByIdAndUpdate(
        req.params.id
        ,{
            $pull:{
                upvote:req.body.upvote
            }
        },{
            new:true,
            runValidators:true
        },function(err,model){
            if(err){
                console.log(err);
            }else{
                console.log("Vote Removed ", model)
            }});

    res.status(200).json({
        status: "success",
        data: {
            upvote
        }
    });
});

exports.removeDownVote = catchAsync(async (req, res, next) => {
    const downvote = await Proposals.findByIdAndUpdate(
        req.params.id
        ,{
            $pull:{
                downvote: req.body.downvote
            }
        },{
            new:true,
            runValidators:true
        },function(err,model){
            if(err){
                console.log(err);
            }else{
                console.log("Vote Removed ", model)
            }});

    res.status(200).json({
        status: "success",
        data: {
            downvote
        }
    });
});



exports.postProposalComment = catchAsync(async (req, res, next) => {
    const proposal = req.params.id;
    const comment = {
        user:req.body.user,
        message:req.body.message
    }

    console.log(comment);

    const result = Proposals.findByIdAndUpdate(
        proposal,
        { $push : { comments : [
            comment
        ]}},
        { new:true },
        function(err,proposal){
            if(err){
                console.log(err);
            }else{
                res.status(200).json({
                    status: "success",
                    data: {
                        proposal
                    }
                })
            }
        }
    )
});

// exports.approveProposal = catchAsync(async (req, res, next) => {
//     const proposal = await Proposals.findById(req.params.id);

//     const approveProposal = Proposals.findByIdAndUpdate(
//         req.params.id, {
//             status: proposal.status['Approved']
//         }
//     );

//     res.status(200).json({
//         data: {
//             approveProposal
//         }
//     });
// });

exports.patchProposal = catchAsync(async (req, res, next) => {
    const proposal = await Proposals.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: "success",
        data: {
            proposal
        }
    });
});

exports.deleteProposal = catchAsync(async (req, res, next) => {
    const proposal = await Proposals.findById(req.params.id);

    const adminDeleteProposal = new diffCollection({
        collectionName: 'Proposal',
        userType: req.body.usertype,
        user: req.body.username,
        reason: 'Deleted a proposal entitled : "' + proposal.title + '"',
    });
    
    await adminDeleteProposal.save();

    await proposal.delete();

    if (!proposal) {
        return next(new AppError('No proposal found with that ID', 404));
    }

    res.status(204).json({
        status: "success",
        data: null
    });
});

exports.getTopProposals = catchAsync(async (req, res, next) => {
    try {
        const topProposals = await Proposals.find({status: 'Pending'}).sort({'upvote': -1}).limit(10);
        res.status(200).json(topProposals);
    } catch (err) {
        res.status(500).json(err);
    }
});
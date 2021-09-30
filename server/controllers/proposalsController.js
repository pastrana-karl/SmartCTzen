const Proposals = require('../models/proposalsModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const diffCollection = require("../models/diffCollectionModel");

exports.getApprovedProposals = async (req, res, next) => {
    try {
        const acceptedProposals = await Proposals.find({status: "approved"});
        res.status(200).json(acceptedProposals);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getRejectedProposals = async (req, res, next) => {
    try {
        const rejectedProposals = await Proposals.find({status: "rejected"});
        res.status(200).json(rejectedProposals);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAllProposals = catchAsync(async (req, res, next) => {
    //Execute query
    const features = new APIFeatures(Proposals.find(), req.query)
    .filter()
    .sort()
    .limit();

    const proposals = await features.query;

    //Send response
    res.status(200).json({
        status: 'success',
        data: {
            proposals
        }
    });
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

    await newProposalHist.save();

    res.status(201).json({
        status: 'success',
        data: {
            newProposal
        }
    });
});

exports.updateProposal = catchAsync(async (req, res, next) => {
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

exports.upVote = catchAsync(async (req, res, next) => {
    const proposal = await Proposals.findByIdAndUpdate(
        req.params.id
        ,{ 
            // $push:{
                upvote: JSON.stringify(req.body)
            // }
        },{
            new:true,
            runValidators:true
        },function(err,model){
            if(err){
                console.log(err)
            }else{
                console.log("Vote Recieved! ",model)
            }
        });

        res.status(200).json({
            status: "success",
            data:{
                proposal
            }
        });
});

exports.testroute = catchAsync(async (req, res, next)=>{
    const tes = "this is a test";
    res.status(200).json({
        status: 'Success',
        data: {
            tes
        } 
    });
});

// exports.downVote = catchAsync(async (req, res, next) => {
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
// });

// exports.removeUpVote = catchAsync(async (req, res, next) => {
//     const upvote = await Proposals.findByIdAndUpdate(
//         req.params.id
//         ,{
//             $pull:{
//                 upvote: JSON.stringify(req.body)
//             }
//         },{
//             new:true,
//             runValidators:true
//         },function(err,model){
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log("Vote Removed ", model)
//             }});

//     res.status(200).json({
//         status: "success",
//         data: {
//             upvote
//         }
//     });
// });

// exports.removeDownVote = catchAsync(async (req, res, next) => {
//     const downvote = await Proposals.findByIdAndUpdate(
//         req.params.id
//         ,{
//             $pull:{
//                 downvote: JSON.stringify(req.body)
//             }
//         },{
//             new:true,
//             runValidators:true
//         },function(err,model){
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log("Vote Removed ", model)
//             }});

//     res.status(200).json({
//         status: "success",
//         data: {
//             downvote
//         }
//     });
// });

exports.approveProposal = catchAsync(async (req, res, next) => {
    const proposal = await Proposals.findById(req.params.id);

    const approveProposal = Proposals.findByIdAndUpdate(
        req.params.id, {
            status: proposal.status['Approved']
        }
    );

    res.status(200).json({
        data: {
            approveProposal
        }
    });
});

exports.deleteProposal = catchAsync(async (req, res, next) => {
    const proposal = await Proposals.findByIdAndDelete(req.params.id);

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
        const topProposals = await Proposals.find({status: 'pending'}).sort({'upvote': -1}).limit(10);
        res.status(200).json(topProposals);
    } catch (err) {
        res.status(500).json(err);
    }
});
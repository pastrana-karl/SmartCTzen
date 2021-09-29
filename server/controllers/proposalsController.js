const diffHistory = require('mongoose-audit-trail');

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

    console.log(newProposal)

    const newProposalHist = new diffCollection({
        collectionName: 'Proposal',
        user: newProposal.userName,
        reason: 'Created new proposal',
    })

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
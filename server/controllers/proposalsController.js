const diffHistory = require('mongoose-audit-trail');

const Proposals = require('../models/proposalsModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.aliasApprovedProposals = (req, res, next) => {
    req.query.status = "approved";
};

exports.aliasRejectedProposals = (req, res, next) => {
    req.query.status = "rejected";
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

exports.getProposalHistory = catchAsync(async (req, res, next) => {
    const proposal = await Proposals.findById(req.params.id);
    
    await diffHistory.getHistories("Proposals", proposal._id, ["mobile"], 
        function (err, histories) {
            if (err) {
                return next(err);
            }
            res.status(200).json({
                status: 'success',
                data: {
                    histories
                }
            });
        })
});
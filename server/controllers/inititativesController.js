const Initiatives = require('../models/inititativesModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.aliasApprovedInitiatives = (req, res, next) => {
    req.query.status = "approved";
};

exports.aliasRejectedInitiatives = (req, res, next) => {
    req.query.status = "rejected";
};

exports.getAllInitiatives = catchAsync(async (req, res, next) => {
    //Execute query
    const features = new APIFeatures(Initiatives.find(), req.query)
    .filter()
    .sort()
    .limit();

    const initiatives = await features.query;

    //Send response
    res.status(200).json({
        status: 'success',
        data: {
            initiatives
        }
    });
});

exports.getInitiative = catchAsync(async (req, res, next) => {
    const initiative = await Initiatives.findById(req.params.id);

    if (!initiative) {
        return next(new AppError('No initiative found with that ID', 404));
    }

    res.status(200).json({
        status: 'Success',
        data: {
            initiative
        } 
    });
});

exports.postInitiaves = catchAsync(async (req, res, next) => {
    const newInitiative = await Initiatives.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            initiative: newInitiative
        }
    });
});

exports.updateInitiative = catchAsync(async (req, res, next) => {
    const initiative = await Initiatives.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: "success",
        data: {
            initiative
        }
    });
});

exports.deleteInitiative = catchAsync(async (req, res, next) => {
    const initiative = await Initiatives.findByIdAndDelete(req.params.id);

    if (!initiative) {
        return next(new AppError('No initiative found with that ID', 404));
    }

    res.status(204).json({
        status: "success",
        data: null
    });
});

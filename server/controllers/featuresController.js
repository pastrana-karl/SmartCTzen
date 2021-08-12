const Features = require("../models/featuresModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllFeatures = catchAsync(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Features.find(), req.query)
    .sort();

    const features = await apiFeatures.query;

    res.status(200).json({
        status: "success",
        data: {
            features
        }
    });
});

exports.postFeature = catchAsync(async (req, res, next) => {
    const newFeature = await Features.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            newFeature
        }
    });
});

exports.patchFeature = catchAsync(async (req, res, next) => {
    const feature = await Features.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: "success",
        data: {
            feature
        }
    });
});

exports.deleteFeature = catchAsync(async (req, res, next) => {
    const feature = await Features.findByIdAndDelete(req.params.id);

    if (!feature) {
        return next(new AppError('No feature found with that ID', 404));
    }

    res.status(204).json({
        status: "success",
        data: null
    });
});
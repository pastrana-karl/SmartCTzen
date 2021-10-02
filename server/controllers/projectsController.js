const diffHistory = require("mongoose-audit-trail");

const Projects = require("../models/projectsModel");
const diffCollection = require("../models/diffCollectionModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAccomplishedProjects = catchAsync(async (req, res, next) => {
    try {
        const accomplishedProjects = await Projects.find({status: 'Accomplished'});
        res.status(200).json(accomplishedProjects);
    } catch (err) {
        res.status(500).json(err);
    }
});

exports.getOngoingProjects = catchAsync(async (req, res, next) => {
    try {
        const ongoingProjects = await Projects.find({status: 'Ongoing'});
        res.status(200).json(ongoingProjects);
    } catch (err) {
        res.status(500).json(err);
    }
});

exports.getAllProjects = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Projects.find(), req.query)
    .filter()
    .sort()
    .limit();

    const projects = await features.query;

    res.status(200).json({
        status: "success",
        data: {
            projects
        }
    });
});

exports.getProject = catchAsync(async (req, res, next) => {
    const project = await Projects.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            project
        }
    });
});

exports.postProjects = catchAsync(async (req, res, next) => {
    const newProject = await Projects.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            newProject
        }
    });
});

exports.updateViewCount = catchAsync(async (req, res) => {
    try {
        const viewCounter = await Projects.findById(req.params.id);
        const countUpdate = viewCounter.viewCount + 1;

        const project = await Projects.findByIdAndUpdate(req.params.id,{
            $set:  { "viewCount": countUpdate }
        })

        res.status(200).json(project);
    } catch (err) {
        res.status(500).json(err);
    }
});

exports.patchProject = catchAsync(async (req, res, next) => {
    const project = await Projects.findByIdAndUpdate(req.params.id, req.body.viewCount, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: "success",
        data: {
            project
        }
    });
});


exports.deleteProject = catchAsync(async (req, res, next) => {
    const project = await Projects.findByIdAndDelete(req.params.id);

    if (!project) {
        return next(new AppError('No project found with that ID', 404));
    }

    res.status(204).json({
        status: "success",
        data: null
    });
});
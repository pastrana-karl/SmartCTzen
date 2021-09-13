const diffHistory = require("mongoose-audit-trail");

const Projects = require("../models/projectsModel");
const diffCollection = require("../models/diffCollectionModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.aliasAccomplishedProjects = (req, res, next) => {
    req.query.status = "accomplished";
};

exports.aliasOngoingProjects = (req, res, next) => {
    req.query.status = "ongoing";
};

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
            project: newProject
        }
    });
});

exports.patchProject = catchAsync(async (req, res, next) => {
    const project = await Projects.findByIdAndUpdate(req.params.id, req.body, {
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

exports.getProjectHistory = catchAsync(async (req, res, next) => {
    const project = await Projects.findById(req.params.id);
    
    await diffHistory.getHistories("Projects", project._id, ["mobile"], 
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

exports.saveProjectHistory = catchAsync(async (req, res, next) => {
    const project = await Projects.findById(req.params.id);
    
    await diffHistory.getHistories("Projects", project._id, ["mobile"], 
        function (err, histories) {
            if (err) {
                return next(err);
            }
           
            const newProjectHistory = diffCollection.create(histories);

            res.status(201).json({
                status: 'success',
                data: {
                    newProjectHistory
                }
            });
        })
});
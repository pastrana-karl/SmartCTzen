const diffHistory = require("mongoose-audit-trail");

const Reports = require("../models/reportsModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllReports = catchAsync(async (req, res, next) => {

    const features = new APIFeatures(Reports.find(), req.query)
    .filter()
    .sort()
    .limit();

    //Execute query
    const reports = await features.query;

    res.status(200).json({
        status: 'success',
        data: {
            reports
        }
    });
});

//GET a Report
exports.getReport = catchAsync(async (req, res, next) => {
    const report = await Reports.findById(req.params.id);
    
    res.status(200).json({
        status: 'success',
        data: {
            report
        }
    });
});

exports.postReports = catchAsync(async (req, res, next) => {
    const newReport = await Reports.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            report: newReport
        }
    });
});

exports.patchReports = catchAsync(async (req, res, next) => {
    const report = await Reports.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: "success",
        data: {
            report
        }
    });
});

exports.deleteReports = catchAsync(async (req, res, next) => {
    const report = await Reports.findByIdAndDelete(req.params.id);

    if (!report) {
        return next(new AppError('No report found with that ID', 404));
    }

    res.status(204).json({
        status: "success",
        data: null
    });
});

exports.countReportsTotal = catchAsync(async (req, res, next) => {
    const countReports = await Reports.aggregate([
        {
            $match: { status: 'Approved' }
        },
        {
            $group: {
                _id: null,
                reportsTotal: { $sum: 1 }
            }
        },
        {
            $sort: {}
        }
    ]);

    res.status(200).json({
        status: "success",
        data: {
            countReports
        }
    });
});

exports.getReportsHistory = catchAsync(async (req, res, next) => {
    const report = await Reports.findById(req.params.id);

    await diffHistory.getHistories("Reports", report._id, ["mobile"],
        function (err,histories) {
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
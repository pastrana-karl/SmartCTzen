const Reports = require("../models/reportsModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const diffCollection = require("../models/diffCollectionModel");

exports.getAllReports = catchAsync(async (req, res, next) => {
    if(req.query.user) {
        try {
            const reports = await Reports.find({ userName:req.query.user });
            res.status(200).json(reports);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        try {
            const reports = await Reports.find();
            res.status(200).json(reports);
        } catch (err) {
            res.status(500).json(err);
        }
    }
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

    console.log(newReport)

    const newReportHist = new diffCollection({
        collectionName: 'Reports',
        userType: newReport.userType,
        user: newReport.userName,
        reason: 'Created new Report',
    });
    
    await newReportHist.save();

    res.status(201).json({
        status: 'success',
        data: {
            report: newReport
        }
    });
});

exports.patchReports = catchAsync(async (req, res, next) => {
    const report = await Reports.findByIdAndUpdate(req.params.id, {status:req.body.status}, {
        new: true,
        runValidators: true
    });

    if(report.status === "Confirmed") {
        const newReportHist = new diffCollection({
            collectionName: 'Reports',
            userType: req.body.userType,
            user: req.body.username,
            reason: 'Confirmed a report entitled : "' + report.title + '"',
        });
        
        await newReportHist.save();
    }

    if(report.status === "Cancelled") {
        const newReportHist = new diffCollection({
            collectionName: 'Reports',
            userType: req.body.userType,
            user: req.body.username,
            reason: 'Cancelled a report entitled : "' + report.title + '"',
        });
        
        await newReportHist.save();
    }

    if(report.status === "Resolved") {
        const newReportHist = new diffCollection({
            collectionName: 'Reports',
            userType: req.body.userType,
            user: req.body.username,
            reason: 'Resolved a report entitled : "' + report.title + '"',
        });
        
        await newReportHist.save();
    }

    res.status(200).json({
        status: "success",
        data: {
            report
        }
    });
});

exports.deleteReports = catchAsync(async (req, res, next) => {
    const report = await Reports.findById(req.params.id);

    const newReportHist = new diffCollection({
        collectionName: 'Reports',
        userType: req.body.userType,
        user: req.body.username,
        reason: 'Deleted a report entitled : "' + report.title + '"',
    });
    
    await newReportHist.save();

    await report.delete();

    if (!report) {
        return next(new AppError('No report found with that ID', 404));
    }

    res.status(204).json({
        status: "success",
        data: null
    });
});

exports.getResolvedReports = catchAsync(async (req, res, next) => {
    try {
        const resolvedReports = await Reports.find({status: 'Resolved'});
        res.status(200).json(resolvedReports);
    } catch (err) {
        res.status(500).json(err);
    }
});

exports.getConfirmedReports = catchAsync(async (req, res, next) => {
    if(req.query.user) {
        try {
            const confirmedReports = await Reports.find({ userName: req.query.user, status: 'Confirmed' });
            res.status(200).json(confirmedReports);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        try {
            const confirmedReports = await Reports.find({status: 'Confirmed'});
            res.status(200).json(confirmedReports);
        } catch (err) {
            res.status(500).json(err);
        }
    }
});

exports.getCancelledReports = catchAsync(async (req, res, next) => {
    try {
        const cancelledReports = await Reports.find({status: 'Cancelled'});
        res.status(200).json(cancelledReports);
    } catch (err) {
        res.status(500).json(err);
    }
});

// exports.countReportsTotal = catchAsync(async (req, res, next) => {
//     const countReports = await Reports.aggregate([
//         {
//             $match: { status: 'Approved' }
//         },
//         {
//             $group: {
//                 _id: null,
//                 reportsTotal: { $sum: 1 }
//             }
//         },
//         {
//             $sort: {}
//         }
//     ]);

//     res.status(200).json({
//         status: "success",
//         data: {
//             countReports
//         }
//     });
// });
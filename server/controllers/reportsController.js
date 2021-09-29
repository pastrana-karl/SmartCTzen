const Reports = require("../models/reportsModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllReports = catchAsync(async (req, res, next) => {
    //This does not return all the reports this requires a query when getting all reports there is no query
    // const features = new APIFeatures(Reports.find(), req.query)
    // .filter()
    // .sort()
    // .limit();

    // //Execute query
    // const reports = await features.query;

    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         reports
    //     }
    // });

    try {
        const reports = await Reports.find();
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json(err);
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

exports.getResolvedReports = catchAsync(async (req, res, next) => {
    try {
        const resolvedReports = await Reports.find({status: 'Resolved'});
        res.status(200).json(resolvedReports);
    } catch (err) {
        res.status(500).json(err);
    }
});

exports.getConfirmedReports = catchAsync(async (req, res, next) => {
    try {
        const confirmedReports = await Reports.find({status: 'Confirmed'});
        res.status(200).json(confirmedReports);
    } catch (err) {
        res.status(500).json(err);
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
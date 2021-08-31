const Home = require('../models/homeModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// exports.getAllHome = catchAsync(async (req, res, next) => {
//     const home = await Home.find();

//     res.status(200)
// });
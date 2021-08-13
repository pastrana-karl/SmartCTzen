const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const initiativesRoutes = require("./routes/initiativesRoutes");
const projectsRoutes = require("./routes/projectsRoutes");
const reportsRoutes = require("./routes/reportsRoutes");
const featuresRoutes = require("./routes/featuresRoutes");
const citizenRoutes = require("./routes/citizenRoutes");
const adminRoutes = require("./routes/adminRoutes");
const superAdminRoutes = require("./routes/superAdminRoutes");

const app = express();

//Middleware
app.use(express.urlencoded({extended: false})); //parse body coming from a form
app.use(express.json()); //application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Acces-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}



//Insert home and features
app.use('/api', initiativesRoutes);
app.use('/api', projectsRoutes);
app.use('/api', reportsRoutes);
app.use('/api', featuresRoutes);
app.use('/api/citizen', citizenRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/superAdmin', superAdminRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
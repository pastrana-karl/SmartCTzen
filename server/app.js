const express = require('express');
const morgan = require('morgan');
const upload = require('./utils/multer')
const cloudinary = require('./utils/cloudinary')
const fs = require('fs');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const proposalsRoutes = require("./routes/proposalsRoutes");
const projectsRoutes = require("./routes/projectsRoutes");
const reportsRoutes = require("./routes/reportsRoutes");
const featuresRoutes = require("./routes/featuresRoutes");
const citizenRoutes = require("./routes/citizenRoutes");
const adminRoutes = require("./routes/adminRoutes");
const superAdminRoutes = require("./routes/superAdminRoutes");
const conversationsRoutes = require('./routes/conversationsRoutes');
const messagesRoutes = require('./routes/messagesRoutes');

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

app.use('/api/upload-images', upload.array('image'), async (req, res) => {

    const uploader = async (path) => await cloudinary.uploads(path, 'Images');
  
    if (req.method === 'POST') {
      const urls = []
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path)
        urls.push(newPath)
        fs.unlinkSync(path)
      }
  
      res.status(200).json({
        message: 'images uploaded successfully',
        data: urls
      })
  
    } else {
      res.status(405).json({
        err: `${req.method} method not allowed`
      })
    }
  })

//Insert home and features
app.use('/api', proposalsRoutes);
app.use('/api', projectsRoutes);
app.use('/api', reportsRoutes);
app.use('/api', featuresRoutes);
app.use('/api/citizen', citizenRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/superAdmin', superAdminRoutes);
app.use('/api', conversationsRoutes);
app.use('/api', messagesRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
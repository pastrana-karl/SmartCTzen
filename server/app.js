const express = require('express');
const morgan = require('morgan');
const upload = require('./utils/multer')
const cloudinary = require('./utils/cloudinary')
const fs = require('fs');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const proposalsRoutes = require("./routes/proposalsRoutes");
const projectsRoutes = require("./routes/projectsRoutes");
const reportsRoutes = require("./routes/reportsRoutes");
const featuresRoutes = require("./routes/featuresRoutes");
const citizenRoutes = require("./routes/citizenRoutes");
const adminRoutes = require("./routes/adminRoutes");
const superAdminRoutes = require("./routes/superAdminRoutes");
const PartnersHomeRoutes = require("./routes/PartnersHomeRoutes");
const SAAnnouncement = require("./routes/SAAnnouncementRoutes");
const SAFeaturedMember = require("./routes/SAFeaturedMemberRoutes");
const SAFeatures = require("./routes/SAFeaturesRoutes");
const conversationsRoutes = require('./routes/conversationsRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const EulaRoutes = require('./routes/EulaRoutes')

const app = express();

//Set Security HTTP Headers
app.use(helmet());

//Middleware
app.use(express.urlencoded({extended: false})); //parse body coming from a form
app.use(express.json()); //application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Acces-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//Development Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against cross-site scripting (XSS) attacks
app.use(xss());

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
app.use('/api/partners', PartnersHomeRoutes);
app.use('/api/saAnnounce', SAAnnouncement);
app.use('/api/mFeatured', SAFeaturedMember);
app.use('/api/eula', EulaRoutes);
app.use('/api/SAFeatures', SAFeatures);
app.use('/api', conversationsRoutes);
app.use('/api', messagesRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
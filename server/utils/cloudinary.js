const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

dotenv.config({ path: "../config.env" });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.secure_url
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}
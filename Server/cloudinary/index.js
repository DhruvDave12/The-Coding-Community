const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Here we have configured our cloudinary environment setup our account.
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// Here we are creating storage.
const storage = new CloudinaryStorage({
    cloudinary,
    // folder in cloudinary where we need to store images
    params: {
        folder: 'TheCodingCommunity',
        allowedFormats: ['jpeg', 'png', 'jpg', 'jfif', 'mp4', 'mkv'],
        resource_type: 'auto'
    }
    
});


module.exports = {
    cloudinary,
    storage,
}
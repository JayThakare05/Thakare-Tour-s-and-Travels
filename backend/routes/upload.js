const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Log config on startup to verify credentials loaded
console.log('☁️  Cloudinary cloud_name:', process.env.CLOUDINARY_CLOUD_NAME);

// Multer storage — params as async function (required for newer versions)
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'thakare-tours/cars',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 600, crop: 'limit', quality: 'auto' }],
    public_id: `car_${Date.now()}`,
  }),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
});

// POST /api/upload — upload car image
router.post('/', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('❌ Upload error:', err.message);
      return res.status(500).json({ error: err.message || 'Upload failed' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    console.log('✅ Uploaded to Cloudinary:', req.file.path);
    res.json({
      success: true,
      url: req.file.path,          // Cloudinary secure HTTPS URL
      public_id: req.file.filename,
    });
  });
});

module.exports = router;

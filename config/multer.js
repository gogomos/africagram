const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');
const path = require('path');

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    // Log debug information
    console.log('File type check failed:', file.originalname);
    console.log('Expected file types:', filetypes);
    console.log('Received mimetype:', file.mimetype);
    
    // Pass an Error object to the callback
    cb(new Error('Error: Images Only!'));
  }
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'africagram',
    format: async (req, file) => {
      const extname = path.extname(file.originalname).toLowerCase().replace('.', '');
      return extname; // supports promises as well
    },
    public_id: (req, file) => `${Date.now()}_${file.originalname}`
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // Limit file size to 5MB
}).single('image'); // 'image' is the name of the form field

module.exports = upload;

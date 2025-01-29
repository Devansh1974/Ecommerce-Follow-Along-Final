const fs = require('fs');
const multer = require('multer');
const path = require('path');

// Ensure uploads folder exists
const uploadFolderPath = path.join(__dirname, './uploads');
if (!fs.existsSync(uploadFolderPath)) {
  fs.mkdirSync(uploadFolderPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('here', req);

    cb(null, uploadFolderPath);  // Use dynamically created folder path
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.png');
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

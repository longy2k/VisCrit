const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

// Create a storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) { // Check if the folder exists
      fs.mkdirSync(uploadDir, { recursive: true }); // If it doesn't, create it
    }
    cb(null, uploadDir); // Set the destination folder where the uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name as the file name for the uploaded file
  }
});

// Create an instance of the multer middleware with the storage engine
const upload = multer({ storage: storage });

// Route for handling file uploads
app.post('/api/upload', upload.single('file'), (req, res) => {
  console.log(req.file); // The uploaded file object will be available in the req.file property
  res.json({ path: req.file.path }); // Send the file name in JSON format
});

// Route for serving the uploaded files
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Route for handling GET requests for uploaded files
app.get('/api/upload', (req, res) => {
  // Read the contents of the uploads directory
  fs.readdir('uploads', (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    // Get the most recently modified file
    let mostRecentFile = '';
    let mostRecentTime = 0;
    files.forEach(file => {
      const filePath = path.join('uploads', file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        if (stats.mtimeMs > mostRecentTime) {
          mostRecentFile = file;
          mostRecentTime = stats.mtimeMs;
        }
        if (file === files[files.length - 1]) {
          // Send the file data as a JSON response
          res.json({ path: `uploads/${mostRecentFile}` });
        }
      });
    });
  });
});

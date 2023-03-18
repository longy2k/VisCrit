const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

// Create a storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadDir = 'uploads';
    if (file.mimetype === 'image/png') {
      uploadDir = 'uploads/img';
    } else if (file.mimetype === 'application/json') {
      uploadDir = 'uploads/json';
    }
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});


// Create an instance of the multer middleware with the storage engine
const upload = multer({ storage: storage });

// Route for handling file uploads
app.post('/api/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
  let filePath;
  if (req.file.mimetype === 'image/png') {
    filePath = `uploads/img/${req.file.filename}`;
  } else if (req.file.mimetype === 'application/json') {
    filePath = `uploads/json/${req.file.filename}`;
  }
  res.json({ path: filePath });
});

// Route for serving image files
app.use('/uploads/img', express.static('uploads/img'));

// Route for serving JSON files
app.use('/uploads/json', express.static('uploads/json'));


// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Route for handling GET requests for the most recent image file
app.get('/api/upload/img', (req, res) => {
  fs.readdir('uploads/img', (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    let mostRecentFile = '';
    let mostRecentTime = 0;
    files.forEach(file => {
      const filePath = path.join('uploads/img', file);
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
          res.json({ path: `uploads/img/${mostRecentFile}` });
        }
      });
    });
  });
});

// Route for handling GET requests for the most recent JSON file
app.get('/api/upload/json', (req, res) => {
  fs.readdir('uploads/json', (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    let mostRecentFile = '';
    let mostRecentTime = 0;
    files.forEach(file => {
      const filePath = path.join('uploads/json', file);
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
          res.json({ path: `uploads/json/${mostRecentFile}` });
        }
      });
    });
  });
});

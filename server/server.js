const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

// Create a storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadDir = 'uploads';
    if (file.mimetype === 'application/pdf') {
      uploadDir = 'uploads/pdf';
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
  if (req.file.mimetype === 'application/pdf') {
    filePath = `uploads/pdf/${req.file.filename}`;
  } else if (req.file.mimetype === 'application/json') {
    filePath = `uploads/json/${req.file.filename}`;
  }
  res.json({ path: filePath });
});

// Route for serving PDF files
app.use('/uploads/pdf', express.static('uploads/pdf'));

// Route for serving JSON files
app.use('/uploads/json', express.static('uploads/json'));


// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Route for handling GET requests for the most recent PDF file
app.get('/api/upload/pdf', (req, res) => {
  fs.readdir('uploads/pdf', (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    let mostRecentFile = '';
    let mostRecentTime = 0;
    files.forEach(file => {
      const filePath = path.join('uploads/pdf', file);
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
          res.json({ path: `uploads/pdf/${mostRecentFile}` });
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
          // Read the content of the most recent file and send it as a JSON response
          fs.readFile(path.join('uploads/json', mostRecentFile), 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              res.status(500).json({ error: 'Internal server error' });
              return;
            }
            res.json(JSON.parse(data));
          });
        }
      });
    });
  });
});

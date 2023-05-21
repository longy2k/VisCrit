const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require("cors");

// Create a storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadDir = 'uploads';
    if (file.mimetype === 'application/pdf') {
      uploadDir = 'uploads/pdf';
    } else if (file.mimetype === 'application/json') {
      uploadDir = 'uploads/json';
    } else {
      uploadDir = 'uploads/user_generated';
    }
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    path.join(null, uploadDir);
  },
  filename: function (req, file, cb) {
    path.join(null, file.originalname);
  }
});


app.use(
  cors({
    origin: ["https://viscrit.onrender.com", "http://localhost:3000"],
    credentials:  true,
  })
);
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
  } else if (req.file.originalname.endsWith('.csv')) {
    filePath = `uploads/csv/${req.file.filename}`;
  }
  res.json({ path: filePath });
});

// Set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Route for serving PDF files
app.use('/uploads/pdf', express.static('uploads/pdf'));

// Route for serving JSON files
app.use('/uploads/json', express.static('uploads/json'));

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});

// Default route
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

// Check whether the 'uploads' directory exists
app.get('/api/checkdirectory', (req, res) => {
  const directoryPath = __dirname + '/uploads';
  fs.access(directoryPath, (error) => {
    if (error) {
      res.send(false); // Directory does not exist
    } else {
      res.send(true); // Directory exists
    }
  });
});

// Check whether the 'uploads/pdf' directory exists
app.get('/api/checkdirectory/upload/pdf', (req, res) => {
  const directoryPath = __dirname + '/uploads/pdf';
  fs.access(directoryPath, (error) => {
    if (error) {
      res.send(false); // Directory does not exist
    } else {
      res.send(true); // Directory exists
    }
  });
});

// Check whether the 'uploads/json' directory exists
app.get('/api/checkdirectory/upload/json', (req, res) => {
  const directoryPath = __dirname + '/uploads/json';
  fs.access(directoryPath, (error) => {
    if (error) {
      res.send(false); // Directory does not exist
    } else {
      res.send(true); // Directory exists
    }
  });
});

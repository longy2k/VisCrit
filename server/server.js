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
    } else if (file.mimetype === 'image/png' ||file.mimetype === 'image/jpeg' ) {
      uploadDir = 'uploads/image';
    }
     else {
      uploadDir = 'uploads/user_generated';
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
  } else if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') {
      filePath = `uploads/image/${req.file.filename}`;
  } else if (req.file.mimetype === 'application/json') {
    filePath = `uploads/json/${req.file.filename}`;
  } else if (req.file.originalname.endsWith('.csv')) {
    filePath = `uploads/csv/${req.file.filename}`;
  }
  res.json({ path: filePath });
});

// react-pdf `Access-Control-Allow-Origin` to display pdf
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/uploads/pdf', express.static('uploads/pdf'));
app.use('/uploads/image', express.static('uploads/image'));
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

// Route for handling GET requests for the most recent PDF file
app.get('/api/upload/image', (req, res) => {
  fs.readdir('uploads/image', (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    let mostRecentFile = '';
    let mostRecentTime = 0;
    files.forEach(file => {
      const filePath = path.join('uploads/image', file);
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
          res.json({ path: `uploads/image/${mostRecentFile}` });
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


// Check whether uploads/ exist
app.get('/api/checkdirectory', (req, res) => {
  const directoryPath = __dirname + '/uploads';
  fs.access(directoryPath, (error) => {
    if (error) {
      res.send(false); // directory does not exist
    } else {
      res.send(true); // directory exists
    }
  });
});

// Check whether uploads/pdf exist
app.get('/api/checkdirectory/upload/pdf', (req, res) => {
  const directoryPath = __dirname + '/uploads/pdf';
  fs.access(directoryPath, (error) => {
    if (error) {
      res.send(false); // directory does not exist
    } else {
      res.send(true); // directory exists
    }
  });
});

app.get('/api/checkdirectory/upload/image', (req, res) => {
  const directoryPath = __dirname + '/uploads/image';
  fs.access(directoryPath, (error) => {
    if (error) {
      res.send(false); // directory does not exist
    } else {
      res.send(true); // directory exists
    }
  });
});

// Check whether uploads/json exist
app.get('/api/checkdirectory/upload/json', (req, res) => {
  const directoryPath = __dirname + '/uploads/json';
  fs.access(directoryPath, (error) => {
    if (error) {
      res.send(false); // directory does not exist
    } else {
      res.send(true); // directory exists
    }
  });
});
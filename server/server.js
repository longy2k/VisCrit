const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();


// Email component

app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { to } = req.body;

  // Sender's email
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'korey55@ethereal.email',
      pass: 'DG2rNC6eERYpzbvJxv'
    },
  });

  // Sender's email content
  const mailOptions = {
    from: 'korey55@ethereal.email',
    to,
    subject: 'Welcome to our mailing list!',
    text: 'Thank you for subscribing to our newsletter.'
  };

  // Email errors
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});



// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: 'korey55@ethereal.email', 
//     pass: 'DG2rNC6eERYpzbvJxv'
//   },
// });

// const mailOptions = {
//   from: 'korey55@ethereal.email',
//   to: 'myfriend@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// }); 

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


// react-pdf `Access-Control-Allow-Origin` to display pdf
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

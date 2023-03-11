const express = require('express');
const multer = require('multer');
const app = express();

// Create a storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder where the uploaded files will be stored
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
  res.json({ filename: req.file.originalname }); // Send the file name in JSON format
});

// Route for serving the uploaded files
app.use(express.static('uploads'));

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

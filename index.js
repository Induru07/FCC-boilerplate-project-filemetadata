require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer'); // 1. Import multer
const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// 2. Configure Multer
// Configure it to save uploaded files to an 'uploads' directory.
// This handles the parsing of the multipart/form-data.
const upload = multer({ dest: 'uploads/' });

// 3. The API Endpoint
// We use upload.single('upfile') because the HTML form input name is 'upfile'.
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // Req.file is where multer puts the file info
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // 4. Construct the required JSON response
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

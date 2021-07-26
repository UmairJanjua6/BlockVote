let express = require('express');
let app = express();
let nodemailer = require('nodemailer');
const constants = require('./Constants');

const path = require('path');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

nodemailer.createTransport({
  host: constants.Host, 
  port: 587,
  secure: false,
  auth: {
    user: "YOURUSERNAME",
    pass: "YOURPASSWORD" 
  }
});

// serve PORT running here
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.info(`server has started on ${PORT}`))
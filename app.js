require('dotenv').config();

const express = require('express');
const router = express.Router();
const app = express();
const nodemailer = require('nodemailer');

const path = require('path');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.HOST_EMAIL,
        pass: process.env.HOST_PASSWORD
    }
});

router.post('/send-email', (req, res) => {
    const targetEmail = req.body.email;
    console.log("email => ", targetEmail);
    var message = "I am sent from Block chain app"
    var content = `email: ${targetEmail} \n message: ${message} `
  
    var mail = {
      from: process.env.HOST_EMAIL, 
      to: req.body.email, 
      message: subject,
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail',
          Error: err
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
  })

// serve PORT running here
const PORT = process.env.PORT
app.listen(PORT, () => console.info(`server has started on ${PORT}`))
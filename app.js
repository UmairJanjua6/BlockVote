require('dotenv').config();

let express = require('express');
let app = express();
let nodemailer = require('nodemailer');

const path = require('path');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

let transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL, 
  port: 587,
  secure: false,
  auth: {
    user: process.env.HOST_EMAIL,
    pass: process.env.HOST_PASSWORD
  }
});

transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to recieve messages for email");
    }
})

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
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.info(`server has started on ${PORT}`))
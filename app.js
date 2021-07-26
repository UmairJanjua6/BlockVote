require('dotenv').config();

const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const route = express.Router();

const PORT = process.env.PORT || 5000;

app.use('/v1', route);
app.listen(PORT, () => console.info(`server has started on ${PORT}`))

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.HOST_EMAIL,
        pass: process.env.HOST_PASSWORD
    }
});

route.get('/check', (req,res) => {
    res.json({
        status: 'success',
        msg: "check me, i am here"
       })
})
route.post('/send-email', (req, res) => {
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

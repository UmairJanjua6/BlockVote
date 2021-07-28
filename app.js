require('dotenv').config();

const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const route = express.Router();
const cors = require('cors');

route.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

/* ---------------------------------------------------------------------------- */
route.post('/send-email', (req, res) => {
    const targetEmail = req.body.email;
    const content = `Email: ${targetEmail} \n`;
    const subject = `Block Vote Email Verification`;

    var mail = {
      from: process.env.HOST_EMAIL, 
      to: targetEmail, 
      subject: subject,
      text: content,
      attachments: [{
        filename: 'Logo1.png',
        path: './assets/Logo1.png',
        cid: 'logo'
      }],
      html: `<a href="#">
                <img style="margin-left:auto;margin-right:auto;display:block" src="cid:logo">
            </a>
            <br/> 
            <div style="text-align: center;">
                <strong>Thanks for registering. Click below button to verify your email</strong>
                <br/>
                <br/>
                <a href="${process.env.LOCAL_ENVIRONMENT_URL + process.env.EMAIL_REDIRECTION_PATH}/${targetEmail}">
                    <button style="padding: 10px 20px 10px 20px;background:#efb903;border:none;color:white;">Verify</button>
                </a>
            </div>`
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

/* ---------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------- */
route.post('/vote-send-email', (req, res) => {
    const targetEmail = req.body.email;
    const content = `Email: ${targetEmail} \n`;
    const subject = `Block Vote Confirmation`;

    var mail = {
      from: process.env.HOST_EMAIL, 
      to: targetEmail, 
      subject: subject,
      text: content,
      attachments: [{
        filename: 'Logo1.png',
        path: './assets/Logo1.png',
        cid: 'logo'
      }],
      html: `<a href="#">
                <img style="margin-left:auto;margin-right:auto;display:block" src="cid:logo">
            </a>
            <br/> 
            <div style="text-align: center;">
                <strong>Congratulations! Your vote is casted successfully. Thanks for casting vote.</strong>
                <br/>
                <br/>
            </div>`
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
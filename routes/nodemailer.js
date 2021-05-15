const router = require("express").Router();
var nodemailer = require('nodemailer');
var cors = require('cors');
module.exports = function(app) {
 
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //replace with your email provider
  port: 587,
  auth: {
    user: "wilson@liftheavyrunlong.com", //replace with the email address
    pass: process.env.GMAIL //replace with the password
  }
});

// verify connection configuration
// transporter.verify(function(error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

    app.post("/nodemailer/send", (req, res) => {
        console.log("I am in the backend");
         var name = req.body.name
  var email = req.body.email
  var subject = req.body.subject
  var message = req.body.message
  var content = `name: ${name} \n email: ${email} \n subject: ${subject} \n message: ${message} `
  var mail = {
    from: name,
    to: ["app@liftheavyrunlong.com", "wilsonhorrell@gmail.com"],
    subject: subject,
    text: content
  }
  console.log({mail})
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log({err});
      console.log({data})
      res.json({
        status: 'fail'
      })
    } else {
        console.log("success");
      res.json({
       status: 'success'
      })
    }
  })

//send reply



    });


   

}





//
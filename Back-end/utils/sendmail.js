const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "",//write username / gmail here 
        pass: "", // write password over here 
    },
});

function sendMail(to,sub,msg) {
    transporter.sendMail({ 
    to:to,
    subject:sub,
    html:msg
    });
    console.log("mail sent");
}

sendMail("bhaiji2603@gmail.com","This is my subject","this is my message");
module.exports = transporter;

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "devansh.singh.s69@kalvium.community", // Updated Gmail username
        pass: "Mukesh1!", // Updated password
    },
});

function sendMail(to, sub, msg) {
    transporter.sendMail({ 
        to: to,
        subject: sub,
        html: msg
    });
    console.log("mail sent");
}

// Sending mail to the specified address
sendMail("devanshsingh1974@gmail.com", "This is my subject", "this is my message");
module.exports = transporter;

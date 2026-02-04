import nodemailer from 'nodemailer';

//https://nodemailer.com/usage/using-gmail

const recipientAddress = "";
const sendAddress = "";
const subject = "example subject";
const message = "example message";

// Should be an env variable
// Creates app password through gmail account settings
const appPassword = "app password";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: sendAddress,
        pass: appPassword,

    }
});

const mailOptions = {
    from: sendAddress,
    to: recipientAddress,
    subject: subject,
    text: message,

};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error occurred:', error);
    } else {
        console.log('Email sent successfully:', info.response);
    }
});
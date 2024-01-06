const nodemailer = require('nodemailer');

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
           user: process.env.EMAIL_USERNAME,  // Your Gmail address
           pass: process.env.EMAIL_PASSWORD   // Your Gmail password
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};

module.exports = sendEmail;

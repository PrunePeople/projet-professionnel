import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('MAILJET_API_KEY:', process.env.MAILJET_API_KEY);
console.log('MAILJET_API_SECRET:', process.env.MAILJET_API_SECRET);

const transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    auth: {
        user: process.env.MAILJET_API_KEY,
        pass: process.env.MAILJET_API_SECRET,
    },
});

const mailOptions = {
    from: 'your_email@example.com', // Remplacez par votre adresse email
    to: 'recipient@example.com', // Remplacez par l'adresse email du destinataire
    subject: 'Test Email from Node.js',
    text: 'Hello! This is a test email from Node.js using Mailjet.',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});

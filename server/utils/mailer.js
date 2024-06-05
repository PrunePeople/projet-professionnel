// server/utils/mailer.js
import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (userEmail, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: 'Email de vérification',
    text: `Cliquez sur le lien pour vérifier votre email : ${process.env.BASE_URL}/verify-email?token=${verificationToken}`,
  };

  return transporter.sendMail(mailOptions);
};

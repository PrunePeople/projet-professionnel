import prisma from '../../prismaClient.mjs';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import mailjetTransport from 'nodemailer-mailjet-transport';

// Configurer Nodemailer pour utiliser Mailjet
const transporter = nodemailer.createTransport(mailjetTransport({
  auth: {
    apiKey: process.env.MAILJET_API_KEY,
    apiSecret: process.env.MAILJET_API_SECRET
  }
}));

export const createUser = async (req, res) => {
  try {
    console.log('Requête reçue pour créer un utilisateur:', req.body);
    const { firstName, lastName, phone, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phone,
        email,
        password: hashedPassword,
        verificationToken
      },
    });

    console.log('Utilisateur créé avec succès:', user);
    
    try {
      console.log('Envoi de l\'email de vérification...');
      let info = await transporter.sendMail({
        from: '"Ton Projet" <audrey2dieu@gmail.com>',
        to: email,
        subject: 'Confirmation de votre inscription',
        text: `Veuillez confirmer votre inscription en cliquant sur ce lien : http://localhost:3000/verify?token=${verificationToken}`,
        html: `<b>Veuillez confirmer votre inscription en cliquant sur ce lien : <a href="http://localhost:3000/verify?token=${verificationToken}">http://localhost:3000/verify?token=${verificationToken}</a></b>`
      });
      
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email:', emailError);
    }

    res.status(201).json(user);
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur', details: error.message });
  }
};

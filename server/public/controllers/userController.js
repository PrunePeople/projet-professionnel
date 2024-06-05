const prisma = require('../../prismaClient');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const mailjetTransport = require('nodemailer-mailjet-transport');

// Configurer Nodemailer pour utiliser Mailjet
const transporter = nodemailer.createTransport(mailjetTransport({
  auth: {
    apiKey: 'e36cc1c0378e9cf93a472c5e5d05bf21', // Remplace par ta clé API Mailjet
    apiSecret: '8e38ec7f42eb600361659bf7bbc1a8c4' // Remplace par ta clé secrète API Mailjet
  }
}));

exports.createUser = async (req, res) => {
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

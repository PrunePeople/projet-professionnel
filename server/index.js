import express from 'express';
import cors from 'cors';
import userRoutes from './public/routes/userRoutes.js';
import reservationRoutes from './public/routes/reservationRoutes.js';
import Mailjet from 'node-mailjet';
import dotenv from 'dotenv';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

dotenv.config();

AdminJS.registerAdapter({ Database, Resource });

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', reservationRoutes);

// Initialiser Mailjet avec les clés API
const mailjetClient = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);

// Route pour envoyer des e-mails
app.post('/send-email', (req, res) => {
  console.log('Request received:', req.body); // Log de la requête reçue
  const { firstName, lastName, email, phone, company, subject, message } = req.body;

  const request = mailjetClient
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: "contact@comdroy.com",
            Name: "Com D'Roy",
          },
          To: [
            {
              Email: process.env.MAILJET_RECIPIENT_EMAIL,
              Name: "Votre Nom",
            },
          ],
          Subject: subject,
          TextPart: `Nom: ${firstName} ${lastName}\nEmail: ${email}\nTéléphone: ${phone}\nSociété: ${company}\n\nMessage:\n${message}`,
        },
      ],
    });

  request
    .then((result) => {
      console.log(result.body);
      res.status(200).json({ status: 'success' });
    })
    .catch((err) => {
      console.error(err.statusCode);
      res.status(500).json({ status: 'error', message: err.message });
    });
});

const prisma = new PrismaClient();

const adminJs = new AdminJS({
  resources: [
    {
      resource: prisma.user,
      options: {
        properties: {
          password: { isVisible: false }, // Cache le champ mot de passe
          resetPasswordToken: { isVisible: false },
          resetPasswordExpires: { isVisible: false },
          verificationToken: { isVisible: false },
        },
        actions: {
          new: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          edit: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
          delete: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
          },
        },
      },
    },
    {
      resource: prisma.reservation,
      options: {
        actions: {
          new: { isAccessible: true },
          edit: { isAccessible: true },
          delete: { isAccessible: true },
        },
      },
    },
    {
      resource: prisma.admin,
      options: {
        actions: {
          new: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'superadmin',
          },
          edit: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'superadmin',
          },
          delete: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'superadmin',
          },
        },
      },
    },
  ],
  rootPath: '/admin',
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  },
  cookiePassword: 'session-secret',
});

app.use(adminJs.options.rootPath, adminRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
  console.log(`AdminJS is running at http://localhost:${PORT}/admin`);
});

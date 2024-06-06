const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

// Utiliser import() pour les modules ESM
const importAdminJS = () => import('adminjs');
const importAdminJSExpress = () => import('@adminjs/express');
const importAdminJSPrisma = () => import('@adminjs/prisma');

dotenv.config();
console.log("Environnement chargé");

(async () => {
  const AdminJS = (await importAdminJS()).default;
  const AdminJSExpress = (await importAdminJSExpress()).default;
  const { Database, Resource } = await importAdminJSPrisma();

  AdminJS.registerAdapter({ Database, Resource });
  console.log("Adapter AdminJS enregistré");

  const app = express();
  const prisma = new PrismaClient();
  console.log("PrismaClient initialisé");

  // Importer les routes dynamiquement
  const userRoutes = (await import('./public/routes/userRoutes.mjs')).default;
  const reservationRoutes = (await import('./public/routes/reservationRoutes.mjs')).default;

  app.use(cors());
  app.use(express.json());
  app.use('/api', userRoutes);
  app.use('/api', reservationRoutes);
  console.log("Middleware et routes configurés");

  // Configurer AdminJS
  const adminJs = new AdminJS({
    resources: [
      {
        resource: { model: prisma.user, client: prisma },
        options: {
          properties: {
            password: { isVisible: { list: false, edit: true, filter: false, show: false } },
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
        resource: { model: prisma.reservation, client: prisma },
        options: {
          actions: {
            new: { isAccessible: true },
            edit: { isAccessible: true },
            delete: { isAccessible: true },
          },
        },
      },
      {
        resource: { model: prisma.admin, client: prisma },
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
  console.log("AdminJS configuré");

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
  console.log("Router AdminJS configuré");

  app.use(adminJs.options.rootPath, adminRouter);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
    console.log(`AdminJS is running at http://localhost:${PORT}/admin`);
  });
  console.log("Serveur démarré");
})();

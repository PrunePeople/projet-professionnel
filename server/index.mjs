// Importation des modules nécessaires pour créer et gérer un serveur et ses routes
import express from "express";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource } from "@adminjs/sequelize";
import {
  sequelize,
  User,
  Reservation,
  Admin,
  Menu,
  MenuItem,
} from "./models/index.mjs";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";

// Chargement des variables d'environnement à partir d'un fichier .env.local dans process.env, rendant ces variables accessibles dans toute l'application
dotenv.config({ path: ".env.local" });

// Enregistrement de Sequelize comme base de données pour AdminJS, permettant l'utilisation des modèles Sequelize avec AdminJS
AdminJS.registerAdapter({ Database, Resource });

// Création d'une nouvelle instance d'Express qui sert de base au serveur web
const app = express();

// Middleware pour analyser les corps de requêtes JSON, permettant de facilement extraire et utiliser les données des requêtes client
app.use(express.json());

// Configuration de CORS pour permettre les requêtes entre différentes origines, spécifiquement pour le développement local avec localhost:3000
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Configuration de AdminJS, un outil d'administration pour applications Node.js qui permet de gérer facilement les données via une interface utilisateur
const adminJs = new AdminJS({
  resources: [
    { resource: User },
    { resource: Reservation },
    { resource: Menu },
    { resource: MenuItem },
  ],
  rootPath: "/adminJS",
});

// Création d'un routeur pour AdminJS, permettant de gérer les routes d'administration via une interface web
const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// Configuration du transporteur de courrier, utilisé pour envoyer des emails via le service Mailjet avec les identifiants API spécifiés
const transporter = nodemailer.createTransport({
  host: "in-v3.mailjet.com",
  port: 587,
  auth: {
    user: process.env.MAILJET_API_KEY,
    pass: process.env.MAILJET_API_SECRET,
  },
});

// Route POST pour enregistrer un nouvel utilisateur
app.post("/api/register", async (req, res) => {
  // Extraction des données de la requête
  const { first_name, last_name, email, phone, password } = req.body;

  try {
    // Vérification si l'utilisateur existe déjà avec cet email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      // Retourne une erreur 400 si l'utilisateur existe déjà
      return res
        .status(400)
        .json({ error: "Un utilisateur avec cet email existe déjà." });
    }

    // Hashage du mot de passe fourni par l'utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création d'un nouvel utilisateur avec les données fournies
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      phone,
      password: hashedPassword,
    });

    // Options pour l'email de confirmation
    const mailOptions = {
      from: "audrey2dieu@gmail.com",
      to: email,
      subject: "Bienvenue sur Com d Roy",
      text: "Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter avec votre email et le mot de passe que vous avez défini.",
    };

    // Envoi de l'email de confirmation
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // En cas d'erreur d'envoi d'email, retourne une erreur 500
        return res
          .status(500)
          .json({ error: "Échec de l’envoi de l’email.", details: error });
      }
      // Retourne un message de succès si l'utilisateur est enregistré et l'email envoyé
      res
        .status(201)
        .json({
          message: "Utilisateur enregistré et email de confirmation envoyé.",
        });
    });
  } catch (error) {
    // En cas d'erreur d'enregistrement de l'utilisateur, retourne une erreur 500
    res
      .status(500)
      .json({
        error: "Échec de l’enregistrement de l’utilisateur",
        details: error.message,
      });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare le mot de passe fourni par l'utilisateur avec le mot de passe haché stocké dans la base de données
    const isMatch = await bcrypt.compare(password, user.password);

    // Si les mots de passe ne correspondent pas, renvoie une réponse avec un statut 400 et un message d'erreur
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Si les mots de passe correspondent, génère un token JWT avec les informations de l'utilisateur
    // Le token inclut l'ID de l'utilisateur et son rôle, et il est signé avec la clé secrète JWT
    // Le token expire dans 1 heure
    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Renvoie une réponse JSON contenant le token et les informations de l'utilisateur (sans le mot de passe)
    res.json({
      token,
      user: {
        id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to log in user", details: error.message });
  }
});

app.post("/api/change-password", authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password successfully updated" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update password", details: error.message });
  }
});

app.post("/api/reservations", authenticateToken, async (req, res) => {
  const { start, guests, notes, animals, stroller, wheelchair, highChair } =
    req.body;
  const userId = req.user.id;
  const userEmail = req.user.email;

  try {
    const newReservation = await Reservation.create({
      user_id: userId,
      reservation_date: new Date(start).toISOString().split("T")[0],
      reservation_time: new Date(start).toISOString().split("T")[1].slice(0, 8),
      number_of_guests: guests,
      additional_info: notes,
      animals,
      stroller,
      wheelchair,
      high_chair: highChair,
      validation_status: "pending",
    });

    if (userEmail) {
      const mailOptions = {
        from: "audrey2dieu@gmail.com",
        to: userEmail,
        subject: "Confirmation de réservation",
        text: `Votre réservation pour ${guests} personnes le ${new Date(
          start
        ).toLocaleString()} a été confirmée.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Failed to send email", details: error });
        }
        res.status(201).json(newReservation);
      });
    } else {
      res.status(201).json(newReservation);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create reservation", details: error.message });
  }
});

// Route GET pour obtenir tous les menus avec leurs items
app.get("/api/menus", async (req, res) => {
  try {
    // Récupération de tous les menus avec leurs éléments associés
    const menus = await Menu.findAll({ include: MenuItem });
    // Envoi des menus en réponse JSON
    res.json(menus);
  } catch (error) {
    // En cas d'erreur, renvoi d'un message d'erreur et d'un statut 500
    res.status(500).json({ error: "Failed to fetch menus" });
  }
});

// Route POST pour créer un nouveau menu et ses items
app.post("/api/menus", async (req, res) => {
  // Extraction du titre du menu et des items du corps de la requête
  const { title, items } = req.body;
  try {
    // Création d'un nouveau menu avec le titre fourni
    const newMenu = await Menu.create({ title });
    // Vérification si des items sont fournis et s'ils sont nombreux
    if (items && items.length > 0) {
      // Préparation des items avec l'ID du nouveau menu
      const newItems = items.map((item) => ({ ...item, menuId: newMenu.id }));
      // Création en bloc des nouveaux items
      await MenuItem.bulkCreate(newItems);
    }
    // Envoi du nouveau menu en réponse JSON avec un statut 201 (créé)
    res.status(201).json(newMenu);
  } catch (error) {
    // En cas d'erreur, renvoi d'un message d'erreur et d'un statut 500
    res.status(500).json({ error: "Failed to create menu" });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
    const fullUser = await User.findByPk(user.id);
    if (!fullUser) return res.sendStatus(403);
    req.user = {
      id: fullUser.user_id,
      email: fullUser.email,
      role: fullUser.role,
    };
    next();
  });
}

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

sequelize.sync({ force: false }).then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

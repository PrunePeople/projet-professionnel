import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/sequelize';
import { sequelize, User, Reservation, Admin, Menu, MenuItem } from './models/index.mjs';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

AdminJS.registerAdapter({ Database, Resource });

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
}));

const adminJs = new AdminJS({
    resources: [
        { resource: User },
        { resource: Reservation },
        { resource: Menu },
        { resource: MenuItem }
    ],
    rootPath: '/adminJS',
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

const transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    auth: {
        user: process.env.MAILJET_API_KEY,
        pass: process.env.MAILJET_API_SECRET,
    },
});

const personalEmail = process.env.REACT_APP_PERSONAL_EMAIL;
const professionalEmail = process.env.REACT_APP_PROFESSIONAL_EMAIL;

function generatePassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

app.post('/api/register', async (req, res) => {
    const { first_name, last_name, email, phone } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const password = generatePassword(12);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            phone,
            password: hashedPassword,
        });

        const mailOptions = {
            from: personalEmail,
            to: email,
            subject: 'Bienvenue sur Com d Roy',
            text: `Votre mot de passe est: ${password}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: 'Failed to send email', details: error });
            }
            res.status(201).json({ message: 'User registered and email sent' });
        });

    } catch (error) {
        res.status(500).json({ error: 'Failed to register user', details: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token, user: { id: user.user_id, first_name: user.first_name, last_name: user.last_name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: 'Failed to log in user', details: error.message });
    }
});

app.post('/api/reservations', authenticateToken, async (req, res) => {
    const { start, guests, notes, animals, stroller, wheelchair, highChair } = req.body;
    const userId = req.user.id;
    const userEmail = req.user.email;

    try {
        const newReservation = await Reservation.create({
            user_id: userId,
            reservation_date: new Date(start).toISOString().split('T')[0],
            reservation_time: new Date(start).toISOString().split('T')[1].slice(0, 8),
            number_of_guests: guests,
            additional_info: notes,
            animals,
            stroller,
            wheelchair,
            high_chair: highChair,
            validation_status: 'pending',
        });

        if (userEmail) {
            const mailOptions = {
                from: personalEmail,
                to: userEmail,
                subject: 'Confirmation de réservation',
                text: `Votre réservation pour ${guests} personnes le ${new Date(start).toLocaleString()} a été confirmée.`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ error: 'Failed to send email', details: error });
                }
                res.status(201).json(newReservation);
            });
        } else {
            res.status(201).json(newReservation);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to create reservation', details: error.message });
    }
});

app.get('/api/menus', async (req, res) => {
    try {
        const menus = await Menu.findAll({ include: MenuItem });
        res.json(menus);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch menus' });
    }
});

app.post('/api/menus', async (req, res) => {
    const { title, items } = req.body;
    try {
        const newMenu = await Menu.create({ title });
        if (items && items.length > 0) {
            const newItems = items.map(item => ({ ...item, menuId: newMenu.id }));
            await MenuItem.bulkCreate(newItems);
        }
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create menu' });
    }
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
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

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

sequelize.sync({ force: false }).then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

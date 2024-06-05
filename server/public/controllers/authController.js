const prisma = require('../../prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Requête de connexion reçue:', req.body);

    // Vérification de la valeur de JWT_SECRET
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log('Utilisateur non trouvé pour l\'email:', email);
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('Mot de passe incorrect pour l\'utilisateur:', email);
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    if (!user.verified) {
      console.log('Email non vérifié pour l\'utilisateur:', email);
      return res.status(401).json({ error: 'Email non vérifié' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Utilisateur connecté avec succès:', email);
    res.json({ token, user });
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
  }
};


const { Router } = require('express');
const { createUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/authController');
const prisma = require('../../prismaClient');

const router = Router();

router.post('/users', createUser);
router.post('/login', loginUser);

router.get('/verify', async (req, res) => {
  const { token } = req.query;
  console.log('Token de vérification reçu:', token);

  try {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token }
    });

    console.log('Utilisateur trouvé:', user);

    if (!user) {
      console.log('Token invalide ou utilisateur non trouvé');
      return res.status(400).json({ error: 'Token invalide' });
    }

    // Mise à jour de l'utilisateur pour le marquer comme vérifié et supprimer le token
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { verified: true, verificationToken: null }
    });

    console.log('Utilisateur vérifié avec succès:', updatedUser);
    res.status(200).json({ message: 'Email vérifié avec succès' });
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'email:', error);
    res.status(500).json({ error: 'Erreur lors de la vérification de l\'email', details: error.message });
  }
});

router.get('/debug/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

module.exports = router;

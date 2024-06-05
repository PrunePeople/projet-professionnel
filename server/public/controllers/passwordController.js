// server/public/controllers/passwordController.js
const prisma = require('../../prismaClient');
const crypto = require('crypto');
const { sendResetPasswordEmail } = require('../utils/mailer');

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetExpires = new Date(Date.now() + 3600000); // 1 hour

  await prisma.user.update({
    where: { email },
    data: {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetExpires,
    },
  });

  await sendResetPasswordEmail(user.email, resetToken);
  res.json({ message: 'Email de réinitialisation envoyé' });
};

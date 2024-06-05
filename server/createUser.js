const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser() {
  try {
    const user = await prisma.user.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        email: 'john.doe@example.com',
        password: 'securepassword',
        role: 'user',
        verified: true
      },
    });
    console.log('Utilisateur créé:', user);
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUser();

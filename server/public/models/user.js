// server/public/models/user.js
import prisma from '../../prismaClient';
import bcrypt from 'bcrypt';

export const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      verified: false,
      verificationToken: generateVerificationToken(),
    },
  });
};

const generateVerificationToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

import { prisma } from '@/lib/prismadb';
import bcrypt from 'bcrypt';

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export function findUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export function comparePassword(password: string, savedPassword: string) {
  return bcrypt.compare(password, savedPassword);
}

export function hashSyncPassword(password: string) {
  return bcrypt.hashSync(password, 12);
}

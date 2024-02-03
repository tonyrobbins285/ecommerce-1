import { prisma } from '@/lib/prismadb';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export function findUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export function generateAccessToken(user: User) {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: '5m',
  });
}

export function generateRefreshToken(user: User) {
  return jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: '8h',
    },
  );
}

// used when we create a refresh token.
export function addRefreshTokenToDb({
  refreshToken,
  userId,
}: {
  refreshToken: string;
  userId: string;
}) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      hashedToken: hashToken(refreshToken),
    },
  });
}

export function hashToken(token: string) {
  return bcrypt.hashSync(token, 12);
}

export function generateTokens(user: User) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
}

export function auth() {
  const authorization = request.headers.get('authorization') || request.headers.get('Authorization');

  if (!authorization)
}

// used when we create a refresh token.
// export function addRefreshToken({ refreshToken, userId }) {
//   return prisma.user.update({
//     data: {
//       hashedToken: hashToken(refreshToken),
//       userId,
//     },
//   });
// }

// used to check if the token sent by the client is in the database.
// export function findRefreshTokenById(id) {
//   return db.refreshToken.findUnique({
//     where: {
//       id,
//     },
//   });
// }

import { prisma } from '@/lib/prismadb';
import { UserSchema } from '@/schema/user';
import { NextResponse } from 'next/server';
import { hashSyncPassword } from '@/helpers/user-services';
import { addRefreshTokenToDb, generateTokens } from '@/helpers/auth-services';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsedBody = UserSchema.safeParse(body);

    if (!parsedBody.success) {
      return new NextResponse('Invalid email or password', { status: 400 });
    }

    const { email, password } = body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    email;

    if (existingUser) {
      return new NextResponse('Email already in use.', {
        status: 400,
      });
    }
    const user = await prisma.user.create({
      data: {
        email,
        password: hashSyncPassword(password),
      },
    });

    const { accessToken, refreshToken } = generateTokens(user);

    await addRefreshTokenToDb({ refreshToken, userId: user.id });

    const res = new NextResponse('Created new account successfully', {
      status: 200,
    });

    res.cookies.set({
      name: 'accessToken',
      value: accessToken,
      httpOnly: true,
      secure: true,
    });
    res.cookies.set({
      name: 'refreshToken',
      value: refreshToken,
      httpOnly: true,
      secure: true,
    });

    return res;
  } catch (error) {
    console.log('[USER_SIGNUP]', error);

    return new NextResponse('Internal Error', { status: 500 });
  }
}

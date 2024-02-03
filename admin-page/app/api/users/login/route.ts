import { UserSchema } from '@/schema/user';
import { NextResponse } from 'next/server';
import { addRefreshTokenToDb, generateTokens } from '@/helpers/auth-services';
import { comparePassword, findUserByEmail } from '@/helpers/user-services';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsedBody = UserSchema.safeParse(body);

    if (!parsedBody.success) {
      return new NextResponse('Invalid email or password', { status: 400 });
    }

    const { email, password } = body;

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      return new NextResponse('Invalid login credentials.', { status: 403 });
    }

    const validPassword = await comparePassword(
      password,
      existingUser.password,
    );

    if (!validPassword) {
      return new NextResponse('Invalid login credentials.', { status: 403 });
    }

    const { accessToken, refreshToken } = generateTokens(existingUser);

    await addRefreshTokenToDb({
      refreshToken,
      userId: existingUser.id,
    });

    const res = new NextResponse('Logged In successfully', {
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
    console.log('[USER_LOGIN]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

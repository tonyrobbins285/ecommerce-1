import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // const authorization = request.headers.get('authorization') || request.headers.get('Authorization');
  // if (!authorization)
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
};

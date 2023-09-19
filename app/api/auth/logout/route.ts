import { serialize } from 'cookie';
import { COOKIE_NAME } from '@/constants';

export function DELETE() {
  // Clear the token cookie
  const serialized = serialize(COOKIE_NAME, '', {
    maxAge: -1, // This ensures the cookie is deleted immediately
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return new Response(JSON.stringify({ message: 'Logged out!' }), {
    status: 200,
    headers: { 'Set-Cookie': serialized },
  });
}

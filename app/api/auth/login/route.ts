import { COOKIE_NAME } from '@/constants';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { queryAsync } from '../../db';
import * as bcrypt from 'bcryptjs';

const MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request: Request) {
  const body = await request.json();

  const { email, password } = body;

  // Check fields exist
  if (!email || !password) {
    return NextResponse.json(
      {
        message: 'Missing required fields.',
      },
      {
        status: 400,
      },
    );
  }

  // Check email exists
  const existingUser = await queryAsync(`SELECT * FROM user WHERE email = ?`, [
    email,
  ]);

  console.log(existingUser);

  if (existingUser.length === 0) {
    return NextResponse.json(
      {
        message: 'Email not found.',
      },
      {
        status: 400,
      },
    );
  }

  // Check password matches existing user
  const passwordMatch: boolean = await bcrypt.compare(
    password,
    existingUser[0].password,
  );

  if (!passwordMatch) {
    return NextResponse.json(
      {
        message: 'Incorrect password.',
      },
      {
        status: 400,
      },
    );
  }

  const secret = process.env.JWT_SECRET || '';

  const token = sign(
    {
      email,
    },
    secret,
    { expiresIn: MAX_AGE },
  );

  const seralized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/',
  });

  const response = {
    message: 'Authenticated!',
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Set-Cookie': seralized },
  });
}

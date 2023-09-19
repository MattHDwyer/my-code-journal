import { NextResponse } from 'next/server';
import { queryAsync } from '../../db';
import * as bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const { email, password, passwordConfirmation } = body;

  if (!email || !password || !passwordConfirmation) {
    return NextResponse.json(
      {
        message: 'Missing required fields.',
      },
      {
        status: 400,
      },
    );
  }

  // Check if email is already being used
  const existingUser = await queryAsync(`SELECT * FROM user WHERE email = ?`, [
    email,
  ]);

  if (existingUser.length) {
    return NextResponse.json(
      {
        message: 'Email already in use.',
      },
      {
        status: 400,
      },
    );
  }

  if (password !== passwordConfirmation) {
    return NextResponse.json(
      {
        message: 'Passwords do not match.',
      },
      {
        status: 400,
      },
    );
  }

  const hashedPassword = await hashPassword(password);

  try {
    const res = await queryAsync(
      `INSERT INTO user (email, password) VALUES (?, ?)`,
      [email, hashedPassword],
    );

    return NextResponse.json({
      message: 'User created successfully.',
      res,
    });
  } catch (error) {
    console.error('Error inserting user:', error);
    return NextResponse.json(
      {
        message: 'An error occurred. Please try again.',
      },
      {
        status: 500,
      },
    );
  }
}

const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword: string = await bcrypt.hash(password, 16);
  return hashedPassword;
};

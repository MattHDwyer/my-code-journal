'use client';

import React, { useState } from 'react';
import { Button, Form, LoadingSpinner, TextField } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

type LoginFormFields = {
  email: string;
  password: string;
};

const defaultValues =
  process.env.NODE_ENV === 'development'
    ? {
        email: process.env.NEXT_PUBLIC_USER_EMAIL,
        password: process.env.NEXT_PUBLIC_USER_PASSWORD,
      }
    : {
        email: '',
        password: '',
      };

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    mode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    setLoading(true);
    try {
      if (Object.keys(errors).length === 0) {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          push('/journal');
          return;
        }
        setLoading(false);
      } else {
        console.log(errors);
        setLoading(false);
        return;
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
      return;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label={'Email'}
          autoComplete="off"
          type="email"
          required
          error={errors.email?.message}
          {...register('email', { required: 'Email is required!' })}
        />
        <TextField
          label={'Password'}
          autoComplete="off"
          type="password"
          required
          error={errors.password?.message}
          {...register('password', { required: 'Password is required!' })}
        />
        <Button type="submit">Submit</Button>
      </Form>
      <div>
        Don't have an account? <Link href="/sign-up">Create an account!</Link>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Form, Button, TextField } from '@/components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type CreateUserFields = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const SignUp = () => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFields>({
    mode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit: SubmitHandler<CreateUserFields> = async (data) => {
    try {
      if (Object.keys(errors).length === 0) {
        const response = await fetch('/api/user/create', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          // log the user in:
          const loginData = {
            email: data.email,
            password: data.password,
          };

          const loginResponse = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(loginData),
          });
          if (loginResponse.ok) {
            push('/journal');
            return;
          }
          console.log(response);
          return;
        }
      }
    } catch (err) {
      console.error(err);
      return;
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label={'Email'}
          autoComplete="off"
          type="email"
          required
          requiredIndicator
          {...register('email', { required: 'Email is required!' })}
        />
        <TextField
          label={'Password'}
          autoComplete="off"
          type="password"
          required
          requiredIndicator
          {...register('password', { required: 'Password is required!' })}
        />
        <TextField
          label={'Confirm Password'}
          autoComplete="off"
          type="password"
          required
          requiredIndicator
          {...register('passwordConfirmation', {
            required: 'Confirm Password is required!',
          })}
        />
        <Button type="submit">Submit</Button>
      </Form>
      <div>
        Already have an account? <Link href="/login">Sign in!</Link>
      </div>
    </div>
  );
};

export default SignUp;

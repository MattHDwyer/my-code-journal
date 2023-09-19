'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components';

interface JournalLayoutProps {
  children: React.ReactNode;
}

export default function JournalLayout({ children }: JournalLayoutProps) {
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      if (error) {
        push('/login');
        return;
      }
    })();
  }, []);

  const logOut = () => {
    logoutUser();
    push('/login');
  };

  return (
    <main>
      <header>Navigation goes here</header>
      {children}
      <footer>
        <Button onClick={logOut}>Logout</Button>
      </footer>
    </main>
  );
}

interface UserResponse {
  user: string | null;
  error: Error | null;
}

// Will eventually have a User Type;
interface ServerResponse {
  user: string;
}

const createErrorResponse = (message: string): UserResponse => {
  return {
    user: null,
    error: new Error(message),
  };
};

async function getUser(): Promise<UserResponse> {
  try {
    const res: Response = await fetch('/api/auth/verify');

    if (!res.ok) {
      createErrorResponse(`Status Error Code: ${res.status}`);
    }

    const data: ServerResponse = await res.json();

    if (!data.user) {
      return createErrorResponse('User data is missing in server response');
    }

    return {
      user: data.user,
      error: null,
    };
  } catch (err) {
    if (err instanceof Error) {
      return createErrorResponse(
        err.message || 'Uh oh... An unknown error occured!',
      );
    }
    return createErrorResponse('Uh oh... An unknown error occurred!');
  }
}

async function logoutUser(): Promise<any> {
  try {
    const res: Response = await fetch('api/auth/logout', {
      method: 'DELETE',
    });
  } catch (err) {
    alert('Somehow... an error occured: ' + err);
  }
}

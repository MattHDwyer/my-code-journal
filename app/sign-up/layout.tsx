import React from 'react';

interface SignUpLayoutProps {
  children: React.ReactNode;
}

const SignUpLayout = ({ children }: SignUpLayoutProps) => {
  return <main>{children}</main>;
};

export default SignUpLayout;

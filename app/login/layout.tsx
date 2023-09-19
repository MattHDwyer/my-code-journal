import React from 'react';

import styles from './styles.module.scss';
import classnames from 'classnames';

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  const className = classnames(styles.LoginLayout);
  return <main className={className}>{children}</main>;
};

export default LoginLayout;

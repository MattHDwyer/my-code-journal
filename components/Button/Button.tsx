import React, { ButtonHTMLAttributes, forwardRef } from 'react';

import './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, type = 'button', ...props }, ref) => {
    return (
      <button type={type} ref={ref} {...props}>
        {children}
      </button>
    );
  },
);

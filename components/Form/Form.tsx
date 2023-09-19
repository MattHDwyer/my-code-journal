import React, { useCallback } from 'react';

import './Form.module.scss';
import { Text } from '../Text';
import { Button } from '..';

type Method = 'post' | 'get' | 'action';

type Target = '_blank' | '_self' | '_parent' | '_top' | string;

export interface FormProps {
  action?: string;
  children?: React.ReactNode;
  implicitSubmit?: boolean;
  method?: Method;
  name?: string;
  noValidate?: boolean;
  preventDefault?: boolean;
  target?: Target;
  onSubmit(event: React.FormEvent<HTMLFormElement>): unknown;
}

export const Form = ({
  action,
  children,
  implicitSubmit = true,
  method = 'post',
  name,
  noValidate,
  preventDefault = true,
  target,
  onSubmit,
}: FormProps) => {
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      if (!preventDefault) {
        return;
      }
      event.preventDefault();
      onSubmit(event);
    },
    [onSubmit, preventDefault],
  );

  const submitMarkup = implicitSubmit ? (
    <Text as="span" visuallyHidden>
      <Button type="submit" tabIndex={-1} aria-hidden={'true'}>
        Submit
      </Button>
    </Text>
  ) : null;
  return (
    <form
      action={action}
      method={method}
      name={name}
      noValidate={noValidate}
      target={target}
      onSubmit={handleSubmit}
    >
      {submitMarkup}
      {children}
    </form>
  );
};

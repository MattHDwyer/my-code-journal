import React from 'react';
import { Error } from '@/types';
import { Icon } from '../Icon';
import { BsExclamationDiamond } from 'react-icons/bs';

import styles from './InlineError.module.scss';

export interface InlineErrorProps {
  message: Error;
  fieldID: string;
}

export const InlineError = ({ message, fieldID }: InlineErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <div id={errorTextID(fieldID)} className={styles.InlineError}>
      <div className={styles.Icon}>
        <Icon source={<BsExclamationDiamond />} />
      </div>
      {message}
    </div>
  );
};

export function errorTextID(id: string) {
  return `${id}Error`;
}

import React from 'react';
import classnames from 'classnames';
import { Icon } from '../Icon';
import { ImSpinner2 } from 'react-icons/im';

import styles from './LoadingSpinner.module.scss';

export interface LoadingSpinnerProps {}

export const LoadingSpinner = ({}: LoadingSpinnerProps) => {
  return (
    <div className={classnames(styles.LoadingSpinner)}>
      <Icon source={<ImSpinner2 style={{ height: 100, width: 100 }} />} />
    </div>
  );
};

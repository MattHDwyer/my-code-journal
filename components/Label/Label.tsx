import React from 'react';
import classnames from 'classnames';

import styles from './Label.module.scss';

export interface LabelProps {
  children?: React.ReactNode;
  id: string;
  hidden?: boolean;
  requiredIndicator?: boolean;
}

export function labelID(id: string) {
  return `${id}Label`;
}

export const Label = ({
  children,
  id,
  hidden,
  requiredIndicator,
}: LabelProps) => {
  const className = classnames(styles.Label, hidden && styles.hidden);

  return (
    <div className={className}>
      <label
        id={labelID(id)}
        htmlFor={id}
        className={classnames(
          styles.Text,
          requiredIndicator && styles.RequiredIndicator,
        )}
      >
        {children}
      </label>
    </div>
  );
};

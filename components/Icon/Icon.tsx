import React from 'react';
import classnames from 'classnames';

import styles from './Icon.module.scss';

export interface IconProps {
  source: React.ReactNode;
}

export const Icon = ({ source }: IconProps) => {
  const className = classnames(styles.Icon);
  return <span className={className}>{source}</span>;
};

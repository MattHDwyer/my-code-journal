import React from 'react';
import { Label, LabelProps, labelID } from '../Label';
import { Action, ComplexAction, Error } from '@/types';
import classNames from 'classnames';
import { InlineError } from '..';

import styles from './Labelled.module.scss';
import { buttonFrom } from '../Button';

export { labelID };

export interface LabelledProps {
  id: LabelProps['id'];
  label: React.ReactNode;
  error?: Error | boolean;
  action?: Action;
  children?: React.ReactNode;
  labelHidden?: boolean;
  requiredIndicator?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

export const Labelled = ({
  id,
  label,
  error,
  action,
  children,
  labelHidden,
  requiredIndicator,
  disabled,
  readOnly,
  ...rest
}: LabelledProps) => {
  const className = classNames(
    labelHidden && styles.hidden,
    disabled && styles.disabled,
    readOnly && readOnly,
  );

  const actionMarkup = action ? (
    <div className={styles.Action}>{buttonFrom(action, { plain: true })}</div>
  ) : null;

  const errorMarkup = error && typeof error !== 'boolean' && (
    <div className={styles.Error}>
      <InlineError message={error} fieldID={id} />
    </div>
  );

  const labelMarkup = label ? (
    <div className={styles.LabelWrapper}>
      <Label id={id} requiredIndicator {...rest} hidden={false}>
        {label}
      </Label>

      {actionMarkup}
    </div>
  ) : null;

  return (
    <div className={className}>
      {labelMarkup}
      {children}
      {errorMarkup}
    </div>
  );
};

export function errorID(id: string) {
  return `${id}Error`;
}

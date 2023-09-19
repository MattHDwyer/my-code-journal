import React from 'react';
import classnames from 'classnames';

import styles from './Text.module.scss';

type Element =
  | 'dt'
  | 'dd'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'strong'
  | 'legend';

type Alignment = 'start' | 'center' | 'end' | 'justify';

export interface TextProps {
  children: React.ReactNode;
  as: Element;
  id?: string;
  visuallyHidden?: boolean;
  breakWord?: boolean;
  truncate?: boolean;
  lineThrough?: boolean;
  alignment?: Alignment;
}

export const Text = ({
  children,
  as,
  id,
  visuallyHidden = false,
  breakWord,
  truncate,
  lineThrough,
  alignment,
}: TextProps) => {
  const Component = as || (visuallyHidden ? 'span' : 'p');

  const className = classnames(
    styles.root,
    breakWord && styles.break,
    visuallyHidden && styles.VisuallyHidden,
    truncate && styles.Truncate,
    lineThrough && styles.LineThrough,
    truncate && styles.block,
    alignment && styles[alignment],
  );

  return (
    <Component className={className} {...(id && { id })}>
      {children}
    </Component>
  );
};

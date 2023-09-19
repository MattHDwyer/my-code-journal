export type HeadingTagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

export type Target = '_blank' | '_self' | '_parent' | '_top';

export type Error =
  | string
  | React.ReactElement
  | (string | React.ReactElement)[];

export interface Action {
  id?: string;
  content?: string;
  accessibilityLabel?: string;
  url?: string;
  external?: boolean;
  target?: Target;
  onAction?(): void;
  onMouseEnter?(): void;
  onTouchStart?(): void;
}

export interface DisableableAction extends Action {
  disabled?: boolean;
}

export interface IconableAction extends Action {
  icon?: React.ReactNode;
}

export interface LoadableAction extends Action {
  loading?: boolean;
}

export interface PlainAction extends Action {
  // Action will display as plain link
  plain?: boolean;
}

export interface OptionDescriptor {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  id?: string;
}

export type IconSource =
  | React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  | 'placeholder'
  | string;

export interface ComplexAction
  extends Action,
    DisableableAction,
    IconableAction,
    LoadableAction,
    PlainAction {}

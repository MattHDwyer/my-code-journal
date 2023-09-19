'use client';

import React, { createElement, useEffect, useId, useRef } from 'react';
import { Labelled, LabelledProps } from '../Labelled';
import { Error } from '@/types';

import './TextField.module.scss';

type Type =
  | 'text'
  | 'email'
  | 'number'
  | 'integer'
  | 'password'
  | 'search'
  | 'tel'
  | 'url'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'time'
  | 'week'
  | 'currency';

type Alignment = 'left' | 'center' | 'right';

type InputMode =
  | 'none'
  | 'text'
  | 'decimal'
  | 'numeric'
  | 'tel'
  | 'search'
  | 'email'
  | 'url';

interface SelectSuggestion {
  suggestion?: string;
}

interface SelectTextOnFocus {
  selectTextOnFocus?: true;
}

interface Readonly {
  readonly?: true;
}

interface Disabled {
  disabled?: true;
}

interface Interactive {
  onChange(value: string, id: string): void;
}

interface TextFieldProps {
  /** Text to display before value */
  prefix?: React.ReactNode;
  /** Text to display after value */
  suffix?: React.ReactNode;
  /** Content to vertically display above the input value */
  verticalContent?: React.ReactNode;
  /** Hint text to display */
  placeholder?: string;
  /** Initial value for the input */
  value?: string;
  /** Additional hint text to display */
  helpText?: React.ReactNode;
  /** Label for the input */
  label: React.ReactNode;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  className?: string;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Disable the input */
  disabled?: boolean;
  /** Show a clear text button in the input */
  clearButton?: boolean;
  /** Indicates whether or not the entire value should be selected on focus. */
  selectTextOnFocus?: boolean;
  /** An inline autocomplete suggestion containing the input value. The characters that complete the input value are selected for ease of deletion on input change or keypress of Backspace/Delete. The selected substring is visually highlighted with subdued styling. */
  suggestion?: string;
  /** Disable editing of the input */
  readOnly?: boolean;
  /** Automatically focus the input */
  autoFocus?: boolean;
  /** Force the focus state on the input */
  focused?: boolean;
  /** Allow for multiple lines of input */
  multiline?: boolean | number;
  /** Error to display beneath the label */
  error?: Error | boolean;
  /** An element connected to the right of the input */
  connectedRight?: React.ReactNode;
  /** An element connected to the left of the input */
  connectedLeft?: React.ReactNode;
  /** Determine type of input */
  type?: Type;
  /** Name of the input */
  name?: string;
  /** ID for the input */
  id?: string;
  /** Defines a specific role attribute for the input */
  role?: string;
  /** Limit increment value for numeric and date-time inputs */
  step?: number;
  /** Increment value for numeric and date-time inputs when using Page Up or Page Down */
  largeStep?: number;
  /** Enable automatic completion by the browser. Set to "off" when you do not want the browser to fill in info */
  autoComplete: string;
  /** Mimics the behavior of the native HTML attribute, limiting the maximum value */
  max?: number | string;
  /** Maximum character length for an input */
  maxLength?: number;
  /** Maximum height of the input element. Only applies when `multiline` is `true` */
  maxHeight?: number | string;
  /** Mimics the behavior of the native HTML attribute, limiting the minimum value */
  min?: number | string;
  /** Minimum character length for an input */
  minLength?: number;
  /** A regular expression to check the value against */
  pattern?: string;
  /** Choose the keyboard that should be used on mobile devices */
  inputMode?: InputMode;
  /** Indicate whether value should have spelling checked */
  spellCheck?: boolean;
  /** Indicates whether or not the character count should be displayed */
  showCharacterCount?: boolean;
  /** Determines the alignment of the text in the input */
  align?: Alignment;
  /** Visual required indicator, adds an asterisk to label */
  requiredIndicator?: boolean;
  /** Indicates whether or not a monospaced font should be used */
  monospaced?: boolean;
  /** Callback fired when clear button is clicked */
  onClearButtonClick?(id: string): void;
  /** Callback fired when value is changed */
  onBlur?(event: React.ChangeEvent<HTMLInputElement>): void;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Callback fired when input is focused */
  onFocus?: (event: React.FocusEvent) => void;
  /** Callback fired when input is blurred */
  /** Removes the border around the input. Used in the IndexFilters component. */
  borderless?: boolean;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      prefix,
      suffix,
      verticalContent,
      placeholder,
      value,
      helpText,
      label,
      labelAction,
      labelHidden,
      disabled,
      clearButton,
      readOnly,
      autoFocus,
      focused,
      multiline,
      error,
      connectedRight,
      connectedLeft,
      type = 'text',
      name,
      id: idProp,
      role,
      step,
      largeStep,
      autoComplete,
      max,
      maxLength,
      maxHeight,
      min,
      minLength,
      pattern,
      inputMode,
      spellCheck,
      className,
      showCharacterCount,
      align,
      requiredIndicator,
      monospaced,
      selectTextOnFocus,
      suggestion,
      onClearButtonClick,
      onClick,
      onChange,
      onFocus,
      onBlur,
      borderless,
    }: TextFieldProps,
    ref,
  ) => {
    const uniqId = useId();
    const id = idProp ?? uniqId;

    const inputRef = useRef<HTMLInputElement & { value?: string }>(null);

    useEffect(() => {
      const input = inputRef.current;
      if (!input || focused === undefined) return;
      focused ? input.focus() : input.blur();
    }, [focused]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(event);
    };

    const input = createElement(multiline ? 'textarea' : 'input', {
      name,
      id,
      disabled,
      readOnly,
      role,
      autoFocus,
      value,
      placeholder,
      autoComplete,
      className,
      ref: ref ? ref : inputRef,
      min,
      max,
      step,
      minLength,
      maxLength,
      spellCheck,
      pattern,
      inputMode,
      type,
      rows: getRows(multiline),
      onFocus,
      onBlur,
      required: requiredIndicator,
      onChange: handleChange,
      'aria-required': requiredIndicator,
      'aria-invalid': Boolean(error),
    });

    return (
      <Labelled
        label={label}
        action={labelAction}
        id={id}
        error={error}
        labelHidden={labelHidden}
        requiredIndicator={requiredIndicator}
        disabled={disabled}
        readOnly={readOnly}
      >
        <div className={className} onClick={onClick}>
          {input}
        </div>
      </Labelled>
    );

    // function handleClick(event: React.MouseEvent<HTMLInputElement>) {
    //   const { target } = event;

    //   if (isInput(target)) {
    //     return;
    //   }

    //   inputRef.current?.focus();
    // }

    // function isInput(target: HTMLElement | EventTarget) {
    //   return (
    //     target instanceof HTMLElement &&
    //     inputRef.current &&
    //     (inputRef.current.contains(target) ||
    //       inputRef.current.contains(document.activeElement))
    //   );
    // }
  },
);

function getRows(multiline?: boolean | number) {
  if (!multiline) return undefined;

  return typeof multiline === 'number' ? multiline : 1;
}

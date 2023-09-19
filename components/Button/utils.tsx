import { Button } from './Button';
import { ComplexAction } from '@/types';

export function buttonFrom(
  { content, onAction, ...action }: ComplexAction,
  key?: any,
) {
  return (
    <Button key={key} onClick={onAction} {...action}>
      {content}
    </Button>
  );
}

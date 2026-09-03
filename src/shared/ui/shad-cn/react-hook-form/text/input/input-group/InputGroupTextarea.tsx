'use client';

import type { ComponentProps } from 'react';

import { cn } from '@shad-cn/helpers';
import { Textarea } from '@shad-cn/Textarea';

function InputGroupTextarea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <Textarea
      data-slot='input-group-control'
      className={cn(
        'flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent',
        className,
      )}
      {...props}
    />
  );
}

export { InputGroupTextarea };

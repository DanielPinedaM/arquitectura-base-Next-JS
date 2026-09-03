'use client';

import * as React from 'react';

import { cn } from '@shad-cn/helpers';
import { InputBase } from '@shad-cn/InputBase';

function InputGroupInput({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputBase
      data-slot='input-group-control'
      className={cn(
        'flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent',
        className,
      )}
      {...props}
    />
  );
}

export { InputGroupInput };

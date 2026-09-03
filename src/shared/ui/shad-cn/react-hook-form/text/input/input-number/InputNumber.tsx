'use client';

import * as React from 'react';

import { InputBase } from '@shad-cn/InputBase';

interface InputNumberProps extends Omit<
  React.ComponentProps<'input'>,
  'type' | 'value' | 'onChange'
> {
  value?: number | null;
  onValueChange?: (value: number | null) => void;
}

function parseValue(rawValue: string): number | null {
  if (String(rawValue) === '') return null;

  const parsedValue = Number(rawValue);

  if (Number.isNaN(parsedValue)) return null;

  return parsedValue;
}

/**
 * Input numérico: InputBase con `type="number"`.
 *
 * El `type="number"` nativo aporta los botones de incremento/decremento.
 * Para decimales, el consumidor define `step` (ejemplo: `step="0.01"`).
 *
 * El `<input>` nativo trabaja con string y el modelo del formulario con number:
 * `value` se formatea a string al renderizar y `onValueChange` emite el number.
 */
function InputNumber({ value, onValueChange, ...props }: InputNumberProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onValueChange?.(parseValue(event.target.value));
  };

  return (
    <InputBase
      type='number'
      inputMode='decimal'
      value={value ?? ''}
      onChange={handleChange}
      {...props}
    />
  );
}

export { InputNumber };

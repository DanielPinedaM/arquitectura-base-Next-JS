'use client';

import type { ChangeEvent, ComponentProps } from 'react';

import { InputBase } from '@shad-cn/InputBase';

interface InputNumberProps extends Omit<ComponentProps<'input'>, 'type' | 'value' | 'onChange'> {
  value?: number | null;
  onValueChange?: (value: number | null) => void;
}

function parseValue(rawValue: string | number): number | null {
  const stringValue = String(rawValue);

  if (stringValue === '') return null;

  if (stringValue.trim() === '0') return 0;

  if (rawValue === 0) return 0;

  if (!rawValue) return null;

  const numberValue = Number(rawValue);

  if (Number.isNaN(numberValue)) return null;

  return numberValue;
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
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
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

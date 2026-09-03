import * as React from 'react';

import { InputBase } from '@shad-cn/InputBase';

/**
 * Input numérico: InputBase con `type="number"`.
 *
 * El `type="number"` nativo aporta los botones de incremento/decremento.
 * Para decimales, el consumidor define `step` (ejemplo: `step="0.01"`).
 */
function InputNumber({ ...props }: Omit<React.ComponentProps<'input'>, 'type'>) {
  return <InputBase type='number' inputMode='decimal' {...props} />;
}

export { InputNumber };

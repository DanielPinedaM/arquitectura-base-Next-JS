import * as React from 'react';

import { InputBase } from '@shad-cn/InputBase';

/**
 * Input de correo: InputBase con `type="email"`.
 *
 * La validación del formato se define en el schema de Zod del formulario padre,
 * nunca dentro de este componente.
 */
function InputEmail({ ...props }: Omit<React.ComponentProps<'input'>, 'type'>) {
  return <InputBase type='email' inputMode='email' autoComplete='email' {...props} />;
}

export { InputEmail };

import type { ComponentProps } from 'react';

import { InputBase } from '@shad-cn/InputBase';

/** Input de texto libre: InputBase con `type="text"`. */
function InputText({ ...props }: Omit<ComponentProps<'input'>, 'type'>) {
  return <InputBase type='text' {...props} />;
}

export { InputText };

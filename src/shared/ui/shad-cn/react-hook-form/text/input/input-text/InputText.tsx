import * as React from 'react';

import { InputBase } from '@shad-cn/InputBase';

/** Input de texto libre: InputBase con `type="text"`. */
function InputText({ ...props }: Omit<React.ComponentProps<'input'>, 'type'>) {
  return <InputBase type='text' {...props} />;
}

export { InputText };

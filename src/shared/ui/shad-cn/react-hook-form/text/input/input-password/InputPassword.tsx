'use client';

import { useState, type ComponentProps } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';

import { InputGroup } from '@shad-cn/InputGroup';
import { InputGroupAddon } from '@shad-cn/InputGroupAddon';
import { InputGroupButton } from '@shad-cn/InputGroupButton';
import { InputGroupInput } from '@shad-cn/InputGroupInput';

/**
 * Input de contraseña con botón toggle para mostrar/ocultar el valor.
 *
 * El `useState` solo guarda la visibilidad del valor (estado de UI),
 * nunca el valor del campo: ese lo administra React Hook Form.
 */
function InputPassword({
  className,
  disabled,
  ...props
}: Omit<ComponentProps<'input'>, 'type'>) {
  const [isValueVisible, setIsValueVisible] = useState<boolean>(false);

  const toggleValueVisibility = (): void => {
    setIsValueVisible((previousValue) => !previousValue);
  };

  return (
    <InputGroup className={className}>
      <InputGroupInput type={isValueVisible ? 'text' : 'password'} disabled={disabled} {...props} />

      <InputGroupAddon align='inline-end'>
        <InputGroupButton
          size='icon-xs'
          disabled={disabled}
          onClick={toggleValueVisibility}
          aria-label={isValueVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          aria-pressed={isValueVisible}
        >
          {isValueVisible ? <LuEyeOff /> : <LuEye />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}

export { InputPassword };

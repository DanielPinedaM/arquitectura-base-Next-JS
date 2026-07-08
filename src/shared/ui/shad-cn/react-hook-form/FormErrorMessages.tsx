'use client';
import { ErrorMessage } from '@hookform/error-message';

interface IGeneralErrorMessage {
  errors: any;
  name: string;
}

/**
Componente que muestra los mensajes de error
de los campos (input) de formulario de React Hook Form */
export default function FormErrorMessages({ errors, name }: IGeneralErrorMessage) {
  if (!errors || !name) return null;

  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message], i) => (
          <>
            {message && (
              <p className='text-red-600' key={`${i}-${type}`}>
                {message}
              </p>
            )}
          </>
        ))
      }
    />
  );
}

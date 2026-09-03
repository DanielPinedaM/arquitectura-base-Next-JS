'use client';
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, FieldPath, FieldValues } from 'react-hook-form';

interface IGeneralErrorMessage<TFieldValues extends FieldValues> {
  errors: FieldErrors<TFieldValues>;
  name: FieldPath<TFieldValues>;
}

/**
Componente que muestra los mensajes de error
de los campos (input) de formulario de React Hook Form */
export default function FormErrorMessages<TFieldValues extends FieldValues>({
  errors,
  name,
}: IGeneralErrorMessage<TFieldValues>) {
  if (!errors || !name) return null;

  return (
    <ErrorMessage
      errors={errors as FieldErrors<FieldValues>}
      name={name}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(
          ([type, message], i) =>
            message && (
              <p className='text-red-600' key={`${i}-${type}`}>
                {message}
              </p>
            ),
        )
      }
    />
  );
}

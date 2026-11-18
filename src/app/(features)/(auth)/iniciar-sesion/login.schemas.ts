import { z } from 'zod';

export const loginSchemaWithoutValidations = z.object({
  email: z.string({ error: 'Correo es obligatorio' }),
  password: z.string({ error: 'Contraseña es obligatoria' }),
});

export const loginSchemaWithValidations = z.object({
  email: z
    .string({ error: 'Correo es obligatorio' })
    .min(1, 'Correo es obligatorio')
    .pipe(z.email('Correo invalido')),

  password: z.string({ error: 'Contraseña es obligatoria' }).min(1, 'Contraseña es obligatoria'),
});

export type IFormLogin = z.infer<typeof loginSchemaWithValidations>;

export const loginSchema = (isLocalhost: boolean) =>
  isLocalhost ? loginSchemaWithoutValidations : loginSchemaWithValidations;

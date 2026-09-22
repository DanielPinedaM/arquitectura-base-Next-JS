'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorToast from '@/shared/ui/overlay/toast/ErrorToast';
import FormErrorMessages from '@/shared/ui/shad-cn/react-hook-form/FormErrorMessages';
import { deleteCookie, getCookies, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { InputText } from '@shad-cn/InputText';
import { InputPassword } from '@shad-cn/InputPassword';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IFormLogin, loginSchema } from '@/app/(features)/(auth)/iniciar-sesion/login.schema';
import {
  forceConvertToString,
  isLiteralObject,
  literalObjectLength,
} from '@/shared/utils/func/dataType.utils';
import { sessionStorageDeleteAll } from '@/shared/utils/func/sessionStorage.utils';
import { encrypt } from '@/shared/utils/func/crypto-js.utils';
import { IRequestOptions } from '@/shared/api/http-client/data-types/interfaces/gateway.interface';
import { POST } from '@/shared/api/http-client/http-gateway.api';
import Button from '@/shared/ui/buttons/Button';

interface IUserDataResponse {
  expiresIn: number;
  [key: string]: unknown;
}

const isLocalhost = (): boolean =>
  typeof window !== 'undefined' && window?.location?.hostname === 'localhost';

const defaultCredentials = async (): Promise<IFormLogin> =>
  isLocalhost()
    ? {
        email: process.env.NEXT_PUBLIC_AUTH_USER ?? '',
        password: process.env.NEXT_PUBLIC_AUTH_PASSWORD ?? '',
      }
    : {
        email: '',
        password: '',
      };

export default function FormLogin() {
  const {
    formState: { errors, isLoading },
    handleSubmit,
    control,
  } = useForm<IFormLogin>({
    criteriaMode: 'all',
    defaultValues: defaultCredentials,
    resolver: (values, context, options) =>
      zodResolver(loginSchema(isLocalhost()))(values, context, options),
  });

  const router = useRouter();

  useEffect(() => {
    deleteStorageAndCookies();
  }, []);

  useEffect(() => {
    // cuando el dominio es local host, quemar las credenciales e iniciar sesion automaticamente
    if (isLoading || !isLocalhost()) return;

    handleSubmit(onSubmit)();
  }, [isLoading]);

  const deleteStorageAndCookies = (): void => {
    deleteAllCookies();
    sessionStorageDeleteAll();
  };

  const deleteAllCookies = (): void => {
    const cookies = getCookies();

    if (cookies) {
      Object.keys(cookies).forEach((cookieName: string) => {
        deleteCookie(cookieName);
      });
    }
  };

  const iterateUserData = (data: unknown): void => {
    if (!data) {
      console.error(
        '❌ error, NO se puede setear las cookies porque la api ha respondido con un valor falsy\n',
        data,
      );
      return;
    }

    if (!isLiteralObject(data)) {
      console.error(
        '❌ error, NO se puede setear las cookies porque la api NO ha respondido con un objeto literal\n',
        data,
      );
      return;
    }

    if (literalObjectLength(data) <= 0) {
      console.error(
        '❌ error, NO se puede setear las cookies porque la api ha respondido con un objeto literal vacio\n',
        data,
      );
      return;
    }

    const userData = data as IUserDataResponse;

    // el tiempo de expiracion de las cookies en front y el token en back son los mismos
    const maxAge: number = userData.expiresIn;

    if (!maxAge) {
      console.error(
        '❌ error, NO se puede setear las cookies porque la api no ha respondido con el tiempo de expiracion de las cookies\n',
        maxAge,
      );
      return;
    }

    Object.entries(userData).forEach((entry) => {
      const [key, value] = entry;
      if (!key || !value) {
        console.error(
          '❌ error, NO se puede setear las cookies porque una key ó value es falsy',
          '\nkey ',
          key,
          '\nvalue ',
          value,
        );
        return;
      }

      // setCookie(key, forceConvertToString(value), cookieOptions({ maxAge }));
    });
  };

  const encryptCredentials = async (
    decryptedEmail: string,
    decryptedPassword: string,
  ): Promise<{ encryptedEmail: string; encryptedPassword: string }> => {
    const [encryptedEmail, encryptedPassword] = await Promise.all([
      await encrypt(decryptedEmail),
      await encrypt(decryptedPassword),
    ]);

    return { encryptedEmail, encryptedPassword };
  };

  const onSubmit = async (formData: IFormLogin): Promise<void> => {
    const { email, password } = formData;

    const { encryptedEmail, encryptedPassword } = await encryptCredentials(email, password);

    const optionsApi: IRequestOptions<IFormLogin> = {
      body: {
        email: encryptedEmail,
        password: encryptedPassword,
      },
    };

    //des-comentar lo q esta comentado a continuacion para hacer peticion http de iniciar sesion

    //const { success, message, data } = await POST(`${process.env.NEXT_PUBLIC_API}auth/login`, optionsApi);

    /* if (!success) {
      deleteStorageAndCookies();
      ErrorToast(message);
      return;
    } */

    // este codigo se tiene q borrar porq queme los datos
    iterateUserData({
      expiresIn: 7200,
    });

    /* este es el codigo correcto q se tiene q des-comentar
    iterateUserData(data); */

    router.push('/tareas');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
      <div className='mb-2'>
        <label>
          <span className='cursor-pointer'>Correo electrónico</span>
          <Controller
            name='email'
            control={control}
            render={({
              field,
              field: { name, value = '', onChange, onBlur },
              fieldState: { invalid },
            }) => (
              <InputText
                {...field}
                id={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                aria-invalid={invalid}
                placeholder='nombre@correo.com'
                className={`block w-full`}
              />
            )}
          />
        </label>
        <FormErrorMessages errors={errors} name='email' />
      </div>

      <div className='mb-2'>
        <label>
          <span className='cursor-pointer'>Contraseña</span>
          <Controller
            name='password'
            control={control}
            render={({
              field,
              field: { name, value = '', onChange, onBlur },
              fieldState: { invalid },
            }) => (
              <InputPassword
                {...field}
                id={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                aria-invalid={invalid}
                placeholder='********'
              />
            )}
          />
        </label>
        <FormErrorMessages errors={errors} name='password' />
      </div>

      <div className='flex justify-end'>
        <Button theme='primary' variant='background' type='submit'>
          Ingresar
        </Button>
      </div>
    </form>
  );
}

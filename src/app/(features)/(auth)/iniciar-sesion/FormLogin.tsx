'use client';
import ErrorToast from '@/shared/ui/overlay/toast/ErrorToast';
import FormErrorMessages from '@/shared/ui/shad-cn/react-hook-form/FormErrorMessages';
import { cookieOptions } from '@/app/(features)/(auth)/iniciar-sesion/data-types/constants/cookies-options.const';
import { deleteCookie, getCookies, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CONST_REGEX from '@/shared/data-types/constants/regex.constants';
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

interface IBodyLogin {
  email: string;
  password: string;
}

interface IFormLogin {
  user: string;
  password: string;
}

interface IUserDataResponse {
  expiresIn: number;
  [key: string]: unknown;
}

export default function FormLogin() {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormLogin>({
    criteriaMode: 'all',
  });

  const router = useRouter();

  useEffect(() => {
    deleteStorageAndCookies();
  }, []);

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

      setCookie(key, forceConvertToString(value), cookieOptions({ maxAge }));
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
    //des-comentar lo q esta comentado a continuacion para hacer peticion http de iniciar sesion
    const { user, password } = formData;

    const { encryptedEmail, encryptedPassword } = await encryptCredentials(
      user!.trim(),
      password!.trim(),
    );

    const optionsApi: IRequestOptions<IBodyLogin> = {
      body: {
        email: encryptedEmail,
        password: encryptedPassword,
      },
    };

    //const { success, message, data } = await POST(process.env.NEXT_PUBLIC_AUTH_LOGIN, optionsApi);

    //if (success) {
    // este codigo se tiene q borrar porq queme los datos
    iterateUserData({
      expiresIn: 7200,
    });

    /* este es el codigo correcto q se tiene q des-comentar
    iterateUserData(data); */

    router.push('/administrador');
    //} else {
    //deleteStorageAndCookies();
    //ErrorToast(message);
    //}
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <div className='mb-2'>
          <label>
            <span className='cursor-pointer'>Correo electrónico</span>
            <Controller
              name='user'
              control={control}
              rules={{
                required: 'Digite correo electrónico',
                pattern: {
                  value: CONST_REGEX.text.email,
                  message: 'Correo electrónico invalido',
                },
                minLength: {
                  value: 2,
                  message: 'Mínimo 2 caracteres',
                },
                maxLength: {
                  value: 30,
                  message: 'Máximo 30 caracteres',
                },
              }}
              render={({ field, field: { name, value = '', onChange, onBlur } }) => (
                <InputText
                  {...field}
                  id={name}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  placeholder='nombre@correo.com'
                  className={`block w-full`}
                />
              )}
            />
          </label>
          <FormErrorMessages errors={errors} name='user' />
        </div>

        <div className='mb-2'>
          <label>
            <span className='cursor-pointer'>Contraseña</span>
            <Controller
              name='password'
              control={control}
              rules={{
                required: 'Digite contraseña',
              }}
              render={({ field, field: { name, value = '', onChange, onBlur } }) => (
                <Password
                  {...field}
                  id={name}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  variant='filled'
                  feedback={false}
                  placeholder='Contraseña'
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
    </>
  );
}

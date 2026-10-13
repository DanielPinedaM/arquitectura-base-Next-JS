'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { forceConvertToString, literalObjectLength } from '@/shared/utils/func/dataType.utils';

interface IOptionsSetQueryParams {
  replaceAll?: boolean;
  customPathname?: string;
}

export const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Custom hook para setear (actualizar) query params
   * En vez de usar params.set(), es mejor usar este custom hook setQueryParams()
   * http://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams
   *
   * @param paramsObj - objeto literal con query params a actualizar
   * @param customPathname - ruta personalizada a la cual se le setea los query params, por defecto es la ruta actual
   * @param options.replaceAll - true = actualizar los nuevos valores cuando las keys de paramsObj existen en los query params, false = reemplazar POR COMPLETO por nuevos query params */
  const setQueryParams = useCallback(
    (paramsObj: Record<string, any> = {}, options?: IOptionsSetQueryParams): void => {
      const { replaceAll = false, customPathname = null } = options ?? {};

      // uso window.location.pathname porque usePathname() NO actualiza la ruta actual
      const pathname: string = window.location.pathname;

      // uso window.location.search porque useSearchParams() NO actualiza la variable oldUrl con el ultimo query params
      const currentParams = new URLSearchParams(window.location.search);

      // url ANTES de actualizar query params
      const oldUrl: string = currentParams.toString()
        ? `${pathname}?${currentParams.toString()}`
        : pathname;

      const params: URLSearchParams = replaceAll
        ? new URLSearchParams() // se parte de cero, sin query actual
        : new URLSearchParams(currentParams.toString()); // se parte del query actual

      if (literalObjectLength(paramsObj) > 0) {
        Object.entries(paramsObj).forEach(([key, value]) => {
          params.set(String(key), forceConvertToString(value));
        });
      }

      // url DESPUES de actualizar query params
      const newUrl: string = `${customPathname ?? pathname}${params ? `?${params.toString()}` : ''}`;

      // NO actualizar la URL cuando los query params no han cambiado
      if (oldUrl !== newUrl) {
        router.push(newUrl);
      }
    },
    [router, searchParams],
  );

  return { setQueryParams };
};

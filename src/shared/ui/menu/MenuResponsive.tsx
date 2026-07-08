'use client';
import ErrorToast from '@/shared/ui/overlay/toast/ErrorToast';

import {
  sessionStorageDeleteSpecific,
  sessionStorageListValue,
  sessionStorageSaveAndUpdate,
  sessionStorageSearch,
} from '@/shared/utils/func/sessionStorage.utils';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useMenuStore } from '@/shared/ui/menu/store/menu.store';

interface IUrl {
  id: number;
  text: string;
  url: string;
}

const API_RESPONSE: IUrl[] = [
  {
    id: 1,
    url: '/administrador',
    text: 'Administrador',
  },
  {
    id: 2,
    url: '/usuario',
    text: 'Usuario',
  },
];

export default function MenuResponsive() {
  const pathname = usePathname();

  const { showMenu, hiddenMenu } = useMenuStore();

  const [url, setUrl] = useState<IUrl[] | undefined>(undefined);

  /*
  Para q menu funcione
  1) borrar el siguiente useEffect
  2) borrar la constante API_RESPONSE
  3) descomentar el codigo q esta comentado
  4) cambiar el parametro URL de la funcion listUrl q esta en src/services/auth.ts por la URL q tiene en endpoint para listar menu
  5) la API tiene q responder asi 
  interface ApiResponse {
    success: boolean;
    status: number;
    message: string;
    data: IUrl[];
  } */
  useEffect(() => {
    setUrl(API_RESPONSE);
  }, []);

  /* useEffect(() => {
    if (sessionStorageSearch('menu')) {
      setUrl(sessionStorageListValue('menu'));
    } else {
      _listUrl();
    }
  }, []);

  const setMenuInStorage = (data: IUrl[]): void => {
    if (!data || data?.length === 0) {
      console.error('❌ error, el endpoint de listar opciones del menu no tiene datos data', data);
      ErrorToast('Al mostrar el menu');
      sessionStorageDeleteSpecific('menu');
      setUrl([]);

      return;
    }

    sessionStorageSaveAndUpdate('menu', data);
    setUrl(data);
  };

  const _listUrl = async (): Promise<void> => {
    const { success, data } = await GET(`${process.env.NEXT_PUBLIC_API}`);

    if (success) {
      setMenuInStorage(data ?? []);
    } else {
      setUrl([]);
      console.error('❌ error en la llamada al endpoint q lista las opciones del menu');
      ErrorToast('Al mostrar el menu');
    }
  }; */

  const RenderMenu = () => (
    <>
      {url?.map((item: IUrl) => (
        <li key={item.id} className='transition duration-300 hover:text-blue-ocean'>
          <a
            href={item.url}
            onClick={hiddenMenu}
            className={twMerge(
              clsx({
                'bg-amber-300 text-amber-800 font-semibold': pathname.includes(item.url),
              }),
              'border-2 border-blue-600 rounded-md p-2',
            )}
          >
            item.text
          </a>
        </li>
      ))}
    </>
  );

  return (
    <>
      {showMenu && (
        <menu className='h-full gap-y-1 flex flex-col py-4 px-2 fixed left-0 top-0 xl:static bg-blue-600/50 rounded-tr-2xl rounded-tb-2xl'>
          {url && url?.length > 0 && <RenderMenu />}
        </menu>
      )}
    </>
  );
}

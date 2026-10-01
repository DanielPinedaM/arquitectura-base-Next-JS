'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { GET } from '@/shared/api/http-client/http-gateway.api';
import NextLink from '@/shared/ui/buttons/NextLink';

interface IUrl {
  id: number;
  text: string;
  url: string;
}

interface MenuProps {
  isPublicRoute: boolean;
  isMenuOpen: boolean;
  onCloseMenu: () => void;
}

const MENU_STORAGE_KEY: string = 'menu';

const MENU_MOCK: IUrl[] = [
  {
    id: 1,
    text: 'Tareas',
    url: '/tareas',
  },
];

const readMenuFromStorage = (): IUrl[] | null => {
  try {
    const menu: string | null = localStorage.getItem(MENU_STORAGE_KEY);

    return menu ? JSON.parse(menu) : null;
  } catch {
    return null;
  }
};

const saveMenuInStorage = (menu: IUrl[]): void => {
  try {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menu));
  } catch {}
};

export default function Menu({ isPublicRoute, isMenuOpen, onCloseMenu }: MenuProps) {
  const [url, setUrl] = useState<IUrl[]>([]);

  useEffect(() => {
    loadMenu();
  }, [isPublicRoute]);

  const loadMenu = (): void => {
    if (isPublicRoute) return;

    const menu: IUrl[] | null = readMenuFromStorage();

    if (menu) {
      setUrl(menu);
    } else {
      listUrl();
    }
  };

  const listUrl = async (): Promise<void> => {
    const { success, data } = await GET(`${process.env.NEXT_PUBLIC_API}`);

    if (!success) {
      console.error('❌ error en la llamada al endpoint que lista las opciones del menu');
      // TODO: borrar esta línea cuando exista el endpoint que lista las opciones del menú
      setUrl(MENU_MOCK);
      return;
    }

    saveMenuInStorage(data ?? []);
    setUrl(data ?? []);
  };

  if (isPublicRoute) return null;

  return (
    <menu
      inert={!isMenuOpen}
      className={clsx(
        'fixed inset-x-0 top-14 bottom-0 z-50 flex flex-col gap-3 overflow-y-auto bg-white/90 px-6 py-6 text-black backdrop-blur dark:bg-neutral-950/90 dark:text-white transition-all duration-200 ease-out',
        isMenuOpen
          ? 'visible translate-y-0 opacity-100'
          : 'invisible pointer-events-none -translate-y-2 opacity-0',
      )}
    >
      {url.map((item: IUrl) => (
        <li key={item.id}>
          <NextLink href={item.url} variant='link' size='2xl' onClick={onCloseMenu}>
            {item.text}
          </NextLink>
        </li>
      ))}
    </menu>
  );
}

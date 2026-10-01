'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { MdDarkMode, MdLightMode, MdLogout } from 'react-icons/md';
import clsx from 'clsx';
import { GET } from '@/shared/api/http-client/http-gateway.api';
import Button from '@/shared/ui/buttons/Button';
import NextLink from '@/shared/ui/buttons/NextLink';
import InfoToast from '@/shared/ui/overlay/toast/InfoToast';

interface IUrl {
  id: number;
  text: string;
  url: string;
}

/** Rutas antes de iniciar sesión: en ellas no se muestra el botón del menú */
const PUBLIC_ROUTES: string[] = [
  '/iniciar-sesion',
  '/registrarme',
  '/recuperar-clave',
  '/asignar-nueva-clave',
];

const MENU_STORAGE_KEY: string = 'menu';

// TODO: borrar MENU_MOCK cuando exista el endpoint que lista las opciones del menú
const MENU_MOCK: IUrl[] = [
  {
    id: 1,
    text: 'Tareas',
    url: '/tareas',
  },
];

/** Lee las opciones del menú guardadas en el localStorage. Devuelve null si no existen o si el navegador bloquea el localStorage */
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

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme } = useTheme();

  const [url, setUrl] = useState<IUrl[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const isPublicRoute: boolean = PUBLIC_ROUTES.some((route: string) => pathname.startsWith(route));

  useEffect(() => {
    loadMenu();
  }, [isPublicRoute]);

  // la petición del menú solo se ejecuta la primera vez, las siguientes veces se carga del localStorage
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

  const onClickLogOut = (): void => {
    setIsMenuOpen(false);
    router.push('/iniciar-sesion');
    InfoToast('Se ha cerrado sesión');
  };

  return (
    <header className='flex flex-none h-14 items-center gap-2 px-6'>
      {!isPublicRoute && (
        <Button
          variant='link'
          aria-label='Abrir y cerrar el menú'
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((previousValue: boolean) => !previousValue)}
        >
          <span className='flex items-center gap-2.5'>
            <span className='relative size-4'>
              <span
                className={clsx(
                  'absolute left-0 block h-0.5 w-4 bg-current transition-all duration-200',
                  isMenuOpen ? 'top-[0.4rem] -rotate-45' : 'top-1',
                )}
              />
              <span
                className={clsx(
                  'absolute left-0 block h-0.5 w-4 bg-current transition-all duration-200',
                  isMenuOpen ? 'top-[0.4rem] rotate-45' : 'top-2.5',
                )}
              />
            </span>
            <span>Menú</span>
          </span>
        </Button>
      )}

      <div className='ml-auto flex items-center gap-2'>
        <Button
          variant='link'
          modifiers={['icon-only']}
          aria-label='Cambiar entre tema claro y oscuro'
          onClick={() => setTheme((theme: string) => (theme === 'dark' ? 'light' : 'dark'))}
        >
          {/* tema claro */}
          <MdDarkMode className='text-xl dark:hidden' />
          {/* tema oscuro */}
          <MdLightMode className='text-xl hidden dark:inline' />
        </Button>

        {/* solo se puede cerrar sesión después de iniciar sesión */}
        {!isPublicRoute && (
          <Button variant='link' modifiers={['icon-only']} aria-label='Cerrar sesión' onClick={onClickLogOut}>
            <MdLogout className='text-xl' />
          </Button>
        )}
      </div>

      {!isPublicRoute && (
        <nav
          inert={!isMenuOpen}
          className={clsx(
            'fixed inset-x-0 top-14 bottom-0 z-50 flex flex-col gap-12 overflow-y-auto bg-white/90 px-6 py-6 text-black backdrop-blur dark:bg-neutral-950/90 dark:text-white transition-all duration-200 ease-out',
            isMenuOpen
              ? 'visible translate-y-0 opacity-100'
              : 'invisible pointer-events-none -translate-y-2 opacity-0',
          )}
        >
          <section className='flex flex-col gap-4'>
            <p className='text-sm font-medium text-neutral-500 dark:text-neutral-400'>Menú</p>

            <ul className='flex flex-col gap-3'>
              {url.map((item: IUrl) => (
                <li key={item.id}>
                  <N extLink href={item.url} variant='link' size='2xl' onClick={() => setIsMenuOpen(false)}>
                    {item.text}
                  </N>
                </li>
              ))}
            </ul>
          </section>
        </nav>
      )}
    </header>
  );
}

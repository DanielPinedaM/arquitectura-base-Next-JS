'use client';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { MdDarkMode, MdLightMode, MdLogout } from 'react-icons/md';
import clsx from 'clsx';
import Button from '@/shared/ui/buttons/Button';
import Menu from '@/shared/ui/header/Menu';
import InfoToast from '@/shared/ui/overlay/toast/InfoToast';

const PUBLIC_ROUTES: string[] = [
  '/iniciar-sesion',
  '/registrarme',
  '/recuperar-clave',
  '/asignar-nueva-clave',
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const isPublicRoute: boolean = PUBLIC_ROUTES.some((route: string) => pathname.startsWith(route));

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
          <MdDarkMode className='text-xl dark:hidden' />
          <MdLightMode className='text-xl hidden dark:inline' />
        </Button>

        {!isPublicRoute && (
          <Button variant='link' modifiers={['icon-only']} aria-label='Cerrar sesión' onClick={onClickLogOut}>
            <MdLogout className='text-xl' />
          </Button>
        )}
      </div>

      <Menu isPublicRoute={isPublicRoute} isMenuOpen={isMenuOpen} onCloseMenu={() => setIsMenuOpen(false)} />
    </header>
  );
}

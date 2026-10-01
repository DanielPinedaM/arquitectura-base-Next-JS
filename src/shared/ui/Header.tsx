'use client';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useTheme } from 'next-themes';
import Button from '@/shared/ui/buttons/Button';
import MenuButton from '@/shared/ui/menu/MenuButton';

export default function Header() {
  const { setTheme } = useTheme();

  return (
    <header className='flex-none'>
      <ul className='flex items-center'>
        <li>
          <MenuButton />
        </li>

        <li className='ml-auto'>
          <Button
            variant='link'
            modifiers={['icon-only']}
            aria-label='Cambiar entre tema claro y oscuro'
            onClick={() => setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))}
          >
            <MdDarkMode className='text-xl dark:hidden' />
            <MdLightMode className='text-xl hidden dark:inline' />
          </Button>
        </li>
      </ul>
    </header>
  );
}

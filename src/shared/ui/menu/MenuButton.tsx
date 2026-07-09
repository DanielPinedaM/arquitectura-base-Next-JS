'use client';
import { CiMenuBurger } from 'react-icons/ci';
import { FaArrowLeft } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { useMenuStore } from '@/shared/ui/menu/store/menu.store';
import Button from '@/shared/ui/buttons/Button';

export default function MenuButton() {
  const { handleMenu, showMenu } = useMenuStore();

  return (
    <>
      <span className='tooltip-menu'>
        <Button variant='link' modifiers={['icon-only']} onClick={handleMenu}>
          {showMenu ? <FaArrowLeft className='text-xl' /> : <CiMenuBurger className='text-xl' />}
        </Button>
      </span>
    </>
  );
}

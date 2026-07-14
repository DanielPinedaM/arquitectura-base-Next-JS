import { RiLoader4Fill } from 'react-icons/ri';

export default function FixedLoader() {
  return (
    <div className='fixed inset-0 z-999 bg-[oklch(100%_0_0/0.18)] backdrop-blur-[1px] backdrop-saturate-150 w-dvw h-dvh flex justify-center items-center cursor-wait'>
      <RiLoader4Fill className='animate-spin text-blue-500 text-7xl' />
    </div>
  );
}

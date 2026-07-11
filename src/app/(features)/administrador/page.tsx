import { Suspense } from 'react';
import FetchData from '@/app/(features)/administrador/fetch/FetchData';

/* Page() crea la ruta  http://localhost:3000/fetch-ssr */
export default function Page() {
  return (
    <>
      <h1>
        <a
          href='https://www.youtube.com/watch?v=_SPoSMmN3ZU&t=3701s'
          target='_blank'
          className='text-nowrap'
        >
          Ejemplo: la data se carga en componente servidor con fetch SSR y hay un componente cliente
          q tiene un alert
        </a>
      </h1>

      {/*  <FetchData /> es componente servidor */}
      <Suspense>
        <FetchData />
      </Suspense>
    </>
  );
}

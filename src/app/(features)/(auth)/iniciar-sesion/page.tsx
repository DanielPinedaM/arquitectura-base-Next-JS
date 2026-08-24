import FormLogin from '@/app/(features)/(auth)/iniciar-sesion/FormLogin';

export default function Page() {
  return (
    <section className='w-full h-screen flex items-center justify-center'>
      <div className='basis-xl shadow-xl p-4 rounded-xl'>
        <h1 className='text-center font-medium mb-5'>
          <span className='block'>Bienvenido a</span>
          <span className='block'>tu plataforma web</span>
        </h1>

        <FormLogin />
      </div>
    </section>
  );
}

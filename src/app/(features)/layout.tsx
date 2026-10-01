import Header from '@/shared/ui/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col h-dvh'>
      <Header />

      <main className='min-w-0 w-full flex-1 overflow-auto'>
        <div className='min-w-max'>{children}</div>
      </main>
    </div>
  );
}

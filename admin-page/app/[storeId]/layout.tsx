import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import { Navbar } from '@/components/navbar';
import prismadb from '@/lib/prismadb';
import { GetServerSideProps } from 'next';
import { Store } from '@prisma/client';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prismadb';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) return null;

  const store = await prisma.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}

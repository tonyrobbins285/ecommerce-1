import { prisma } from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import SettingsForm from './components/settings-form';

type SettingsPageProps = {
  params: {
    storeId: string;
  };
};

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { userId } = auth();
  if (!userId) return null;
  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <div className="flex flex-col">
      <div className="space-y-4 px-8 py-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
}

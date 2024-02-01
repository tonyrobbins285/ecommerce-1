import { prisma } from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import SettingsForm from './components/settings-form';
import Container from '@/components/container';
import Wrapper from '@/components/ui/wrapper';
import { Heading } from '@/components/ui/heading';
import DeleteBtn from '@/components/ui/delete-btn';
import { Separator } from '@/components/ui/separator';

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
    <Container>
      <Wrapper>
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-0">
          <Heading title="Settings" description="Store preferences" />
          <DeleteBtn section="stores" sectionId="storeId" />
        </div>
        <Separator />
        <SettingsForm initialData={store} />
      </Wrapper>
    </Container>
  );
}

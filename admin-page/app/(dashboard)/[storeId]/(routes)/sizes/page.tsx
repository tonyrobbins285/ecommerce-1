import { format } from 'date-fns';

import { prisma } from '@/lib/prismadb';
import SizeClient from './components/client';
import { SizeColumns } from './components/columns';

export default async function Sizes({
  params,
}: {
  params: { storeId: string };
}) {
  const sizes = await prisma.size.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: 'desc' },
  });

  const formattedSizes: SizeColumns[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
}

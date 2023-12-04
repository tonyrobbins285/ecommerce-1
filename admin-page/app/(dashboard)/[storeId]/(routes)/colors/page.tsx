import { format } from 'date-fns';

import { prisma } from '@/lib/prismadb';
import ColorClient from './components/client';
import { ColorColumns } from './components/columns';

export default async function Colors({
  params,
}: {
  params: { storeId: string };
}) {
  const colors = await prisma.color.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: 'desc' },
  });

  const formattedColors: ColorColumns[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
}

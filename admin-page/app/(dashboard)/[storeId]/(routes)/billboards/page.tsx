import { format } from 'date-fns';

import { prisma } from '@/lib/prismadb';
import BillboardClient from './components/client';
import { BillboardColumns } from './components/columns';

export default async function Billboards({
  params,
}: {
  params: { storeId: string };
}) {
  const billboards = await prisma.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: 'desc' },
  });

  const formattedBillboard: BillboardColumns[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboard} />
      </div>
    </div>
  );
}

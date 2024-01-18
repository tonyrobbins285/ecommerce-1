import { prisma } from '@/lib/prismadb';

export default async function getSaleCount(storeId: string) {
  const saleCount = await prisma.order.count({
    where: { storeId, isPaid: true },
  });

  return saleCount;
}

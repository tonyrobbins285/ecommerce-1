import { prisma } from '@/lib/prismadb';

export default async function getProductsInStock(storeId: string) {
  const products = await prisma.product.count({
    where: { storeId, isArchived: false },
  });

  return products;
}

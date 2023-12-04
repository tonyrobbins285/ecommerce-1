import { format } from 'date-fns';

import { prisma } from '@/lib/prismadb';
import { currencyFormatter } from '@/lib/utils';

import ProductClient from './components/client';
import { ProductColumns } from './components/columns';

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const products = await prisma.product.findMany({
    where: { storeId: params.storeId },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const formattedProduct: ProductColumns[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: currencyFormatter.format(item.price.toNumber()),
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,

    createAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProduct} />
      </div>
    </div>
  );
}

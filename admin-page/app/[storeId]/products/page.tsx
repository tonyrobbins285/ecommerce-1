import prismadb from '@/lib/prismadb';

import { columns } from './components/columns';
import { Heading } from '@/components/ui/heading';
import Add from '@/components/ui/add';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const products = await prismadb.product.findMany({
    where: { storeId: params.storeId },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      size: {
        select: {
          name: true,
        },
      },
      color: {
        select: {
          value: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const formattedProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Products (${products.length})`}
            description="Manage products for your store"
          />
          <Add section="products" />
        </div>
        <Separator />
        <DataTable
          columns={columns}
          data={formattedProducts}
          searchKey="name"
        />
      </div>
    </div>
  );
}

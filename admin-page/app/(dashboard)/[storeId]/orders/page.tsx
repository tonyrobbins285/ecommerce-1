import { prisma } from '@/lib/prismadb';
import { columns } from './components/columns';
import Wrapper from '@/components/ui/wrapper';
import Container from '@/components/container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import Add from '@/components/ui/add';

export default async function OrdersPage({
  params,
}: {
  params: { storeId: string };
}) {
  const orders = await prisma.order.findMany({
    where: { storeId: params.storeId },
    include: {
      orderItems: {
        select: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const formattedOrder = orders.map((item) => ({
    ...item,
    orderItems: item.orderItems.map((orderItem) => ({
      ...orderItem,
      product: {
        ...orderItem.product,
        price: Number(orderItem.product.price),
      },
    })),
  }));

  return (
    <Container>
      <Wrapper>
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-0">
          <Heading
            title={`Order (${orders.length})`}
            description="Manage orders for your store"
          />
          <Add section="orders" />
        </div>
        <Separator />
        <DataTable
          columns={columns}
          data={formattedOrder}
          searchKey="product"
        />
      </Wrapper>
    </Container>
  );
}

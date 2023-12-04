import { format } from 'date-fns';

import { prisma } from '@/lib/prismadb';
import OrderClient from './components/client';
import { OrderColumns } from './components/columns';
import { currencyFormatter } from '@/lib/utils';

export default async function OrdersPage({
  params,
}: {
  params: { storeId: string };
}) {
  const orders = await prisma.order.findMany({
    where: { storeId: params.storeId },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const formattedOrder: OrderColumns[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(', '),
    totalPrice: currencyFormatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0),
    ),
    createAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrder} />
      </div>
    </div>
  );
}

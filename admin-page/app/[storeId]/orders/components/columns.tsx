'use client';

import { dateFormattor } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export type OrderColumns = {
  orderItems: {
    product: {
      price: number;
      id: string;
      name: string;
      isFeatured: boolean;
      isArchived: boolean;
      storeId: string;
      categoryId: string;
      sizeId: string;
      colorId: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
  id: string;
  isPaid: boolean;
  phone: string;
  address: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<OrderColumns>[] = [
  {
    accessorKey: 'id',
    header: 'Order Id',
    cell: ({ row }) => <div>{row.original.id}</div>,
  },

  {
    accessorKey: 'products',
    header: 'Products',
    cell: ({ row }) => (
      <div>
        {row.original.orderItems
          .map((orderItem) => orderItem.product.name)
          .join(', ')}
      </div>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => <div>{row.original.phone}</div>,
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => <div>{row.original.address}</div>,
  },
  {
    accessorKey: 'price',
    header: 'Total price',
    cell: ({ row }) => (
      <div>
        {row.original.orderItems.reduce(
          (total, item) => total + Number(item.product.price),
          0,
        )}
      </div>
    ),
  },
  {
    accessorKey: 'isPaid',
    header: 'Paid',
    cell: ({ row }) => <div>{row.original.isPaid.toString()}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => <div>{dateFormattor(row.getValue('createdAt'))}</div>,
  },
];

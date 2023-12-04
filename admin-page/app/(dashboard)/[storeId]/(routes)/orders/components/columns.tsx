'use client';

import { ColumnDef } from '@tanstack/react-table';

export type OrderColumns = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createAt: string;
};

export const columns: ColumnDef<OrderColumns>[] = [
  {
    accessorKey: 'products',
    header: 'Products',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'price',
    header: 'Total price',
  },
  {
    accessorKey: 'isPaid',
    header: 'Paid',
  },
  {
    accessorKey: 'createAt',
    header: 'Date',
  },
];

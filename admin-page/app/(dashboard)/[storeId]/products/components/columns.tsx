'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Product } from '@prisma/client';
import { currencyFormatter, dateFormattor } from '@/lib/utils';
import CellLink from '@/components/ui/cell-link';
import CellAction from '@/components/ui/cell-action';

export type ProductColumns = {
  price: number;
  category: { name: string };
  size: { name: string };
  color: { value: string };
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

export const columns: ColumnDef<ProductColumns>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <CellLink
        section="products"
        id={row.original.id}
        name={row.original.name}
      />
    ),
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
    cell: ({ row }) => <div>{row.original.isArchived.toString()}</div>,
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
    cell: ({ row }) => <div>{row.original.isFeatured.toString()}</div>,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => (
      <div>{currencyFormatter.format(row.original.price)}</div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => <div>{row.original.category.name}</div>,
  },
  {
    accessorKey: 'size',
    header: 'Size',
    cell: ({ row }) => <div>{row.original.size.name}</div>,
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span>{row.original.color.value}</span>
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color.value }}
        ></div>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => <div>{dateFormattor(row.getValue('createdAt'))}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction section="products" id={row.original.id} />,
  },
];

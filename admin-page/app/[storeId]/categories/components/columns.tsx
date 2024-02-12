'use client';

import { Category } from '@prisma/client';
import { dateFormattor } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import CellLink from '@/components/ui/cell-link';
import CellAction from '@/components/ui/cell-action';

export type CategoryColumn = Category & {
  billboard: { label: string };
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <CellLink
        section="categories"
        id={row.original.id}
        name={row.original.name}
      />
    ),
  },
  {
    accessorKey: 'billboard',
    header: 'Billboard',
    cell: ({ row }) => <div>{row.original.billboard.label}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => <div>{dateFormattor(row.getValue('createdAt'))}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction section="categories" id={row.original.id} />,
  },
];

'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Size } from '@prisma/client';
import { dateFormattor } from '@/lib/utils';
import CellLink from '@/components/ui/cell-link';
import CellAction from '@/components/ui/cell-action';

export const columns: ColumnDef<Size>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <CellLink section="sizes" id={row.original.id} name={row.original.name} />
    ),
  },
  {
    accessorKey: 'value',
    header: 'Value',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => <div>{dateFormattor(row.getValue('createdAt'))}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction section="sizes" id={row.original.id} />,
  },
];

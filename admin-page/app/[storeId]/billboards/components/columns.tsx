'use client';

import { Billboard } from '@prisma/client';
import { dateFormattor } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import CellLink from '@/components/ui/cell-link';
import CellAction from '@/components/ui/cell-action';

export const columns: ColumnDef<Billboard>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
    cell: ({ row }) => (
      <CellLink
        section="billboards"
        id={row.original.id}
        name={row.original.label}
      />
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => <div>{dateFormattor(row.getValue('createdAt'))}</div>,
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => <CellAction section="billboards" id={row.original.id} />,
  },
];

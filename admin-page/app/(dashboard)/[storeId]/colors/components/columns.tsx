'use client';

import { Color } from '@prisma/client';
import { dateFormattor } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import CellAction from '@/components/ui/cell-action';
import CellLink from '@/components/ui/cell-link';

export const columns: ColumnDef<Color>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <CellLink
        section="colors"
        id={row.original.id}
        name={row.original.name}
      />
    ),
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span>{row.original.value}</span>
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
        />
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
    cell: ({ row }) => <CellAction section="colors" id={row.original.id} />,
  },
];

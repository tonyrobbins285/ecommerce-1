'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

export type BillboardColumns = {
  id: string;
  label: string;
  createAt: string;
};

export const columns: ColumnDef<BillboardColumns>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
  },
  {
    accessorKey: 'createAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

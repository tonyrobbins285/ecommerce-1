'use client';
import { useParams, useRouter } from 'next/navigation';

import { OrderColumns, columns } from './columns';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';

type OrderClientProps = {
  data: OrderColumns[];
};

export default function OrderClient({ data }: OrderClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <Heading
        title={`Order (${data.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
}

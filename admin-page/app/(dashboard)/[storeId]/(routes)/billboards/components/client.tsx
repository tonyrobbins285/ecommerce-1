'use client';
import { useParams, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

import { BillboardColumns, columns } from './columns';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';

type BillboardClientProps = {
  data: BillboardColumns[];
};

export default function BillboardClient({ data }: BillboardClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboard (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          <p>Add new</p>
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading description="API calls for Billboards" title="API" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboard Id" />
    </>
  );
}

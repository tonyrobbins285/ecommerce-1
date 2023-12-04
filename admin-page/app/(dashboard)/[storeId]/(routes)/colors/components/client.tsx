'use client';
import { useParams, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

import { ColorColumns, columns } from './columns';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';

type ColorClientProps = {
  data: ColorColumns[];
};

export default function ColorClient({ data }: ColorClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage colors for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          <p>Add new</p>
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading description="API calls for Colors" title="API" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
}

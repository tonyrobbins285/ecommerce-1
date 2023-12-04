'use client';
import { useParams, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

import { ProductColumns, columns } from './columns';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';

type ProductClientProps = {
  data: ProductColumns[];
};

export default function ProductClient({ data }: ProductClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          <p>Add new</p>
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading description="API calls for Products" title="API" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
}

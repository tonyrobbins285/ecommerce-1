import Add from '@/components/ui/add';
import Wrapper from '@/components/ui/wrapper';
import { columns } from './components/columns';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import Container from '@/components/ui/container';
import prismadb from '@/lib/prismadb';

export default async function Billboards({
  params,
}: {
  params: { storeId: string };
}) {
  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <Container>
      <Wrapper>
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-0">
          <Heading
            title={`Billboard (${billboards.length})`}
            description="Manage billboards for your store"
          />
          <Add section="billboards" />
        </div>
        <Separator />
        <DataTable columns={columns} data={billboards} searchKey="label" />
      </Wrapper>
    </Container>
  );
}

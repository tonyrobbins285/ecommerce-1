import { prisma } from '@/lib/prismadb';
import { columns } from './components/columns';
import Container from '@/components/container';
import Wrapper from '@/components/ui/wrapper';
import Add from '@/components/ui/add';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';

export default async function Sizes({
  params,
}: {
  params: { storeId: string };
}) {
  const sizes = await prisma.size.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <Container>
      <Wrapper>
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-0">
          <Heading
            title={`Sizes (${sizes.length})`}
            description="Manage sizes for your store"
          />
          <Add section="sizes" />
        </div>
        <Separator />
        <DataTable columns={columns} data={sizes} searchKey="name" />
      </Wrapper>
    </Container>
  );
}

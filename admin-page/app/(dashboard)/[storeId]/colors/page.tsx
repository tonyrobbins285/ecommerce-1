import { prisma } from '@/lib/prismadb';

import Add from '@/components/ui/add';
import Wrapper from '@/components/ui/wrapper';
import { columns } from './components/columns';
import Container from '@/components/container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';

export default async function Colors({
  params,
}: {
  params: { storeId: string };
}) {
  const colors = await prisma.color.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <Container>
      <Wrapper>
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-0">
          <Heading
            title={`Colors (${colors.length})`}
            description="Manage colors for your store"
          />
          <Add section="colors" />
        </div>
        <Separator />
        <DataTable columns={columns} data={colors} searchKey="name" />
      </Wrapper>
    </Container>
  );
}

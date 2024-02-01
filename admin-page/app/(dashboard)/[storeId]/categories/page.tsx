import { prisma } from '@/lib/prismadb';

import Wrapper from '@/components/ui/wrapper';
import Container from '@/components/container';
import { columns } from './components/columns';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import Add from '@/components/ui/add';

export default async function CategoriesPage({
  params,
}: {
  params: { storeId: string };
}) {
  const categories = await prisma.category.findMany({
    where: { storeId: params.storeId },
    include: {
      billboard: {
        select: {
          label: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <Container>
      <Wrapper>
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-0">
          <Heading
            title={`Category (${categories.length})`}
            description="Manage categories for your store"
          />
          <Add section="categories" />
        </div>
        <Separator />
        <DataTable columns={columns} data={categories} searchKey="name" />
      </Wrapper>
    </Container>
  );
}

import { prisma } from '@/lib/prismadb';
import BillboardForm from './components/billboard-form';
import Container from '@/components/container';
import Wrapper from '@/components/ui/wrapper';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import DeleteBtn from '@/components/ui/delete-btn';

export default async function BillboardPage({
  params,
}: {
  params: { billboardId: string };
}) {
  const billboard = await prisma.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  const title = billboard ? 'Edit billboard' : 'Create billboard';
  const description = billboard ? 'Edit billboard' : 'Add a new billboard';

  return (
    <Container>
      <Wrapper>
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-0">
          <Heading title={title} description={description} />
          <DeleteBtn section="billboards" sectionId="billboardId" />
        </div>
        <Separator />
        <BillboardForm initialData={billboard} />
      </Wrapper>
    </Container>
  );
}

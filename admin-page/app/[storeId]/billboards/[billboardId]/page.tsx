import prismadb from '@/lib/prismadb';
import Wrapper from '@/components/ui/wrapper';
import Container from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import DeleteBtn from '@/components/ui/delete-btn';
import { Separator } from '@/components/ui/separator';
import BillboardForm from './components/billboard-form';

export default async function BillboardPage({
  params,
}: {
  params: { billboardId: string };
}) {
  const billboard = await prismadb.billboard.findUnique({
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

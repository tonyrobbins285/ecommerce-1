import prismadb from '@/lib/prismadb';
import SizeForm from './components/size-form';
import Container from '@/components/ui/container';
import Wrapper from '@/components/ui/wrapper';
import { Heading } from '@/components/ui/heading';
import DeleteBtn from '@/components/ui/delete-btn';
import { Separator } from '@/components/ui/separator';

export default async function SizePage({
  params,
}: {
  params: { sizeId: string };
}) {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  const title = size ? 'Edit size' : 'Create size';
  const description = size ? 'Edit size' : 'Add a new size';

  return (
    <Container>
      <Wrapper>
        <div className="md:agap-0 flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <Heading title={title} description={description} />
          <DeleteBtn section="sizes" sectionId="sizeId" />
        </div>
        <Separator />
        <SizeForm initialData={size} />
      </Wrapper>
    </Container>
  );
}

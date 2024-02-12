import prismadb from '@/lib/prismadb';
import ColorForm from './components/color-form';
import Container from '@/components/ui/container';
import Wrapper from '@/components/ui/wrapper';
import { Heading } from '@/components/ui/heading';
import DeleteBtn from '@/components/ui/delete-btn';
import { Separator } from '@/components/ui/separator';

export default async function ColorPage({
  params,
}: {
  params: { colorId: string };
}) {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  const title = color ? 'Edit color' : 'Create color';
  const description = color ? 'Edit color' : 'Add a new color';

  return (
    <Container>
      <Wrapper>
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-0">
          <Heading title={title} description={description} />
          <DeleteBtn section="colors" sectionId="colorId" />
        </div>
        <Separator />
        <ColorForm initialData={color} />
      </Wrapper>
    </Container>
  );
}

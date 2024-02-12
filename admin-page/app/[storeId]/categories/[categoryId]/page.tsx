import prismadb from '@/lib/prismadb';
import CategoryForm from './components/category-form';
import Container from '@/components/ui/container';
import Wrapper from '@/components/ui/wrapper';
import { Heading } from '@/components/ui/heading';
import DeleteBtn from '@/components/ui/delete-btn';
import { Separator } from '@/components/ui/separator';

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
  });

  const title = category ? 'Edit category' : 'Create category';
  const description = category ? 'Edit category' : 'Add a new category';

  return (
    <Container>
      <Wrapper>
        <div className="md:agap-0 flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <Heading title={title} description={description} />
          <DeleteBtn section="categories" sectionId="categoryId" />
        </div>
        <Separator />
        <CategoryForm billboards={billboards} initialData={category} />
      </Wrapper>
    </Container>
  );
}

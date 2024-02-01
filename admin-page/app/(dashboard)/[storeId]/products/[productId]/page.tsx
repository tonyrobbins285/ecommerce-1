import { prisma } from '@/lib/prismadb';
import ProductForm from './components/product-form';
import Container from '@/components/container';
import Wrapper from '@/components/ui/wrapper';
import { Heading } from '@/components/ui/heading';
import DeleteBtn from '@/components/ui/delete-btn';
import { Separator } from '@/components/ui/separator';

export default async function ProductPage({
  params,
}: {
  params: { productId: string; storeId: string };
}) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const title = product ? 'Edit product' : 'Create product';
  const description = product ? 'Edit product' : 'Add a new product';

  return (
    <Container>
      <Wrapper>
        <div className="md:agap-0 flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <Heading title={title} description={description} />
          <DeleteBtn section="products" sectionId="productId" />
        </div>
        <Separator />
        <ProductForm
          initialData={product}
          categories={categories}
          colors={colors}
          sizes={sizes}
        />
      </Wrapper>
    </Container>
  );
}

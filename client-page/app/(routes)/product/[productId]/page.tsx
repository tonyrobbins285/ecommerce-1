import getProduct from '@/actions/get-product';
import getProducts from '@/actions/get-products';
import Gallery from '@/components/gallery';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';

type ProductPageProps = {
  params: {
    productId: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.productId);

  const suggestedProduct = await getProducts({
    categoryId: product?.category?.id,
  });
  console.log(product.images);
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              {/* Info */}
              <p>Info</p>
            </div>
          </div>
          <hr className="my-10" />
          <ProductList title="Related Items" items={suggestedProduct} />
        </div>
      </Container>
    </div>
  );
}

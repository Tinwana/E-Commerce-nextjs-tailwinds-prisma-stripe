import React from "react";
import { product } from "@/data/product";
import { products } from "@/data/products";
import { ListRatting, ProductDetail } from "@/features/Product";
import { Container } from "@/components/layout";

interface IParams {
  productId: string;
}
interface ProductPageProps {
  params: IParams;
}

export async function generateMetadata() {
  return {
    title: product.name,
    description: product.description,
  };
}

export async function generateStaticParams() {
  return products?.map((product) => ({
    listingId: product.id,
  }));
}
export const dynamic = "force-dynamic";

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const { productId } = params;
  return (
    <article className="p-8">
      <Container>
        <ProductDetail productId={productId} />
        <section className="flex flex-col mt-20 gap-4">
          <div className="">add rating</div>
          <ListRatting productId={productId} />
        </section>
      </Container>
    </article>
  );
};

export default ProductPage;

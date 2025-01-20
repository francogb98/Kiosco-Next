import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/Prisma";

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });
  return products;
}

async function OrderPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const category = (await params).category;

  if (!category) {
    throw new Error("Category is not defined");
  }
  const products = await getProducts(category);

  return (
    <>
      <Heading>Elige y personaliza tu pedido a continuacion</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default OrderPage;

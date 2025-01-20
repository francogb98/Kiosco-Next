import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/Prisma";

async function searchProduct(filter: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: filter,
          mode: "insensitive",
        },
      },
      include: {
        category: true,
      },
    });

    return products;
  } catch (error) {
    console.log(error);
  }
}

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const search = (await searchParams).search;

  if (!search) {
    throw new Error("Name search is not defined");
  }

  const products = await searchProduct(search);

  return (
    <>
      <Heading>
        Resultado de busqueda: <b>{search}</b>
      </Heading>
      <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
        <ProductSearchForm />
      </div>
      {products?.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center text-lg pt-8">
          No hay Resultados para la busqueda de producto con el nombre{" "}
          <b>{search}</b>
        </p>
      )}
    </>
  );
}

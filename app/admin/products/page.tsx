import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/Prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function getTotalProducts() {
  try {
    const totalProducts = await prisma.product.count();

    return totalProducts;
  } catch (error) {
    console.log(error);
  }
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      take: pageSize,
      skip,
    });
    return products;
  } catch (error) {
    console.log(error);
  }
}

//de esta manera podemos crear un tipo basado en lo que nos devuelva la promesa
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const page = +(await searchParams).page || 1;

  const pageSize = 10;

  if (page < 0) redirect("/admin/products");

  const getProductsData = getProducts(page, pageSize);
  const totalProductsData = getTotalProducts();

  const [products, productsCount] = await Promise.all([
    getProductsData,
    totalProductsData,
  ]);

  const totalPages = Math.ceil(productsCount! / pageSize);

  if (page > totalPages) redirect("/admin/products");

  return (
    <>
      <Heading> Administrar Productos </Heading>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href={"/admin/products/new"}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >
          Crear Producto
        </Link>

        <ProductSearchForm />
      </div>

      {products?.length && <ProductTable products={products} />}
      <ProductsPagination page={page} totalPages={totalPages} />
    </>
  );
}

export default ProductsPage;

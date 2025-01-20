import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/Prisma";
import { notFound } from "next/navigation";

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) {
    notFound();
  } else {
    return product;
  }
}

async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const product = await getProductById(+id);

  return (
    <div>
      <Heading>
        {" "}
        Pagina de producto:
        <b>{product.name}</b>
      </Heading>
      <GoBackButton />
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </div>
  );
}

export default page;

import { formatCurrenct, getImagePath } from "@/src/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image);

  return (
    <div className="border bg-white">
      <Image
        width={200}
        height={200}
        className="mx-auto mt-2"
        src={imagePath}
        alt={`Imagen Platillo ${product.name}`}
        priority={true}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatCurrenct(product.price)}
        </p>
        <AddProductButton product={product} />
      </div>
    </div>
  );
}

export default ProductCard;

"use server";

import { prisma } from "@/src/lib/Prisma";
import { ProductSchema } from "@/src/schema";
import { revalidatePath } from "next/cache";

export async function editProduct(id: number, data: unknown) {
  const result = ProductSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }
  await prisma.product.update({
    where: {
      id,
    },
    data: result.data,
  });

  revalidatePath("/admin/products");
}

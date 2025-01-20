"use server";

import { prisma } from "@/src/lib/Prisma";
import { OrderSchema } from "@/src/schema";

export async function createOrder(data: unknown) {
  try {
    const result = OrderSchema.safeParse(data);

    if (!result.success) {
      return {
        errors: result.error.issues,
      };
    }

    await prisma.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        orderProducts: {
          create: result.data.order.map((product) => ({
            prodcutId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    });
    return;
  } catch (error) {
    console.log(error);
  }
}

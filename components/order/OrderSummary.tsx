"use client";
import { useStore } from "@/src/store/store";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { formatCurrenct } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";

import ProductDeatils from "./ProductDeatils";
import { OrderSchema } from "@/src/schema";

function OrderSummary() {
  const { order, clearOrder } = useStore();

  const total = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total,
      order,
    };

    const result = OrderSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await createOrder(data);
    if (response?.errors) {
      response?.errors.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    toast.success("Pedido Realizado Correctamente");
    clearOrder();
  };

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi pedido</h1>

      {order.length === 0 ? (
        <p className="text-center my-10"> El pedido esta vacio</p>
      ) : (
        <div className="mt-2">
          <div>
            {order.map((item) => (
              <ProductDeatils key={item.id} item={item} />
            ))}
          </div>
          <p className="text-2xl mt-20 text-center">
            Total A Pagar :<b>{formatCurrenct(total)}</b>
          </p>

          <form action={handleCreateOrder} className="w-full mt-10 space-y-5">
            <input
              type="text"
              placeholder="Tu Nombre"
              className="bg-white border border-gray-100 p-2 w-full"
              name="name"
            />

            <input
              type="submit"
              className="py-2 roundedf uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
              value="Confirmar Pedido"
            />
          </form>
        </div>
      )}
    </aside>
  );
}

export default OrderSummary;

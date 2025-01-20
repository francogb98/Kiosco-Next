"use client";
import UseSWR from "swr";
import Logo from "@/components/ui/Logo";
import { OrderwithProducts } from "@/src/types";
import LatestOrderItem from "@/components/order/LatestOrderItem";

function page() {
  const url = "/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);

  const { data, error, isLoading } = UseSWR<OrderwithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });

  if (isLoading) return <h1>Cargando Ordenes...</h1>;
  if (error) return <h1>Hubo un Error...</h1>;

  if (data)
    return (
      <div>
        <h1 className="text-center mt-20 text-6xl font-black">
          Ordenes Listas
        </h1>
        <Logo />
        {data.length ? (
          <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
            {data.map((order) => (
              <LatestOrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center my-10">No hay ordenes Listas</p>
        )}
      </div>
    );
}

export default page;

"use client";
import UseSWR from "swr";
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderwithProducts } from "@/src/types";

function page() {
  const url = "/admin/orders/api";
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
        <Heading>Administrar Ordenes</Heading>
        {data?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
            {data.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center">No hay ordenes Pendientes</p>
        )}
      </div>
    );
}

export default page;

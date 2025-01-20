import { MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { OrderItem } from "@/src/types";
import { formatCurrenct } from "@/src/utils";
import { useStore } from "@/src/store/store";
import { useMemo } from "react";

type ProductDeatilsProps = {
  item: OrderItem;
};

const MAX_ITEMS = 5;

function ProductDeatils({ item }: ProductDeatilsProps) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useStore();

  const disableDecreaeButton = useMemo(() => item.quantity === 1, [item]);
  const disableIncreseButton = useMemo(
    () => item.quantity === MAX_ITEMS,
    [item]
  );

  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button
            type="button"
            onClick={() => {
              removeItem(item.id);
            }}
          >
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">{item.price}</p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button
            type="button"
            onClick={() => {
              decreaseQuantity(item.id);
            }}
            disabled={disableDecreaeButton}
            className="disabled:opacity-20"
          >
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          <button
            type="button"
            onClick={() => {
              increaseQuantity(item.id);
            }}
            disabled={disableIncreseButton}
            className="disabled:opacity-20"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal:
          <span className="font-normal">{formatCurrenct(item.subtotal)}</span>
        </p>
      </div>
    </div>
  );
}

export default ProductDeatils;

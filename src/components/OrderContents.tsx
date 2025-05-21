import type { ActionDispatch } from "react"
import { formatCurrency } from "../helpers"
import type { OrderItem } from "../types"
import type { OrderActions } from "../reducers/order-reducer"

type OrderContentProps = {
  order: OrderItem[],
  dispatch: ActionDispatch<[action: OrderActions]>
}

export default function OrderContents({ order, dispatch }: OrderContentProps) {
  return (
    <div>
      <h2 className="font-black text-4xl">Consumo</h2>

      <div className="space-y-3 mt-10">
        {
          order.map(item => (
            <div
              key={item.id}
              className="flex justify-between border-t items-center border-gray-200 py-5 last-of-type:border-b"
            >
              <div>
                <p className="text-lg">
                  {item.name} - {formatCurrency(item.price)}
                </p>
                <p className="font-black">
                  Cantidad: {item.quantity} - {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
              <button
                className="bg-red-600 h-8 w-8 rounded-full text-white font-black hover:cursor-pointer"
                onClick={() => dispatch({ type: 'remove-item', payload: { id: item.id } })}
              >
                X
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

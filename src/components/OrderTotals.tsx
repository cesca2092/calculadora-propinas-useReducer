import { useCallback } from "react"
import type { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
  order: OrderItem[],
  tip: number,
  placeOrder: () => void
}

export default function OrderTotals({ order, tip, placeOrder }: OrderTotalsProps) {

  // const subtotalAmount = useMemo(() => order.reduce((total, item) => total + item.price * item.quantity, 0), [order])
  // const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order])
  // const totalAmount = useMemo(() => tipAmount + subtotalAmount, [tip, order])

  const subtotalAmount = useCallback(() => order.reduce((total, item) => total + item.price * item.quantity, 0), [order])
  const tipAmount = useCallback(() => subtotalAmount() * tip, [tip, order])
  const totalAmount = useCallback(() => tipAmount() + subtotalAmount(), [tip, order])


  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y Propina:</h2>
      </div>

      <p>
        Subtotal a pagar: {''}
        <span className="font-bold">{formatCurrency(subtotalAmount())}</span>
      </p>

      <p>
        Propina: {''}
        <span className="font-bold">{formatCurrency(tipAmount())}</span>
      </p>

      <p>
        Total a pagar: {''}
        <span className="font-bold">{formatCurrency(totalAmount())}</span>
      </p>

      <button
        className="w-full bg-black p-3 uppercase text-white hover:cursor-pointer font-bold mt-10 disabled:opacity-10"
        disabled={totalAmount() === 0}
        onClick={placeOrder}
      >
        Guardar Orden
      </button>
    </>
  )
}

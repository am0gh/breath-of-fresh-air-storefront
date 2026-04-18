"use client"

import { clx } from "@medusajs/ui"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="bg-cream">
      <div className="flex flex-row items-center justify-between mb-6">
        <h2
          className={clx(
            "font-display text-2xl text-olive font-light",
            {
              "opacity-40 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          Review Order
        </h2>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-start gap-x-1 w-full mb-6">
            <div className="w-full">
              <p className="text-sm text-bark/60 leading-relaxed">
                By placing your order, you confirm that you have read, understand and accept our Terms of Use, Terms of Sale and
                Returns Policy and acknowledge that you have read our Privacy Policy.
              </p>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </div>
  )
}

export default Review

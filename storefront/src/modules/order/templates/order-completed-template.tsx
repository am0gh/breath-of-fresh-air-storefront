import { cookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const isOnboarding = cookies().get("_medusa_onboarding")?.value === "true"

  return (
    <div className="py-12 min-h-[calc(100vh-64px)] bg-cream">
      <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div
          className="flex flex-col gap-6 max-w-4xl h-full bg-cream border border-sage/20 w-full px-8 py-10"
          data-testid="order-complete-container"
        >
          <div className="flex flex-col gap-y-2 mb-4 pb-6 border-b border-sage/20">
            <h1 className="font-display text-4xl text-olive font-light tracking-wide">
              Thank you!
            </h1>
            <p className="text-bark/60 text-sm">
              Your order was placed successfully. We&apos;ll send you a confirmation shortly.
            </p>
          </div>
          <OrderDetails order={order} />
          <h2 className="font-display text-2xl text-olive font-light">Order Summary</h2>
          <Items items={order.items} />
          <CartTotals totals={order} />
          <ShippingDetails order={order} />
          <PaymentDetails order={order} />
          <Help />
        </div>
      </div>
    </div>
  )
}

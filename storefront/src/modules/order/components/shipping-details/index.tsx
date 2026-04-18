import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

import Divider from "@modules/common/components/divider"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div>
      <h2 className="font-display text-2xl text-olive font-light my-6">Delivery</h2>
      <div className="flex items-start gap-x-8 text-sm text-bark/70">
        <div
          className="flex flex-col w-1/3"
          data-testid="shipping-address-summary"
        >
          <p className="font-medium text-bark mb-1">Shipping Address</p>
          <p>{order.shipping_address?.first_name}{" "}{order.shipping_address?.last_name}</p>
          <p>{order.shipping_address?.address_1}{" "}{order.shipping_address?.address_2}</p>
          <p>{order.shipping_address?.postal_code},{" "}{order.shipping_address?.city}</p>
          <p>{order.shipping_address?.country_code?.toUpperCase()}</p>
        </div>

        <div className="flex flex-col w-1/3" data-testid="shipping-contact-summary">
          <p className="font-medium text-bark mb-1">Contact</p>
          <p>{order.shipping_address?.phone}</p>
          <p>{order.email}</p>
        </div>

        <div className="flex flex-col w-1/3" data-testid="shipping-method-summary">
          <p className="font-medium text-bark mb-1">Method</p>
          <p>
            {(order as any).shipping_methods[0]?.name} (
            {convertToLocale({
              amount: order.shipping_methods?.[0].total ?? 0,
              currency_code: order.currency_code,
            })
              .replace(/,/g, "")
              .replace(/\./g, ",")}
            )
          </p>
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

export default ShippingDetails

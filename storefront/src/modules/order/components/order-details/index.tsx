import { HttpTypes } from "@medusajs/types"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  return (
    <div className="text-sm text-bark/70">
      <p>
        We have sent the order confirmation details to{" "}
        <span className="font-semibold text-bark" data-testid="order-email">
          {order.email}
        </span>
        .
      </p>
      <p className="mt-2">
        Order date:{" "}
        <span data-testid="order-date">
          {new Date(order.created_at).toDateString()}
        </span>
      </p>
      <p className="mt-2 text-terracotta font-medium">
        Order #{" "}
        <span data-testid="order-id">{order.display_id}</span>
      </p>

      {showStatus && (
        <div className="flex items-center gap-x-6 mt-3">
          <p>Order status: <span data-testid="order-status"></span></p>
          <p>Payment status: <span data-testid="order-payment-status"></span></p>
        </div>
      )}
    </div>
  )
}

export default OrderDetails

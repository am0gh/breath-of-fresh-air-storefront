import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  return (
    <div data-testid="overview-page-wrapper">
      <div className="hidden small:block">
        <div className="flex justify-between items-center mb-4">
          <span
            className="font-display text-2xl text-olive font-light"
            data-testid="welcome-message"
            data-value={customer?.first_name}
          >
            Hello, {customer?.first_name}
          </span>
          <span className="text-sm text-bark/60">
            Signed in as:{" "}
            <span
              className="font-medium text-bark"
              data-testid="customer-email"
              data-value={customer?.email}
            >
              {customer?.email}
            </span>
          </span>
        </div>
        <div className="flex flex-col py-8 border-t border-sage/20">
          <div className="flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1">
            <div className="flex items-start gap-x-16 mb-6">
              <div className="flex flex-col gap-y-2">
                <h3 className="text-sm font-medium text-bark uppercase tracking-wider">Profile</h3>
                <div className="flex items-end gap-x-2">
                  <span
                    className="text-3xl font-light text-olive leading-none"
                    data-testid="customer-profile-completion"
                    data-value={getProfileCompletion(customer)}
                  >
                    {getProfileCompletion(customer)}%
                  </span>
                  <span className="uppercase text-sm text-bark/50 mb-1">
                    Completed
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-y-2">
                <h3 className="text-sm font-medium text-bark uppercase tracking-wider">Addresses</h3>
                <div className="flex items-end gap-x-2">
                  <span
                    className="text-3xl font-light text-olive leading-none"
                    data-testid="addresses-count"
                    data-value={customer?.addresses?.length || 0}
                  >
                    {customer?.addresses?.length || 0}
                  </span>
                  <span className="uppercase text-sm text-bark/50 mb-1">
                    Saved
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <h3 className="text-sm font-medium text-bark uppercase tracking-wider">Recent Orders</h3>
              <ul
                className="flex flex-col gap-y-3"
                data-testid="orders-wrapper"
              >
                {orders && orders.length > 0 ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li
                        key={order.id}
                        data-testid="order-wrapper"
                        data-value={order.id}
                      >
                        <LocalizedClientLink
                          href={`/account/orders/details/${order.id}`}
                        >
                          <div className="bg-sage/5 border border-sage/20 flex justify-between items-center p-4 hover:border-sage/40 transition-colors rounded-sm">
                            <div className="grid grid-cols-3 grid-rows-2 text-sm gap-x-4 flex-1">
                              <span className="font-medium text-bark">Date placed</span>
                              <span className="font-medium text-bark">Order number</span>
                              <span className="font-medium text-bark">Total amount</span>
                              <span className="text-bark/60" data-testid="order-created-date">
                                {new Date(order.created_at).toDateString()}
                              </span>
                              <span
                                className="text-terracotta"
                                data-testid="order-id"
                                data-value={order.display_id}
                              >
                                #{order.display_id}
                              </span>
                              <span className="text-bark/60" data-testid="order-amount">
                                {convertToLocale({
                                  amount: order.total,
                                  currency_code: order.currency_code,
                                })}
                              </span>
                            </div>
                            <button
                              className="flex items-center justify-between text-bark/40 hover:text-terracotta transition-colors"
                              data-testid="open-order-button"
                            >
                              <span className="sr-only">
                                Go to order #{order.display_id}
                              </span>
                              <ChevronDown className="-rotate-90" />
                            </button>
                          </div>
                        </LocalizedClientLink>
                      </li>
                    )
                  })
                ) : (
                  <span className="text-sm text-bark/50" data-testid="no-orders-message">
                    No recent orders
                  </span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview

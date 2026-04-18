import { isStripe, paymentInfoMap } from "@lib/constants"
import Divider from "@modules/common/components/divider"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0].payments?.[0]

  return (
    <div>
      <h2 className="font-display text-2xl text-olive font-light my-6">Payment</h2>
      <div>
        {payment && (
          <div className="flex items-start gap-x-8 w-full text-sm text-bark/70">
            <div className="flex flex-col w-1/3">
              <p className="font-medium text-bark mb-1">Payment method</p>
              <p data-testid="payment-method">
                {paymentInfoMap[payment.provider_id].title}
              </p>
            </div>
            <div className="flex flex-col w-2/3">
              <p className="font-medium text-bark mb-1">Payment details</p>
              <div className="flex gap-2 items-center">
                <div className="flex items-center h-7 w-fit p-2 bg-sage/10 border border-sage/20">
                  {paymentInfoMap[payment.provider_id].icon}
                </div>
                <p data-testid="payment-amount">
                  {isStripe(payment.provider_id) && payment.data?.card_last4
                    ? `**** **** **** ${payment.data.card_last4}`
                    : `${convertToLocale({
                        amount: payment.amount,
                        currency_code: order.currency_code,
                      })} paid at ${new Date(
                        payment.created_at ?? ""
                      ).toLocaleString()}`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

export default PaymentDetails

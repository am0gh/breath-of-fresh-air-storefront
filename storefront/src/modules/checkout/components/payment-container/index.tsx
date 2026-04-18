import { RadioGroup } from "@headlessui/react"
import { clx } from "@medusajs/ui"
import React from "react"

import Radio from "@modules/common/components/radio"

import PaymentTest from "../payment-test"
import { isManual } from "@lib/constants"

type PaymentContainerProps = {
  paymentProviderId: string
  selectedPaymentOptionId: string | null
  disabled?: boolean
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
}) => {
  const isDevelopment = process.env.NODE_ENV === "development"

  return (
    <>
      <RadioGroup.Option
        key={paymentProviderId}
        value={paymentProviderId}
        disabled={disabled}
        className={clx(
          "flex flex-col gap-y-2 text-sm cursor-pointer py-4 border px-6 mb-2 transition-colors duration-200",
          {
            "border-terracotta bg-terracotta/5":
              selectedPaymentOptionId === paymentProviderId,
            "border-sage/30 hover:border-sage/60":
              selectedPaymentOptionId !== paymentProviderId,
          }
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <Radio checked={selectedPaymentOptionId === paymentProviderId} />
            <span className="text-bark">
              {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}
            </span>
            {isManual(paymentProviderId) && isDevelopment && (
              <PaymentTest className="hidden small:block" />
            )}
          </div>
          <span className="text-bark/70">
            {paymentInfoMap[paymentProviderId]?.icon}
          </span>
        </div>
        {isManual(paymentProviderId) && isDevelopment && (
          <PaymentTest className="small:hidden text-[10px]" />
        )}
      </RadioGroup.Option>
    </>
  )
}

export default PaymentContainer

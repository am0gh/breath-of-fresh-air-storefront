"use client"

import { RadioGroup } from "@headlessui/react"
import { CheckCircleSolid } from "@medusajs/icons"
import { clx } from "@medusajs/ui"

import Divider from "@modules/common/components/divider"
import Radio from "@modules/common/components/radio"
import ErrorMessage from "@modules/checkout/components/error-message"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { setShippingMethod } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const selectedShippingMethod = availableShippingMethods?.find(
    // To do: remove the previously selected shipping method instead of using the last one
    (method) => method.id === cart.shipping_methods?.at(-1)?.shipping_option_id
  )

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const set = async (id: string) => {
    setIsLoading(true)
    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-cream">
      <div className="flex flex-row items-center justify-between mb-6">
        <h2
          className={clx(
            "flex flex-row font-display text-2xl text-olive font-light gap-x-2 items-center",
            {
              "opacity-40 pointer-events-none select-none":
                !isOpen && cart.shipping_methods?.length === 0,
            }
          )}
        >
          Delivery
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
            <CheckCircleSolid className="text-terracotta" />
          )}
        </h2>
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <button
              onClick={handleEdit}
              className="text-sm text-bark/60 hover:text-terracotta underline underline-offset-2 transition-colors duration-200"
              data-testid="edit-delivery-button"
            >
              Edit
            </button>
          )}
      </div>
      {isOpen ? (
        <div data-testid="delivery-options-container">
          <div className="pb-8">
            <RadioGroup value={selectedShippingMethod?.id} onChange={set}>
              {availableShippingMethods?.map((option) => {
                return (
                  <RadioGroup.Option
                    key={option.id}
                    value={option.id}
                    data-testid="delivery-option-radio"
                    className={clx(
                      "flex items-center justify-between text-sm cursor-pointer py-4 border px-6 mb-2 transition-colors duration-200",
                      {
                        "border-terracotta bg-terracotta/5":
                          option.id === selectedShippingMethod?.id,
                        "border-sage/30 hover:border-sage/60":
                          option.id !== selectedShippingMethod?.id,
                      }
                    )}
                  >
                    <div className="flex items-center gap-x-4">
                      <Radio
                        checked={option.id === selectedShippingMethod?.id}
                      />
                      <span className="text-bark">{option.name}</span>
                    </div>
                    <span className="text-bark font-medium">
                      {convertToLocale({
                        amount: option.amount!,
                        currency_code: cart?.currency_code,
                      })}
                    </span>
                  </RadioGroup.Option>
                )
              })}
            </RadioGroup>
          </div>

          <ErrorMessage
            error={error}
            data-testid="delivery-option-error-message"
          />

          <button
            className="mt-6 w-full py-4 bg-terracotta text-white text-sm tracking-widest uppercase rounded hover:bg-terracotta/90 transition-colors duration-200 disabled:bg-sage/40 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={!cart.shipping_methods?.[0]}
            data-testid="submit-delivery-option-button"
          >
            {isLoading ? "Loading..." : "Continue to payment"}
          </button>
        </div>
      ) : (
        <div>
          <div className="text-sm text-bark/70">
            {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
              <div className="flex flex-col w-1/3">
                <p className="font-medium text-bark mb-1">Method</p>
                <p>
                  {selectedShippingMethod?.name}{" "}
                  {convertToLocale({
                    amount: selectedShippingMethod?.amount!,
                    currency_code: cart?.currency_code,
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  )
}

export default Shipping

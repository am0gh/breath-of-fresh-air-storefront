"use client"

import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { RadioGroup } from "@headlessui/react"
import ErrorMessage from "@modules/checkout/components/error-message"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"

import Divider from "@modules/common/components/divider"
import PaymentContainer from "@modules/checkout/components/payment-container"
import { isStripe as isStripeFunc, paymentInfoMap } from "@lib/constants"
import { StripeContext } from "@modules/checkout/components/payment-wrapper"
import { initiatePaymentSession } from "@lib/data/cart"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: any[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const isStripe = isStripeFunc(activeSession?.provider_id)
  const stripeReady = useContext(StripeContext)

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "DM Sans, sans-serif",
          color: "#2C2A1E",
          fontSize: "14px",
          "::placeholder": {
            color: "#818E83",
          },
        },
        invalid: {
          color: "#B6592E",
        },
      },
      classes: {
        base: "pt-3 pb-1 block w-full h-11 px-4 mt-0 bg-cream border border-sage/40 appearance-none focus:outline-none focus:border-olive transition-all duration-200",
      },
    }
  }, [])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputCard =
        isStripeFunc(selectedPaymentMethod) && !activeSession

      if (!activeSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          }
        )
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
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
                !isOpen && !paymentReady,
            }
          )}
        >
          Payment
          {!isOpen && paymentReady && <CheckCircleSolid className="text-terracotta" />}
        </h2>
        {!isOpen && paymentReady && (
          <button
            onClick={handleEdit}
            className="text-sm text-bark/60 hover:text-terracotta underline underline-offset-2 transition-colors duration-200"
            data-testid="edit-payment-button"
          >
            Edit
          </button>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length && (
            <>
              <RadioGroup
                value={selectedPaymentMethod}
                onChange={(value: string) => setSelectedPaymentMethod(value)}
              >
                {availablePaymentMethods
                  .sort((a, b) => {
                    return a.provider_id > b.provider_id ? 1 : -1
                  })
                  .map((paymentMethod) => {
                    return (
                      <PaymentContainer
                        paymentInfoMap={paymentInfoMap}
                        paymentProviderId={paymentMethod.id}
                        key={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                      />
                    )
                  })}
              </RadioGroup>
              {isStripe && stripeReady && (
                <div className="mt-5 transition-all duration-150 ease-in-out">
                  <p className="text-sm font-medium text-bark mb-2">
                    Enter your card details:
                  </p>

                  <CardElement
                    options={useOptions as StripeCardElementOptions}
                    onChange={(e) => {
                      setCardBrand(
                        e.brand &&
                          e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                      )
                      setError(e.error?.message || null)
                      setCardComplete(e.complete)
                    }}
                  />
                </div>
              )}
            </>
          )}

          {paidByGiftcard && (
            <div className="flex flex-col w-1/3">
              <p className="text-sm font-medium text-bark mb-1">Payment method</p>
              <p className="text-sm text-bark/70" data-testid="payment-method-summary">
                Gift card
              </p>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <button
            className="mt-6 w-full py-4 bg-terracotta text-white text-sm tracking-widest uppercase hover:bg-terracotta/90 transition-colors duration-200 disabled:bg-sage/40 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={
              (isStripe && !cardComplete) ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            data-testid="submit-payment-button"
          >
            {isLoading
              ? "Loading..."
              : !activeSession && isStripeFunc(selectedPaymentMethod)
              ? "Enter card details"
              : "Continue to review"}
          </button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="flex items-start gap-x-8 w-full text-sm text-bark/70">
              <div className="flex flex-col w-1/3">
                <p className="font-medium text-bark mb-1">Payment method</p>
                <p data-testid="payment-method-summary">
                  {paymentInfoMap[selectedPaymentMethod]?.title ||
                    selectedPaymentMethod}
                </p>
              </div>
              <div className="flex flex-col w-1/3">
                <p className="font-medium text-bark mb-1">Payment details</p>
                <div
                  className="flex gap-2 items-center"
                  data-testid="payment-details-summary"
                >
                  <div className="flex items-center h-7 w-fit p-2 bg-sage/10 border border-sage/20">
                    {paymentInfoMap[selectedPaymentMethod]?.icon || (
                      <CreditCard />
                    )}
                  </div>
                  <p>
                    {isStripeFunc(selectedPaymentMethod) && cardBrand
                      ? cardBrand
                      : "Another step will appear"}
                  </p>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex flex-col w-1/3">
              <p className="text-sm font-medium text-bark mb-1">Payment method</p>
              <p className="text-sm text-bark/70" data-testid="payment-method-summary">
                Gift card
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

export default Payment

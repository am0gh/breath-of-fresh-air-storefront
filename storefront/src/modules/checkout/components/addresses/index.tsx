"use client"

import { CheckCircleSolid } from "@medusajs/icons"
import { useToggleState } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { HttpTypes } from "@medusajs/types"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-cream">
      <div className="flex flex-row items-center justify-between mb-6">
        <h2 className="flex flex-row font-display text-2xl text-olive font-light gap-x-2 items-center">
          Shipping Address
          {!isOpen && <CheckCircleSolid className="text-terracotta" />}
        </h2>
        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="text-sm text-bark/60 hover:text-terracotta underline underline-offset-2 transition-colors duration-200"
            data-testid="edit-address-button"
          >
            Edit
          </button>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <h2 className="font-display text-xl text-olive font-light pb-6 pt-8">
                  Billing address
                </h2>
                <BillingAddress cart={cart} />
              </div>
            )}
            <SubmitButton className="mt-6" data-testid="submit-address-button">
              Continue to delivery
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-sm text-bark/70">
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex items-start gap-x-1 w-full">
                  <div
                    className="flex flex-col w-1/3"
                    data-testid="shipping-address-summary"
                  >
                    <p className="font-medium text-bark mb-1">Shipping Address</p>
                    <p>{cart.shipping_address.first_name}{" "}{cart.shipping_address.last_name}</p>
                    <p>{cart.shipping_address.address_1}{" "}{cart.shipping_address.address_2}</p>
                    <p>{cart.shipping_address.postal_code},{" "}{cart.shipping_address.city}</p>
                    <p>{cart.shipping_address.country_code?.toUpperCase()}</p>
                  </div>

                  <div
                    className="flex flex-col w-1/3"
                    data-testid="shipping-contact-summary"
                  >
                    <p className="font-medium text-bark mb-1">Contact</p>
                    <p>{cart.shipping_address.phone}</p>
                    <p>{cart.email}</p>
                  </div>

                  <div
                    className="flex flex-col w-1/3"
                    data-testid="billing-address-summary"
                  >
                    <p className="font-medium text-bark mb-1">Billing Address</p>
                    {sameAsBilling ? (
                      <p>Same as shipping address.</p>
                    ) : (
                      <>
                        <p>{cart.billing_address?.first_name}{" "}{cart.billing_address?.last_name}</p>
                        <p>{cart.billing_address?.address_1}{" "}{cart.billing_address?.address_2}</p>
                        <p>{cart.billing_address?.postal_code},{" "}{cart.billing_address?.city}</p>
                        <p>{cart.billing_address?.country_code?.toUpperCase()}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  )
}

export default Addresses

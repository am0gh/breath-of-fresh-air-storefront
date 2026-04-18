"use client"

import { Badge, Label, Text } from "@medusajs/ui"
import React from "react"

import { applyPromotions } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Trash from "@modules/common/icons/trash"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"
import { Input } from "@medusajs/ui"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [isPending, setIsPending] = React.useState(false)

  const { promotions = [] } = cart

  // Collect all currently applied promotion codes (exclude automatic ones with no code)
  const currentCodes = promotions
    .filter((p) => p.code !== undefined)
    .map((p) => p.code!)

  const removePromotionCode = async (code: string) => {
    setErrorMessage(null)
    try {
      await applyPromotions(currentCodes.filter((c) => c !== code))
    } catch (e: any) {
      setErrorMessage(e.message)
    }
  }

  const addPromotionCode = async (formData: FormData) => {
    const code = formData.get("code")?.toString().trim()
    if (!code) return

    setErrorMessage(null)
    setIsPending(true)

    try {
      await applyPromotions([...currentCodes, code])
      // Clear the input on success
      const input = document.getElementById(
        "promotion-input"
      ) as HTMLInputElement | null
      if (input) input.value = ""
    } catch (e: any) {
      // Strip the "Error setting up the request: " prefix Medusa wraps around errors
      const raw: string = e.message ?? "Invalid promotion code"
      const msg = raw.replace(/^Error setting up the request:\s*/i, "")
      setErrorMessage(msg)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="w-full bg-cream flex flex-col">
      <div className="text-sm">
        <form action={addPromotionCode} className="w-full mb-5">
          <Label className="flex gap-x-1 my-2 items-center">
            <button
              onClick={() => {
                setIsOpen(!isOpen)
                setErrorMessage(null)
              }}
              type="button"
              className="text-sm text-bark/60 hover:text-terracotta underline underline-offset-2 transition-colors duration-200"
              data-testid="add-discount-button"
            >
              Add Promotion Code
            </button>
          </Label>

          {isOpen && (
            <>
              <div className="flex w-full gap-x-2">
                <Input
                  className="size-full"
                  id="promotion-input"
                  name="code"
                  type="text"
                  autoFocus={false}
                  data-testid="discount-input"
                />
                <SubmitButton
                  variant="secondary"
                  data-testid="discount-apply-button"
                  disabled={isPending}
                >
                  Apply
                </SubmitButton>
              </div>

              <ErrorMessage
                error={errorMessage}
                data-testid="discount-error-message"
              />
            </>
          )}
        </form>

        {promotions.length > 0 && (
          <div className="w-full flex items-center">
            <div className="flex flex-col w-full">
              <p className="text-sm font-medium text-bark mb-2">
                Promotion(s) applied:
              </p>

              {promotions.map((promotion) => (
                <div
                  key={promotion.id}
                  className="flex items-center justify-between w-full max-w-full mb-2"
                  data-testid="discount-row"
                >
                  <Text className="flex gap-x-1 items-baseline txt-small-plus w-4/5 pr-1">
                    <span className="truncate" data-testid="discount-code">
                      <Badge
                        color={promotion.is_automatic ? "green" : "grey"}
                        size="small"
                      >
                        {promotion.code}
                      </Badge>{" "}
                      (
                      {promotion.application_method?.value !== undefined &&
                        promotion.application_method.currency_code !==
                          undefined && (
                          <>
                            {promotion.application_method.type === "percentage"
                              ? `${promotion.application_method.value}%`
                              : convertToLocale({
                                  amount: promotion.application_method.value,
                                  currency_code:
                                    promotion.application_method.currency_code,
                                })}
                          </>
                        )}
                      )
                    </span>
                  </Text>

                  {!promotion.is_automatic && (
                    <button
                      className="flex items-center"
                      onClick={() => {
                        if (!promotion.code) return
                        removePromotionCode(promotion.code)
                      }}
                      data-testid="remove-discount-button"
                    >
                      <Trash size={14} />
                      <span className="sr-only">
                        Remove discount code from order
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DiscountCode

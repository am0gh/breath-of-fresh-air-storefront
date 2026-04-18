"use client"

import { clx } from "@medusajs/ui"

import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
}

const Item = ({ item, type = "full" }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { handle } = item.variant?.product ?? {}

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    const message = await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <div className="flex items-start gap-x-4 py-4 border-b border-sage/20 last:border-b-0" data-testid="product-row">
      {/* Thumbnail */}
      <LocalizedClientLink
        href={`/products/${handle}`}
        className={clx("shrink-0", {
          "w-16": type === "preview",
          "small:w-24 w-16": type === "full",
        })}
      >
        <Thumbnail
          thumbnail={item.variant?.product?.thumbnail}
          images={item.variant?.product?.images}
          size="square"
        />
      </LocalizedClientLink>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-y-1">
        <div className="flex items-start justify-between gap-x-4">
          <div className="flex flex-col">
            <p className="font-display text-base text-olive font-light" data-testid="product-title">
              {item.product_title}
            </p>
            <LineItemOptions variant={item.variant} data-testid="product-variant" />
          </div>

          {type === "full" && (
            <div className="hidden small:block text-bark font-medium text-sm shrink-0">
              <LineItemUnitPrice item={item} style="tight" />
            </div>
          )}

          {type === "preview" && (
            <span className="flex gap-x-1 text-sm text-bark/70 shrink-0">
              <span>{item.quantity}x </span>
              <LineItemUnitPrice item={item} style="tight" />
            </span>
          )}
        </div>

        {type === "full" && (
          <div className="flex items-center gap-x-3 mt-2">
            <DeleteButton id={item.id} data-testid="product-delete-button" />
            <CartItemSelect
              value={item.quantity}
              onChange={(value) => changeQuantity(parseInt(value.target.value))}
              className="w-14 h-8 border border-sage/40 bg-cream text-bark text-sm"
              data-testid="product-select-button"
            >
              {Array.from(
                { length: Math.min(maxQuantity, 10) },
                (_, i) => (
                  <option value={i + 1} key={i}>
                    {i + 1}
                  </option>
                )
              )}
              <option value={1} key={1}>1</option>
            </CartItemSelect>
            {updating && <Spinner />}
          </div>
        )}
        <ErrorMessage error={error} data-testid="product-error-message" />
      </div>

      {/* Total price */}
      <div
        className={clx("shrink-0 text-sm font-medium text-bark", {
          "flex flex-col items-end justify-center": type === "preview",
        })}
      >
        <LineItemPrice item={item} style="tight" />
      </div>
    </div>
  )
}

export default Item

import { HttpTypes } from "@medusajs/types"

import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
}

const Item = ({ item }: ItemProps) => {
  return (
    <div className="flex items-start gap-x-4 py-4 border-b border-sage/20 last:border-b-0" data-testid="product-row">
      <div className="w-16 shrink-0">
        <Thumbnail thumbnail={item.thumbnail} size="square" />
      </div>

      <div className="flex flex-1 flex-col gap-y-1">
        <p className="font-display text-base text-olive font-light" data-testid="product-name">
          {item.title}
        </p>
        {item.variant && (
          <LineItemOptions variant={item.variant} data-testid="product-variant" />
        )}
      </div>

      <div className="shrink-0 flex flex-col items-end justify-center text-sm">
        <span className="flex gap-x-1 text-bark/60">
          <span data-testid="product-quantity">{item.quantity}</span>x{" "}
          <LineItemUnitPrice item={item} style="tight" />
        </span>
        <span className="font-medium text-bark">
          <LineItemPrice item={item} style="tight" />
        </span>
      </div>
    </div>
  )
}

export default Item

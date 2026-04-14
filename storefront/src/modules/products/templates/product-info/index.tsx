import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-3">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-xs uppercase tracking-widest text-sage hover:text-bark transition-colors"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}

        <h1
          className="font-display text-4xl text-olive font-light leading-tight"
          data-testid="product-title"
        >
          {product.title}
        </h1>

        {product.description && (
          <p
            className="text-bark/70 text-sm leading-relaxed mt-1"
            data-testid="product-description"
          >
            {product.description}
          </p>
        )}
      </div>
    </div>
  )
}

export default ProductInfo

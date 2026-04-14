import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block bg-cream"
    >
      <div data-testid="product-wrapper">
        {/* Thumbnail */}
        <div className="overflow-hidden">
          <div className="transition-transform duration-500 group-hover:scale-[1.02]">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="full"
              isFeatured={isFeatured}
            />
          </div>
        </div>

        {/* Details */}
        <div className="pt-4 pb-2">
          <div className="flex items-end justify-between gap-x-2">
            <p
              className="font-display text-lg text-olive font-light leading-snug group-hover:underline group-hover:decoration-terracotta group-hover:underline-offset-4 transition-all"
              data-testid="product-title"
            >
              {product.title}
            </p>
            <div className="shrink-0 text-bark font-medium text-sm">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}

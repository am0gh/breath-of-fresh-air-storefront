import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <div className="bg-cream">
      {/* Product main section */}
      <div
        className="content-container py-10 small:py-16"
        data-testid="product-container"
      >
        <div className="flex flex-col small:flex-row gap-x-12 gap-y-10">
          {/* Left: images */}
          <div className="w-full small:w-3/5 relative">
            <ImageGallery images={product?.images || []} />
          </div>

          {/* Right: product info + actions */}
          <div className="w-full small:w-2/5 flex flex-col gap-y-8 small:sticky small:top-24 small:self-start">
            {/* Product info */}
            <ProductInfo product={product} />

            {/* Hemp material callout */}
            <div className="border-l-2 border-sage bg-cream/60 px-4 py-3">
              <p className="text-bark/70 text-sm italic leading-relaxed">
                Woven from 100% industrial hemp — naturally breathable, UV
                resistant, and built to outlast fast fashion.
              </p>
            </div>

            {/* Tabs (shipping, returns, etc.) */}
            <ProductTabs product={product} />

            {/* Add to cart */}
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div
        className="content-container py-12 border-t border-sage/20"
        data-testid="related-products-container"
      >
        <h2 className="font-display text-2xl text-olive font-light mb-8">
          You may also like
        </h2>
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductTemplate

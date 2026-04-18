

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export type ProductHit = {
  id: string
  title: string
  handle: string
  description: string | null
  thumbnail: string | null
  variants: HttpTypes.StoreProductVariant[]
  collection_handle: string | null
  collection_id: string | null
}

type HitProps = {
  hit: ProductHit
}

const Hit = ({ hit }: HitProps) => {
  return (
    <LocalizedClientLink
      href={`/products/${hit.handle}`}
      data-testid="search-result"
    >
      <div
        key={hit.id}
        className="flex sm:flex-col gap-2 w-full p-4 border border-sage/20 hover:border-sage/40 bg-cream transition-colors items-center sm:justify-center"
      >
        <Thumbnail
          thumbnail={hit.thumbnail}
          size="square"
          className="group h-12 w-12 sm:h-full sm:w-full"
        />
        <div className="flex flex-col justify-between group">
          <div className="flex flex-col">
            <span
              className="text-sm text-bark/70"
              data-testid="search-result-title"
            >
              {hit.title}
            </span>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}

export default Hit

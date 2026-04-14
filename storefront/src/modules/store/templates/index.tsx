import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="bg-cream min-h-screen">
      <div className="content-container py-12">
        {/* Page heading */}
        <div className="mb-10 border-b border-sage/20 pb-6">
          <h1
            className="font-display text-4xl text-olive font-light tracking-wide"
            data-testid="store-page-title"
          >
            Hemp Jackets
          </h1>
          <p className="text-sage mt-2 text-sm">
            Sustainably made. Built to last.
          </p>
        </div>

        <div
          className="flex flex-col small:flex-row small:items-start gap-8"
          data-testid="category-container"
        >
          {/* Filters sidebar */}
          <aside className="small:min-w-[200px]">
            <RefinementList sortBy={sort} />
          </aside>

          {/* Product grid */}
          <div className="w-full">
            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                countryCode={countryCode}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate


import Link from "next/link"

import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type SearchResultsTemplateProps = {
  query: string
  ids: string[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
}

const SearchResultsTemplate = ({
  query,
  ids,
  sortBy,
  page,
  countryCode,
}: SearchResultsTemplateProps) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <>
      <div className="flex justify-between border-b w-full py-6 px-8 small:px-14 items-center">
        <div className="flex flex-col items-start">
          <p className="text-sm text-bark/50">Search Results for:</p>
          <h2 className="font-display text-2xl text-olive font-light">
            {decodeURI(query)} ({ids.length})
          </h2>
        </div>
        <LocalizedClientLink
          href="/store"
          className="text-sm text-bark/60 hover:text-terracotta transition-colors underline underline-offset-2"
        >
          Clear
        </LocalizedClientLink>
      </div>
      <div className="flex flex-col small:flex-row small:items-start p-6">
        {ids.length > 0 ? (
          <>
            <RefinementList sortBy={sortBy || "created_at"} search />
            <div className="content-container">
              <PaginatedProducts
                productsIds={ids}
                sortBy={sortBy}
                page={pageNumber}
                countryCode={countryCode}
              />
            </div>
          </>
        ) : (
          <p className="ml-8 small:ml-14 mt-3 text-sm text-bark/60">No results.</p>
        )}
      </div>
    </>
  )
}

export default SearchResultsTemplate

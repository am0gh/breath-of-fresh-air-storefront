import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "The Collection — Schwaas",
  description:
    "Natural hemp clothing. Shirts, tees, and essentials built to outlast fast fashion, shaped by the land.",
}

type Params = {
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
  params: {
    countryCode: string
  }
}

export default async function StorePage({ searchParams, params }: Params) {
  const { sortBy, page } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}

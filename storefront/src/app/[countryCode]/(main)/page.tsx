import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Breath of Fresh Air — Hemp Jackets",
  description:
    "Sustainable hemp jackets crafted for the conscious explorer. Carbon neutral shipping.",
}

export default async function Home({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <div className="bg-cream">
      <Hero />

      {/* Featured Products */}
      <section className="content-container py-16">
        <h2 className="font-display text-3xl text-olive font-light tracking-wide mb-10">
          Featured Jackets
        </h2>
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </section>
    </div>
  )
}

import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import NewsletterForm from "@modules/layout/components/newsletter-form"

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="bg-bark w-full">
      <div className="content-container">
        {/* Three-column main footer */}
        <div className="grid grid-cols-1 small:grid-cols-3 gap-10 py-16 border-b border-cream/10">
          {/* Column 1: Brand tagline */}
          <div className="flex flex-col gap-y-4">
            <LocalizedClientLink
              href="/"
              className="font-display text-2xl text-cream hover:text-cream/80 transition-colors"
            >
              Breath of Fresh Air
            </LocalizedClientLink>
            <p className="text-sage text-sm leading-relaxed max-w-[240px]">
              Sustainable hemp clothing for the conscious explorer. Wear the
              earth, lightly.
            </p>
          </div>

          {/* Column 2: Navigation links */}
          <div className="flex flex-col gap-y-4">
            <span className="text-xs uppercase tracking-widest text-sage/60 font-medium">
              Navigate
            </span>
            <ul className="flex flex-col gap-y-2">
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="text-cream/70 text-sm hover:text-cream transition-colors"
                >
                  Shop Jackets
                </LocalizedClientLink>
              </li>
              {product_categories?.slice(0, 4).map((c) => {
                if (c.parent_category) return null
                return (
                  <li key={c.id}>
                    <LocalizedClientLink
                      href={`/categories/${c.handle}`}
                      className="text-cream/70 text-sm hover:text-cream transition-colors"
                      data-testid="category-link"
                    >
                      {c.name}
                    </LocalizedClientLink>
                  </li>
                )
              })}
              {collections?.slice(0, 3).map((c) => (
                <li key={c.id}>
                  <LocalizedClientLink
                    href={`/collections/${c.handle}`}
                    className="text-cream/70 text-sm hover:text-cream transition-colors"
                  >
                    {c.title}
                  </LocalizedClientLink>
                </li>
              ))}
              <li>
                <LocalizedClientLink
                  href="/account"
                  className="text-cream/70 text-sm hover:text-cream transition-colors"
                >
                  Account
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter — client component handles the form event */}
          <div className="flex flex-col gap-y-4">
            <span className="text-xs uppercase tracking-widest text-sage/60 font-medium">
              Stay in touch
            </span>
            <p className="text-sage text-sm leading-relaxed">
              New drops, field notes, and stories from the land.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col small:flex-row justify-between items-start small:items-center py-6 gap-y-2">
          <p className="text-sage/50 text-xs">
            © {new Date().getFullYear()} Breath of Fresh Air. All rights reserved.
          </p>
          <p className="text-sage/30 text-xs">
            Sustainably made · Carbon neutral shipping
          </p>
        </div>
      </div>
    </footer>
  )
}

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <div className="mt-6 pt-6 border-t border-sage/20">
      <h3 className="font-display text-lg text-olive font-light mb-3">Need help?</h3>
      <ul className="gap-y-2 flex flex-col text-sm">
        <li>
          <LocalizedClientLink
            href="/contact"
            className="text-bark/60 hover:text-terracotta underline underline-offset-2 transition-colors"
          >
            Contact us
          </LocalizedClientLink>
        </li>
        <li>
          <LocalizedClientLink
            href="/contact"
            className="text-bark/60 hover:text-terracotta underline underline-offset-2 transition-colors"
          >
            Returns & Exchanges
          </LocalizedClientLink>
        </li>
      </ul>
    </div>
  )
}

export default Help

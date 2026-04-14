"use client"

import { useEffect, useRef } from "react"

interface RevealWrapperProps {
  children: React.ReactNode
  className?: string
  /** 0–1: how much of the element must be visible before triggering */
  threshold?: number
}

/**
 * Adds `data-revealed="true"` to its wrapper div the moment the element
 * scrolls into the viewport. All child animation CSS is driven by:
 *   [data-revealed="true"] .your-element { ... }
 */
export default function RevealWrapper({
  children,
  className = "",
  threshold = 0.18,
}: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Already visible on first paint (e.g., above-fold sections)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.revealed = "true"
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={ref} data-revealed="false" className={className}>
      {children}
    </div>
  )
}

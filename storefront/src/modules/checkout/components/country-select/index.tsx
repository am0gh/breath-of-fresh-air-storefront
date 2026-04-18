import { forwardRef, useImperativeHandle, useMemo, useRef } from "react"

import NativeSelect, {
  NativeSelectProps,
} from "@modules/common/components/native-select"
import { HttpTypes } from "@medusajs/types"

// Comprehensive list of European countries shown in checkout.
// These map to ISO-3166-1 alpha-2 codes expected by Medusa.
// NOTE: Medusa must have these countries assigned to the active region
// (Settings → Regions in the admin panel) for checkout to succeed.
const EU_COUNTRIES = [
  { value: "at", label: "Austria" },
  { value: "be", label: "Belgium" },
  { value: "bg", label: "Bulgaria" },
  { value: "hr", label: "Croatia" },
  { value: "cy", label: "Cyprus" },
  { value: "cz", label: "Czech Republic" },
  { value: "dk", label: "Denmark" },
  { value: "ee", label: "Estonia" },
  { value: "fi", label: "Finland" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "gr", label: "Greece" },
  { value: "hu", label: "Hungary" },
  { value: "is", label: "Iceland" },
  { value: "ie", label: "Ireland" },
  { value: "it", label: "Italy" },
  { value: "lv", label: "Latvia" },
  { value: "li", label: "Liechtenstein" },
  { value: "lt", label: "Lithuania" },
  { value: "lu", label: "Luxembourg" },
  { value: "mt", label: "Malta" },
  { value: "nl", label: "Netherlands" },
  { value: "no", label: "Norway" },
  { value: "pl", label: "Poland" },
  { value: "pt", label: "Portugal" },
  { value: "ro", label: "Romania" },
  { value: "sk", label: "Slovakia" },
  { value: "si", label: "Slovenia" },
  { value: "es", label: "Spain" },
  { value: "se", label: "Sweden" },
  { value: "ch", label: "Switzerland" },
  { value: "gb", label: "United Kingdom" },
]

const CountrySelect = forwardRef<
  HTMLSelectElement,
  NativeSelectProps & {
    region?: HttpTypes.StoreRegion
  }
>(({ placeholder = "Country", region, defaultValue, ...props }, ref) => {
  const innerRef = useRef<HTMLSelectElement>(null)

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => innerRef.current
  )

  const countryOptions = useMemo(() => {
    // Build a set of country codes from the Medusa region (if available)
    // so we can merge without duplicates.
    const regionCodes = new Set(
      region?.countries?.map((c) => c.iso_2?.toLowerCase()).filter(Boolean) ?? []
    )

    // Start with the hardcoded EU list (always shown for a generic EU site).
    const euOptions = EU_COUNTRIES.map(({ value, label }) => ({ value, label }))

    // Append any region countries that aren't already in the EU list
    // (e.g. if the admin adds extra territories later).
    const extraOptions =
      region?.countries
        ?.filter((c) => c.iso_2 && !EU_COUNTRIES.some((e) => e.value === c.iso_2?.toLowerCase()))
        .map((country) => ({
          value: country.iso_2!,
          label: country.display_name ?? country.iso_2!,
        })) ?? []

    return [...euOptions, ...extraOptions]
  }, [region])

  return (
    <NativeSelect
      ref={innerRef}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...props}
    >
      {countryOptions?.map(({ value, label }, index) => (
        <option key={index} value={value}>
          {label}
        </option>
      ))}
    </NativeSelect>
  )
})

CountrySelect.displayName = "CountrySelect"

export default CountrySelect

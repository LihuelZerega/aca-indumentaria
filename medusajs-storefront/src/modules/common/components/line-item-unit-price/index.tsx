import { formatAmount } from "@lib/util/prices"
import { LineItem, Region } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"

import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { CalculatedVariant } from "types/medusa"

type LineItemUnitPriceProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
  style?: "default" | "tight"
}

const LineItemUnitPrice = ({
  item,
  region,
  style = "default",
}: LineItemUnitPriceProps) => {
  const originalPrice = (item.variant as CalculatedVariant).original_price
  const hasReducedPrice = (originalPrice * item.quantity || 0) > item.total!
  const reducedPrice = (item.total || 0) / item.quantity!

  return (
    <div className="flex flex-col text-ui-fg-muted justify-center h-full">
      {hasReducedPrice && (
        <>
          <p>
            {style === "default" && (
              <span className="text-ui-fg-muted">Original: </span>
            )}
            <span className="line-through">
              {formatAmount({
                amount: originalPrice,
                region: region,
                includeTaxes: false,
              })}
            </span>
          </p>
          {style === "default" && (
            <span className="text-aca-green">
              -{getPercentageDiff(originalPrice, reducedPrice || 0)}%
            </span>
          )}
        </>
      )}
      <span
        className={clx("text-base-regular", {
          "text-aca-green": hasReducedPrice,
        })}
      >
        {formatAmount({
          amount: reducedPrice || item.unit_price || 0,
          region: region,
          includeTaxes: false,
        })}
      </span>
    </div>
  )
}

export default LineItemUnitPrice

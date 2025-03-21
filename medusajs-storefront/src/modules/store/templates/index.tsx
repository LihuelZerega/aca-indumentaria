import { Suspense } from "react"

import { BlurFade } from "../../magic-ui/Blur-fade"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import Filters from "@modules/store/components/filters"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import SearchModal from "@modules/search/templates/search-modal"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

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

  return (
    <div
      className="flex flex-col sm:items-start p-6 2xl:mx-auto 2xl:max-w-8xl overflow-hidden content-container pb-12"
      data-testid="category-container"
    >
      <div className="w-full">
        <div className="hidden lg:flex flex-row items-center justify-between w-full border-b border-neutral-200 pb-6 mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">Aca Indumentaria</h1>
          {/* <RefinementList sortBy={sortBy || "created_at"} /> */}
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <BlurFade delay={0.25}>
              <Filters />
            </BlurFade>
            <BlurFade delay={0.5} className="lg:col-span-3">
              <PaginatedProducts
                sortBy={sortBy || "created_at"}
                page={pageNumber}
                countryCode={countryCode}
              />
            </BlurFade>
          </div>
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate

import Collapse from "@/components/common/Collapse";
import { useRouter } from "next/router";
import "react-input-range/lib/css/index.css";
import {
  ColorRefinementList,
  CustomRange,
  SizeRefinementList,
  RatingRefinementList,
} from "@/components/section/custom-algolia/CustomRefinementList";
import {
  ClearRefinements,
  RefinementList,
  SortBy,
} from "react-instantsearch-dom";

export function Category() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-2 text-sm text-[#616161] font-Rokkitt mb-2">
      <div className="w-full border border-[#dee2e6] px-4 py-4">
        <ClearRefinements
          transformItems={(items) =>
            router.pathname !== "/"
              ? items.filter(({ attribute }) => attribute !== "gender")
              : items.filter(({ attribute }) => attribute !== "")
          }
        />
      </div>
      <div className="w-full border border-[#dee2e6] px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-black">Sort by</h1>
        <SortBy
          defaultRefinement="default"
          items={[
            { value: "default", label: "Reset" },
            { value: "price_asc", label: "Price asc" },
            { value: "price_desc", label: "Price desc" },
            { value: "star_asc", label: "Rating asc" },
            { value: "star_desc", label: "Rating desc" },
          ]}
        />
      </div>
      <div className="w-full border border-[#dee2e6] px-4 py-4">
        <h1 className="text-xl font-semibold text-black pb-8">Price</h1>
        <CustomRange attribute="price" />
      </div>
      {router.pathname === "/" && (
        <div className="w-full border border-[#dee2e6] px-4 py-4">
          <h1 className="text-xl font-semibold text-black pb-2">Gender</h1>
          <RefinementList attribute="gender" defaultRefinement={[]} />
        </div>
      )}
      {router.pathname === "/shoes-for-men" && (
        <div className="w-full border border-[#dee2e6] px-4 py-4 hidden">
          <h1 className="text-xl font-semibold text-black pb-2">Gender</h1>
          <RefinementList attribute="gender" defaultRefinement={["male"]} />
        </div>
      )}
      {router.pathname === "/shoes-for-women" && (
        <div className="w-full border border-[#dee2e6] px-4 py-4 hidden">
          <h1 className="text-xl font-semibold text-black pb-2">Gender</h1>
          <RefinementList attribute="gender" defaultRefinement={["female"]} />
        </div>
      )}
      <div className="w-full border border-[#dee2e6] px-4 py-4">
        <h1 className="text-xl font-semibold text-black pb-2">Rating</h1>
        <RatingRefinementList attribute="rateScore" />
      </div>
      <div className="w-full border border-[#dee2e6] px-4 py-4">
        <Collapse title="Brand" className="text-xl font-semibold text-black">
          <div className="mt-6">
            <RefinementList attribute="brand" />
          </div>
        </Collapse>
      </div>
      <div className="w-full border border-[#dee2e6] px-4 py-4">
        <Collapse title="Style" className="text-xl font-semibold text-black">
          <div className="mt-6">
            <RefinementList attribute="style" />
          </div>
        </Collapse>
      </div>
      <div className="w-full border border-[#dee2e6] px-4 py-4">
        <Collapse title="Sizes" className="text-xl font-semibold text-black">
          <div className="mt-6">
            <SizeRefinementList attribute="size" />
          </div>
        </Collapse>
      </div>
      <div className="w-full border border-[#dee2e6] px-4 py-4">
        <Collapse title="Colors" className="text-xl font-semibold text-black">
          <div className="mt-6">
            <ColorRefinementList attribute="color" />
          </div>
        </Collapse>
      </div>
    </div>
  );
}

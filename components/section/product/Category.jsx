import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import {
  ClearRefinements,
  NumericMenu,
  RefinementList,
  connectRange,
} from "react-instantsearch-dom";

export function Category() {
  const router = useRouter();

  const ConnectedRange = connectRange(CustomRange);

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
      <div className="w-full border border-[#dee2e6] px-4 py-4">
        <h1 className="text-xl font-semibold text-black pb-6">Price</h1>
        {/* <NumericMenu
          attribute="price"
          items={[
            { label: "<= $10", end: 10 },
            { label: "$10 - $100", start: 10, end: 100 },
            { label: "$100 - $500", start: 100, end: 500 },
            { label: ">= $500", start: 500 },
          ]}
        /> */}
        <ConnectedRange attribute="price" />
      </div>
      {router.pathname === "/" && (
        <div className="w-full border border-[#dee2e6] px-4 py-4">
          <h1 className="text-xl font-semibold text-black pb-6">Gender</h1>
          <RefinementList attribute="gender" defaultRefinement={[]} />
        </div>
      )}
      {router.pathname === "/shoes-for-men" && (
        <div className="w-full border border-[#dee2e6] px-4 py-4 hidden">
          <h1 className="text-xl font-semibold text-black pb-6">Gender</h1>
          <RefinementList attribute="gender" defaultRefinement={["male"]} />
        </div>
      )}
      {router.pathname === "/shoes-for-women" && (
        <div className="w-full border border-[#dee2e6] px-4 py-4 hidden">
          <h1 className="text-xl font-semibold text-black pb-6">Gender</h1>
          <RefinementList attribute="gender" defaultRefinement={["female"]} />
        </div>
      )}
      <div className="w-full border border-[#dee2e6] px-4 py-4">
        <h1 className="text-xl font-semibold text-black pb-6">Brand</h1>
        <RefinementList attribute="brand" />
      </div>
      <div className="w-full border border-[#dee2e6] px-4 py-4">
        <h1 className="text-xl font-semibold text-black pb-6">Style</h1>
        <RefinementList attribute="style" />
      </div>
      <div className="w-full border border-[#dee2e6] px-4 py-4">
        <h1 className="text-xl font-semibold text-black pb-6">Size</h1>
        <RefinementList attribute="size" />
      </div>
      <div className="w-full border border-[#dee2e6] px-4 py-4">
        <h1 className="text-xl font-semibold text-black pb-6">Color</h1>
        <RefinementList attribute="color" />
      </div>
    </div>
  );
}
const CustomRange = ({ min, max, currentRefinement, refine }) => {
  const [value, setValue] = useState();
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    setValue({
      min: min,
      max: max,
    });
  }, [min, max]);
  if (!min || !max) {
    return <h1>Loading...</h1>;
  }
  return (
    min &&
    max && (
      <div className="pb-5 px-3">
        <InputRange
          minValue={min}
          maxValue={max}
          value={value}
          onChange={handleChange}
          onChangeComplete={(value) => refine(value)}
        />
      </div>
    )
  );
};

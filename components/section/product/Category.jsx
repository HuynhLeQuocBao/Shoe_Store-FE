import { useRouter } from "next/router";
import { useState } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import {
  ClearRefinements,
  RefinementList,
  connectRange,
} from "react-instantsearch-dom";

export function Category() {
  const router = useRouter();
  const CustomRange = ({ min, max, currentRefinement, refine }) => {
    const [value, setValue] = useState({
      min: currentRefinement.min || min,
      max: currentRefinement.max || max,
    });

    const handleChange = (newValue) => {
      setValue(newValue);
    };

    return (
      <div className="pb-5 px-3">
        <InputRange
          minValue={min}
          maxValue={max}
          value={value}
          onChange={handleChange}
          onChangeComplete={(value) => refine(value)}
        />
      </div>
    );
  };

  const ConnectedRange = connectRange(CustomRange);

  return (
    <div className="grid grid-cols-1 gap-2 text-sm text-[#616161] font-Rokkitt mb-2">
      <div className="w-full border border-[#dee2e6] px-4 py-4">
        <ClearRefinements />
      </div>
      <div className="w-full border border-[#dee2e6] px-4 py-4">
        <h1 className="text-xl font-semibold text-black pb-6">Price</h1>
        <ConnectedRange attribute="price" min={50} max={110} />
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

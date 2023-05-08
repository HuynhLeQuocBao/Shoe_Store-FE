import clsx from "clsx";
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
  connectRefinementList,
} from "react-instantsearch-dom";

export function Category() {
  const router = useRouter();

  const ConnectedRange = connectRange(CustomRange);
  const CustomColorRefinementList = connectRefinementList(ColorRefinementList);
  const CustomSizeRefinementList = connectRefinementList(SizeRefinementList);

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
        <CustomSizeRefinementList attribute="size" />
      </div>
      <div className="w-full border border-[#dee2e6] px-4 py-4">
        <h1 className="text-xl font-semibold text-black pb-6">Color</h1>
        <CustomColorRefinementList attribute="color" />
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
const ColorRefinementList = ({ items, refine }) => {
  return (
    <div className="flex w-full gap-6 flex-wrap p-3">
      {items?.map((item) => (
        <div
          key={item.label}
          className="flex gap-2 hover:cursor-pointer"
          onClick={() => refine(item.value)}
        >
          <div
            style={{ backgroundColor: `${item?.label}` }}
            className={`w-5 h-5 rounded-full border-[1px] border-black`}
          ></div>
          <div className={`${item.isRefined ? "text-blue-500 font-bold" : ""}`}>
            {item.label}({item.count})
          </div>
        </div>
      ))}
    </div>
  );
};
const SizeRefinementList = ({ items, refine }) => {
  return (
    <div className="flex w-full gap-3 flex-wrap p-3">
      {items?.map((item) => (
        <div
          key={item.label}
          className={`w-9 h-9 hover:cursor-pointer flex justify-center items-center p-2 border-[1px] border-black rounded-full ${
            item.isRefined ? "bg-blue-500 text-white" : "bg-transparent"
          } `}
          onClick={() => refine(item.value)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

import { useEffect } from "react";
import { useState } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { connectRange, connectRefinementList } from "react-instantsearch-dom";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

export const CustomRange = connectRange(
  ({ min, currentRefinement, max, refine }) => {
    const [value, setValue] = useState();
    const handleChange = (newValue) => {
      setValue(newValue);
    };
    useEffect(() => {
      setValue(currentRefinement);
    }, [currentRefinement]);

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
  }
);

export const ColorRefinementList = connectRefinementList(
  ({ items, refine }) => {
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
            <div
              className={`hover:text-teal-600 ${
                item.isRefined ? "text-teal-600 font-bold" : ""
              }`}
            >
              {item.label.toLowerCase()} ({item.count})
            </div>
          </div>
        ))}
      </div>
    );
  }
);

export const SizeRefinementList = connectRefinementList(({ items, refine }) => {
  return (
    <div className="flex w-full gap-3 flex-wrap p-3">
      {items?.map((item) => (
        <div
          key={item.label}
          className={`w-9 h-9 hover:cursor-pointer flex justify-center items-center p-2 border-[1px] border-black rounded-full hover:bg-teal-600 hover:text-white ${
            item.isRefined ? "bg-teal-600 text-white" : "bg-transparent"
          } `}
          onClick={() => refine(item.value)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
});

export const RatingRefinementList = connectRefinementList(
  ({ items, refine }) => {
    return (
      <div className="flex flex-col gap-2 w-full text-lg">
        {items
          .sort((a, b) => b.label - a.label)
          .map((item) => (
            <div onClick={() => refine(item.value)} key={item.label}>
              {item.label == 0 && (
                <div
                  className={`flex items-center justify-between text-sm cursor-pointer ${
                    item.isRefined ? "text-teal-600 font-bold" : ""
                  }`}
                >
                  <p>Not review</p>
                  <p className="px-2 text-xs rounded-md bg-primary font-bold text-black">
                    {item.count}
                  </p>
                </div>
              )}
              {item.label == 1 && (
                <div className="flex items-center justify-between cursor-pointer">
                  <FaStar
                    className={` ${
                      item.isRefined ? "text-yellow-400" : "text-yellow-200"
                    } duration-200 mr-1`}
                  />
                  <p className="px-2 text-xs rounded-md bg-primary font-bold text-black h-4">
                    {item.count}
                  </p>
                </div>
              )}
              {item.label == 2 && (
                <div className="flex items-center justify-between cursor-pointer">
                  <div className="flex cursor-pointer">
                    <FaStar
                      className={` ${
                        item.isRefined ? "text-yellow-400" : "text-yellow-200"
                      } duration-200 mr-1`}
                    />
                    <FaStar
                      className={` ${
                        item.isRefined ? "text-yellow-400" : "text-yellow-200"
                      } duration-200 mr-1`}
                    />
                  </div>
                  <p className="px-2 text-xs rounded-md bg-primary font-bold text-black h-4">
                    {item.count}
                  </p>
                </div>
              )}
              {item.label == 3 && (
                <div className="flex items-center justify-between cursor-pointer">
                  <div className="flex cursor-pointer">
                    <FaStar
                      className={` ${
                        item.isRefined ? "text-yellow-400" : "text-yellow-200"
                      } duration-200 mr-1`}
                    />
                    <FaStar
                      className={` ${
                        item.isRefined ? "text-yellow-400" : "text-yellow-200"
                      } duration-200 mr-1`}
                    />
                    <FaStar
                      className={` ${
                        item.isRefined ? "text-yellow-400" : "text-yellow-200"
                      } duration-200 mr-1`}
                    />
                  </div>
                  <p className="px-2 text-xs rounded-md bg-primary font-bold text-black h-4">
                    {item.count}
                  </p>
                </div>
              )}
              {item.label == 4 && (
                <div className="flex items-center justify-between cursor-pointer">
                  <div className="flex cursor-pointer">
                    <FaStar
                      className={` ${
                        item.isRefined ? "text-yellow-400" : "text-yellow-200"
                      } duration-200 mr-1`}
                    />
                    <FaStar
                      className={` ${
                        item.isRefined ? "text-yellow-400" : "text-yellow-200"
                      } duration-200 mr-1`}
                    />
                    <FaStar
                      className={` ${
                        item.isRefined ? "text-yellow-400" : "text-yellow-200"
                      } duration-200 mr-1`}
                    />
                    <FaStar
                      className={` ${
                        item.isRefined ? "text-yellow-400" : "text-yellow-200"
                      } duration-200 mr-1`}
                    />
                  </div>
                  <p className="px-2 text-xs rounded-md bg-primary font-bold text-black h-4">
                    {item.count}
                  </p>
                </div>
              )}
              {item.label == 5 && (
                <div className="flex items-center justify-between cursor-pointer">
                  <div className="flex cursor-pointer">
                    <FaStar
                      className={` ${
                        item.isRefined ? "text-yellow-400" : "text-yellow-200"
                      } duration-200 mr-1`}
                    />
                    <FaStar
                      className={` ${
                        item.isRefined ? "text-yellow-400" : "text-yellow-200"
                      } duration-200 mr-1`}
                    />
                    <FaStar
                      className={` ${
                        item.isRefined ? "text-yellow-400" : "text-yellow-200"
                      } duration-200 mr-1`}
                    />
                    <FaStar
                      className={` ${
                        item.isRefined ? "text-yellow-400" : "text-yellow-200"
                      } duration-200 mr-1`}
                    />
                    <FaStar
                      className={` ${
                        item.isRefined ? "text-yellow-400" : "text-yellow-200"
                      } duration-200 mr-1`}
                    />
                  </div>
                  <p className="px-2 text-xs rounded-md bg-primary font-bold text-black h-4">
                    {item.count}
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>
    );
  }
);

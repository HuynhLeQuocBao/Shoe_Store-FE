import { categoryApi } from "@/apiClient/category";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
export function Category({ onDataFilter, dataSort }) {
  const [data, setData] = useState([]);
  const arraySort = [
    "Newest",
    "Oldest",
    "Price: Lowest to Highest",
    "Price: Highest to Lowest",
    "A - Z",
    "Z - A",
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    try {
      const fechPublic = async () => {
        const dataCategory = await categoryApi.getCatagory();
        setData(dataCategory);
      };
      fechPublic();
    } catch (error) {
      console.log("Error");
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const arrayCateId = [];
      data?.brand.map((item) => {
        arrayCateId.push(item);
      });
      data?.size.map((item) => {
        arrayCateId.push(item);
      });
      data?.style.map((item) => {
        arrayCateId.push(item);
      });

      const fetchProductFilter = async () => {
        const dataFilter = await categoryApi.filterCategory({
          arrayCateId: arrayCateId,
        });

        if (dataFilter?.length > 0) {
          onDataFilter(dataFilter);
        } else {
          onDataFilter([]);
        }
      };
      fetchProductFilter();
    } catch (error) {
      console.log("Error");
    }
  };

  const handleSort = (item) => {
    switch (item) {
      case "Newest":
        onDataFilter([]);
        break;
      case "Oldest":
        onDataFilter([]);
        break;
      case "Price: Lowest to Highest":
        onDataFilter([]);
        setTimeout(() => {
          onDataFilter(
            dataSort.sort(function (a, b) {
              return a.price - b.price;
            })
          );
        });
        break;
      case "Price: Highest to Lowest":
        onDataFilter([]);
        setTimeout(() => {
          onDataFilter(
            dataSort.sort(function (a, b) {
              return b.price - a.price;
            })
          );
        });
        break;
      case "A - Z":
        onDataFilter([]);
        setTimeout(() => {
          onDataFilter(
            dataSort.sort(function (a, b) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
          );
        });
        break;
      case "Z - A":
        onDataFilter([]);
        setTimeout(() => {
          onDataFilter(
            dataSort.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            })
          );
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-2 text-sm text-[#616161] font-Rokkitt mb-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full border border-[#dee2e6] px-4 py-4">
          <h3 className="font-base font-semibold text-black pb-6">SORT BY</h3>
          <div class="flex flex-col">
            {arraySort.map((item, index) => (
              <div
                className="flex items-center"
                key={index}
                onClick={() => handleSort(item)}
              >
                <input
                  id={item}
                  className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  value={item}
                  {...register("sort")}
                />
                <label class="text-gray-800 cursor-pointer" htmlFor={item}>
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full border border-[#dee2e6] px-4 py-4">
          <h3 className="font-base font-semibold text-black pb-6">BRAND</h3>
          <div class="flex flex-col">
            {data?.brand?.map((item, index) => (
              <div className="flex items-center" key={index}>
                <input
                  id={item.cateId}
                  className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value={item.cateId}
                  {...register("brand")}
                />
                <label
                  class="text-gray-800 cursor-pointer"
                  htmlFor={item.cateId}
                >
                  {item.cateName}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full border border-[#dee2e6] px-4 py-4">
          <h3 className="font-base font-semibold text-black pb-6">Sizes</h3>
          <div class="flex flex-wrap">
            {data?.size?.map((item, index) => (
              <div className="flex items-center" key={index}>
                <input
                  id={item.cateId}
                  className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value={item.cateId}
                  {...register("size")}
                />
                <label
                  class={`w-8 h-8 m-2 bg-primary cursor-pointer flex flex-center hover:bg-secondary hover:text-white`}
                  htmlFor={item.cateId}
                >
                  {item.cateName}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full border border-[#dee2e6] px-4 py-4">
          <h3 className="font-base font-semibold text-black pb-6">Styles</h3>
          <div class="flex flex-col">
            {data?.style?.map((item, index) => (
              <div className="flex items-center" key={index}>
                <input
                  id={item.cateId}
                  className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value={item.cateId}
                  {...register("style")}
                />
                <label
                  class="text-gray-800 cursor-pointer"
                  htmlFor={item.cateId}
                >
                  {item.cateName}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button className="w-1/4 bg-slate-400 rounded-lg mt-2 py-2 text-white font-bold">
            Filter
          </button>
        </div>
      </form>
    </div>
  );
}

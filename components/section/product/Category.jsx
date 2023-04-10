import { categoryApi } from "@/apiClient/category";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
export function Category({ onDataFilter }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState([]);
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
          option: data?.option,
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
  return (
    <div className="grid grid-cols-1 gap-2 text-sm text-[#616161] font-Rokkitt mb-2">
      <form onSubmit={handleSubmit(onSubmit)}>
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
                <label class="text-gray-800 " htmlFor={item.cateId}>
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
                  class={`w-10 h-10 m-2 bg-primary text-white"
                  } cursor-pointer flex flex-center hover:bg-secondary hover:text-white`}
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
                <label class="text-gray-800 " htmlFor={item.cateId}>
                  {item.cateName}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full border border-[#dee2e6] px-4 py-4">
          <h3 className="font-base font-semibold text-black pb-6">Optional</h3>
          <div class="flex flex-col">
            <div className="flex items-center">
              <input
                id="or"
                className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                value="OR"
                {...register("option")}
              />
              <label class="text-gray-800 " htmlFor="or">
                Or
              </label>
            </div>
            <div class="flex flex-col">
              <div className="flex items-center">
                <input
                  id="and"
                  className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  value="AND"
                  {...register("option")}
                />
                <label class="text-gray-800 " htmlFor="and">
                  And
                </label>
              </div>
            </div>
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

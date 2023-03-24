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
      const fetchProductFilter = async () => {
        const dataFilter = await categoryApi.filterCategory({
          arrayCateId: data?.brand,
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
          <div class="flex items-center">
            {data?.brand?.map((item, index) => (
              <div className="flex items-center" key={index}>
                <input
                  class="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
                  type="checkbox"
                  value={item.cateId}
                  {...register("brand")}
                />
                <label
                  class="inline-block text-gray-800 "
                  for="flexCheckDefault"
                >
                  {item.cateName}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full border border-[#dee2e6] px-4 py-4">
          <h3 className="font-base font-semibold text-black pb-6">SIZE</h3>
          {data?.size?.map((item, index) => (
            <button
              className="w-10 h-10 mr-1 mb-1 hover:bg-primary rounded-sm bg-[#ccc] text-white cursor-pointer"
              key={index}
            >
              {item.cateName}
            </button>
          ))}
        </div>
        <div className="w-full border border-[#dee2e6] px-4 py-4">
          <h3 className="font-base font-semibold text-black pb-6">STYLE</h3>
          {data?.style?.map((item, index) => (
            <p className="cursor-pointer hover:text-primary" key={index}>
              {item.cateName}
            </p>
          ))}
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

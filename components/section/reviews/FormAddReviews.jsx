import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Stars from "./Stars";
import { useEffect } from "react";
import { reviewsApi } from "@/apiClient/reviews";
import { toast } from "react-toastify";
import LoadingPage from "../loading/LoadingPage";
import LoadingPageComponent from "../loading/LoadingPageComponent";
import { orderApi } from "@/apiClient/order";
import ItemReviews from "./ItemReviews";

function FormRatingAndComment({ id, onClose, setEdit, isEdit }) {
  const [submitting, setSubmitting] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);
  const [rateInfo, setRateInfo] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    register,
    clearErrors,
    setValue,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const onSubmit = async (data) => {
    let result;
    setIsloading(true);

    result = await reviewsApi.commentAndRate(id, data);

    if (result?.status) {
      toast.success(result.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsloading(false);
      setEdit();
      onClose();
    } else {
      toast.error(result.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsloading(false);
      onClose();
    }
  };
  useEffect(() => {
    let data;
    const fetchOrderDetail = async () => {
      try {
        data = await orderApi.getOrderDetail(id);
        setOrderDetail(data.results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        onClose();
        console.log("getRate error: " + error);
      }
    };
    fetchOrderDetail();
  }, [id]);
  const handleChangeStar = ({ star, shoeId, index }) => {
    const valueStar = getValues(`listRate?.${index}?.rating`);
    setValue(`listRate.${index}.shoeId`, shoeId);
    if (!valueStar) {
      setValue(`listRate.${index}.rating`, star);
      clearErrors(`listRate.${index}.rating`);
    } else {
      setValue(`listRate.${index}.rating`, star);
    }
  };
  return (
    <div className="relative h-full">
      {loading ? (
        <div className="flex-center h-full">
          <LoadingPage />
        </div>
      ) : (
        <div className=" h-full">
          <LoadingPageComponent loading={isLoading} />
          <div className="sticky h-[10%] w-full bg-white  top-0 shadow-md z-10">
            <h1 className="flex items-center justify-center font-bold text-[22px] md:text-2xl mb-4 ">
              Reviews
            </h1>
          </div>

          <div className="h-[80%] overflow-y-scroll">
            {orderDetail &&
              orderDetail.map((item, index) => (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mx-auto p-2"
                  key={index}
                >
                  <ItemReviews data={item} />
                  <div className="flex flex-col mb-4">
                    <div className="flex items-center gap-5">
                      <label className="text-gray-600">Rating:</label>
                      <Stars
                        stars={getValues(`listRate.${index}.rating`)}
                        {...register(`listRate.${index}.rating`, {
                          required: true,
                        })}
                        onRating={(star) =>
                          handleChangeStar({ star, shoeId: item.shoeId, index })
                        }
                        className="w-7 h-7 md:h-10 md:w-10 hover:cursor-pointer"
                      />
                    </div>
                    {errors.listRate &&
                      errors.listRate[index] &&
                      errors.listRate[index].rating && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                  </div>
                  <div className="mb-4">
                    <Controller
                      control={control}
                      name={`listRate.${index}.comment`}
                      render={({ field }) => (
                        <>
                          <label
                            htmlFor={`comment-${index}`}
                            className="text-gray-600"
                          >
                            Comment:
                          </label>
                          <textarea
                            id={`comment-${index}`}
                            {...register(`listRate.${index}.comment`, {
                              required: true,
                              maxLength: 500,
                            })}
                            placeholder="Enter comment"
                            className={`block border border-gray-400 outline-none rounded-md px-3 py-2 w-full`}
                            rows="4"
                            value={getValues(`listRate.${index}.comment`)}
                            maxLength="250"
                          />
                        </>
                      )}
                    />

                    {errors.listRate &&
                      errors.listRate[index] &&
                      errors.listRate[index].comment && (
                        <div className="flex justify-between">
                          <span className="text-red-500">
                            This field is required
                          </span>
                        </div>
                      )}
                  </div>
                  <div className="w-full min-h-[1px] bg-black mb-3 "></div>
                </form>
              ))}
          </div>

          <div className="sticky bg-white bottom-0 justify-end shadow-top px-4 py-4 gap-6">
            <div className="flex justify-end px-4 gap-6">
              <button
                className="bg-white font-bold w-32 py-[5px] px-4 shadow-icon-product rounded-lg hover:bg-slate-200 duration-200 hover:cursor-pointer"
                onClick={() => onClose()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-cyan-600 text-white font-bold w-32 py-[5px] px-4 shadow-icon-product rounded-lg hover:bg-cyan-800 duration-200 hover:cursor-pointer"
                disabled={submitting}
                onClick={handleSubmit(onSubmit)}
              >
                Reviews
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormRatingAndComment;

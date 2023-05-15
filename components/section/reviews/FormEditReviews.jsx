import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Stars from "./Stars";
import { useEffect } from "react";
import { reviewsApi } from "@/apiClient/reviews";
import { toast } from "react-toastify";
import LoadingPage from "../loading/LoadingPage";
import LoadingPageComponent from "../loading/LoadingPageComponent";

function FormEditReviews({ shoeId, onBack, dataUpdate, indexReview }) {
  const [rateInfo, setRateInfo] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isStar, setIsStar] = useState(0);
  const {
    register,
    setError,
    clearErrors,
    setValue,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const onSubmit = async (data) => {
    setIsloading(true);
    let result;
    result = await reviewsApi.editComment(shoeId, {
      rating: rateInfo?.rating,
      comment: data?.comment,
    });
    if (result?.status) {
      dataUpdate({
        index: indexReview,
        shoeId: shoeId,
        rating: rateInfo?.rating,
        comment: data?.comment,
      });
      toast.success(result.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsloading(false);
      onBack();
    } else {
      toast.error(result.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsloading(false);
      onBack();
    }
  };

  useEffect(() => {
    const getRate = async () => {
      try {
        const rateData = await reviewsApi.getRate(shoeId);
        setRateInfo(rateData);
        setValue("rating", rateData.rating);
        setValue("comment", rateData.comment);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("getRate error: " + error);
      }
    };
    getRate();
  }, [shoeId]);
  const handleChangeStar = (star) => {
    setRateInfo({
      ...rateInfo,
      rating: star,
    });
    setIsStar(star);
  };
  return (
    <>
      {loading ? (
        <div className="flex-center h-full">
          <LoadingPage />
        </div>
      ) : (
        <>
          <LoadingPageComponent loading={isLoading} />
          <div className="relative h-full">
            <form onSubmit={handleSubmit(onSubmit)} className="h-full p-2">
              <div className="flex flex-col mb-4">
                <div className="flex items-center gap-5">
                  <label htmlFor="rating" className="text-gray-600">
                    Rating:
                  </label>
                  <Stars
                    stars={rateInfo.rating}
                    onRating={(star) => handleChangeStar(star)}
                    className="w-7 h-7 md:h-10 md:w-10 hover:cursor-pointer"
                  />
                </div>
                {errors.rating && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="mb-4">
                <Controller
                  control={control}
                  name="comment"
                  render={({ field }) => (
                    <>
                      <label htmlFor="comment" className="text-gray-600">
                        Comment:
                      </label>
                      <textarea
                        {...register("comment", {
                          required: true,
                          maxLength: 500,
                        })}
                        id="comment"
                        placeholder="Enter comment"
                        className={`block border border-gray-400 outline-none rounded-md px-3 py-2 w-full`}
                        rows="4"
                        //   value={rateInfo?.comment}
                        //   value={getValues}
                        value={getValues("comment")}
                        maxLength="500"
                      />
                    </>
                  )}
                />

                {errors.comment && (
                  <div className="flex justify-between">
                    <span className="text-red-500">This field is required</span>
                  </div>
                )}
              </div>
            </form>
            <div className="sticky bg-white bottom-0 justify-end shadow-top px-4 py-4 gap-6">
              <div className="flex justify-end px-4  gap-6">
                <button
                  className="bg-white font-bold w-32 py-[5px] px-4 shadow-icon-product rounded-lg hover:bg-slate-200 duration-200 hover:cursor-pointer"
                  onClick={() => onBack()}
                >
                  Cancel
                </button>
                <button
                  className="bg-cyan-600 text-white font-bold w-32 py-[5px] px-4 shadow-icon-product rounded-lg hover:bg-cyan-800 duration-200 hover:cursor-pointer"
                  onClick={handleSubmit(onSubmit)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FormEditReviews;

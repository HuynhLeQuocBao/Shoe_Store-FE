import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Stars from "./Stars";
import { useEffect } from "react";
import { reviewsApi } from "@/apiClient/reviews";
import { toast } from "react-toastify";
import LoadingPage from "../loading/LoadingPage";
import LoadingPageComponent from "../loading/LoadingPageComponent";

function FormRatingAndComment({ id, onClose, setEdit, isEdit }) {
  const [commentLength, setCommentLength] = useState(0);
  const [rateInfo, setRateInfo] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [isStar, setIsStar] = useState(0);
  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const onSubmit = async (data) => {
    setIsloading(true);
    let result;
    if (isEdit) {
      result = await reviewsApi.editComment(id, {
        rating: rateInfo.rating,
        comment: data?.comment,
      });
    } else {
      result = await reviewsApi.commentAndRate(id, {
        rating: isStar,
        comment: data?.comment,
      });
    }
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

  const handleCommentChange = (e) => {
    if (rateInfo) {
      setRateInfo({
        ...rateInfo,
        comment: e.target.value,
      });
    }
    setCommentLength(e.target.value.length);
  };
  useEffect(() => {
    if (!isEdit) {
      return;
    } else {
      const getRate = async () => {
        try {
          const rateData = await reviewsApi.getRate(id);
          setRateInfo(rateData);
        } catch (error) {
          console.log("getRate error: " + error);
        }
      };
      getRate();
    }
  }, [isEdit, id]);
  useEffect(() => {
    if (!rateInfo && isEdit) {
      return;
    } else if (isStar === 0) {
      return;
    }
    handleErrorStar();
  }, [isStar, rateInfo]);
  const handleErrorStar = () => {
    if (!rateInfo && isEdit) {
      setError("isStar", { type: "required" });
    } else {
      clearErrors("isStar");
      return;
    }
    if (isStar === 0) {
      setError("isStar", { type: "required" });
    } else {
      clearErrors("isStar");
    }
  };
  const handleChangeStar = (star) => {
    if (rateInfo) {
      setRateInfo({
        ...rateInfo,
        rating: star,
      });
    } else {
      setIsStar(star);
    }
  };
  return (
    <>
      {isEdit && !rateInfo ? (
        <div className="flex-center h-full">
          <LoadingPage />
        </div>
      ) : (
        <>
          <LoadingPageComponent loading={isLoading} />
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <h1 className="font-bold text-lg text-center mb-4">
              {!isEdit ? "Feedback" : "Edit Feedback"}
            </h1>
            <div className="flex flex-col mb-4">
              <div className="flex items-center gap-5">
                <label htmlFor="rating" className="text-gray-600">
                  Rating:
                </label>
                <Stars
                  stars={rateInfo ? rateInfo.rating : isStar}
                  onRating={(star) => handleChangeStar(star)}
                  className="w-7 h-7 md:h-10 md:w-10 hover:cursor-pointer"
                />
              </div>
              {errors.isStar && (
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
                      {...register("comment", { required: true })}
                      id="comment"
                      className={`block border border-gray-400 outline-none rounded-md px-3 py-2 w-full`}
                      rows="4"
                      value={rateInfo?.comment}
                      maxLength="250"
                      onChange={handleCommentChange}
                    />
                  </>
                )}
              />

              {errors.comment && commentLength === 0 ? (
                <div className="flex justify-between">
                  <span className="text-red-500">This field is required</span>
                  <span className="text-gray-400 w-1/4 flex justify-end">
                    {commentLength}/250
                  </span>
                </div>
              ) : (
                <span className="text-gray-400 w-full flex justify-end">
                  {commentLength}/250
                </span>
              )}
            </div>
            <div className="w-full min-h-[1px] bg-black mb-3 "></div>
            <div className="flex justify-end px-4  gap-6">
              <button
                className="bg-white font-bold w-32 py-[5px] px-4 shadow-icon-product rounded-lg hover:bg-slate-200 duration-200 hover:cursor-pointer"
                onClick={() => onClose()}
              >
                Cancel
              </button>
              <button
                className="bg-cyan-600 text-white font-bold w-32 py-[5px] px-4 shadow-icon-product rounded-lg hover:bg-cyan-800 duration-200 hover:cursor-pointer"
                onClick={handleErrorStar}
              >
                {!isEdit ? "Add" : "Save"}
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default FormRatingAndComment;

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Stars = ({ stars, reviews, onRating, className, disabled }) => {
  const [ratingStar, setRatingStar] = useState();
  useEffect(() => {
    setRatingStar(
      Array.from({ length: 5 }, (element, index) => {
        const number = index + 0.5;
        return (
          <div
            key={index}
            onClick={() => (onRating ? onRating(index + 1) : null)}
            disabled={disabled}
          >
            {stars >= index + 1 ? (
              <FaStar
                className={` text-yellow-300 duration-200 ${className}`}
              />
            ) : stars >= number ? (
              <FaStarHalfAlt
                className={` text-yellow-300 duration-200 ${className}`}
              />
            ) : (
              <AiOutlineStar
                className={` text-yellow-300 duration-200 ${className}`}
              />
            )}
          </div>
        );
      })
    );
  }, [stars]);
  return (
    <div className="flex-center justify-start gap-2">
      {ratingStar}
      <p className="text-base">
        {reviews > 0 && `(${reviews} customer reviews)`}
      </p>
    </div>
  );
};

export default Stars;

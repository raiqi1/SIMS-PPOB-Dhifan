import { useState } from "react";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import Skeleton from "react-loading-skeleton";

interface Banner {
  bannerImg: { banner_image: string }[];
  loader: boolean;
}

export default function ImageSlider({ bannerImg, loader }: Banner) {
  const [showIcon, setShowIcon] = useState(false);

  return (
    <>
      <div className="mt-8 font-semibold">Temukan promo menarik</div>
      <div
        className="relative w-full mt-4 "
        onMouseEnter={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
      >
        {showIcon && (
          <button
            onClick={() =>
              document
                .querySelector(".scroll-content")
                ?.scrollBy({ left: -300, behavior: "smooth" })
            }
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
          >
            <CiCircleChevLeft size={40} color="white" />
          </button>
        )}

        <div className="scroll-content flex overflow-x-auto scrollbar-hide space-x-4 ">
          {loader ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-1/3 md:w-1/2 lg:w-[21%] h-[140px] relative"
              >
                <Skeleton width={400} height="100%" borderRadius={8} />
              </div>
            ))
          ) : (
            <>
              {bannerImg.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-1/3 md:w-1/2 lg:w-[21%] h-[140px] relative"
                >
                  <img
                    src={image.banner_image}
                    alt={`Banner ${index + 1}`}
                    className="w-[400px] h-full rounded-lg shadow-md"
                  />
                </div>
              ))}
            </>
          )}
        </div>
        {showIcon && (
          <button
            onClick={() =>
              document
                .querySelector(".scroll-content")
                ?.scrollBy({ left: 300, behavior: "smooth" })
            }
            className="absolute right-[10px] top-1/2 transform -translate-y-1/2 z-10"
          >
            <CiCircleChevRight size={40} color="white" />
          </button>
        )}
      </div>
    </>
  );
}

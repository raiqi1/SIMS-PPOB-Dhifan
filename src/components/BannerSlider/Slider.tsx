import { useState } from "react";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

const bannerImages = [
  "/assets/Banner1.png",
  "/assets/Banner2.png",
  "/assets/Banner3.png",
  "/assets/Banner4.png",
  "/assets/Banner5.png",
];

export default function ImageSlider() {
  const [showIcon, setShowIcon] = useState(false);
  return (
    <div
      className="relative w-full mt-8"
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
    >
      {/* Tombol Navigasi Kiri */}
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
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-1/3 md:w-1/2 lg:w-[21%] h-[140px] relative"
          >
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-[400px] h-full rounded-lg shadow-md"
            />
          </div>
        ))}
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
  );
}

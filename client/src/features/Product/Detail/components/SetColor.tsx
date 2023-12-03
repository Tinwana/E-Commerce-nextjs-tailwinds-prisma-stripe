"use client";

import { memo } from "react";

interface SetColorProps {
  images: selectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: selectedImgType) => void;
}

const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div className="">
      <div className="flex gap-4 items-center">
        <span className="uppercase font-semibold">color: </span>
        <div className="flex gap-2">
          {images.map((item) => {
            return (
              <div
                key={item.colorCode}
                onClick={() => handleColorSelect(item)}
                className={`h-7 w-7 rounded-full border-teal-300 flex items-center justify-center ${
                  cartProduct.selectedImg.color === item.color
                    ? "border-[1.5px]"
                    : "border-none"
                }`}
              >
                <div
                  style={{ backgroundColor: item.colorCode }}
                  className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(SetColor);

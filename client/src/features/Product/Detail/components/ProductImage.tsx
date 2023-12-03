"use client";
import { Image } from "@/components/ui";
import React, { memo } from "react";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: selectedImgType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  handleColorSelect,
  product,
}) => {
  return (
    <section className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px] ">
      <div className="flex flex-col col-span-1 items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        {product.images.map((img: selectedImgType) => {
          return (
            <div
              className={`relative w-[80%] aspect-square rounded border-teal-300 ${
                cartProduct.selectedImg.color === img.color
                  ? "border-[1.5px]"
                  : "border-none"
              }`}
              key={img.colorCode}
              onClick={() => handleColorSelect(img)}
            >
              <Image
                src={img.image}
                alt={img.color}
                className="object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          );
        })}
      </div>
      <div className="col-span-5 relative aspect-square">
        <Image
          className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
          src={cartProduct.selectedImg.image}
          alt={cartProduct.name}
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
};

export default memo(ProductImage);

"use client";
import { Image } from "@/components/ui";
import { SetQuantity } from "@/features/components";
import { useCart } from "@/hooks";
import { formatPrice, truncateText } from "@/utils";
import Link from "next/link";
import React, { memo } from "react";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  } = useCart();
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200py-4 items-center py-3">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/detail/${item.id}`}>
          <div className="relative w-[70px] aspect-square ">
            <Image
              src={item.selectedImg.image}
              alt={truncateText(item.name)}
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between items-start ">
          <Link href={`/product/detail/${item.id}`}>
            {truncateText(item.name)}
          </Link>
          <div className="">{item.selectedImg.color}</div>
          <div className="w-[70px]"></div>
          <button
            className="text-slate-500 underline"
            onClick={() => handleRemoveProductFromCart(item)}
          >
            Remove
          </button>
        </div>
      </div>

      <div className="justify-self-center">{formatPrice(item.price)}</div>

      <div className="justify-self-center">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyDecrease={() => handleCartQtyDecrease(item)}
          handleQtyIncrease={() => handleCartQtyIncrease(item)}
        />
      </div>

      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default memo(ItemContent);

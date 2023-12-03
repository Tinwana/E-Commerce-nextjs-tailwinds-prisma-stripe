"use client";
import React, { memo } from "react";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const SetQuantity: React.FC<SetQuantityProps> = ({
  cartProduct,
  cartCounter,
  handleQtyDecrease,
  handleQtyIncrease,
}) => {
  const btnStyle = "border-[1.2px] border-slate-300 px-2 rounded";

  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <p className="font-semibold">QUANTITY:</p>}
      <div className="flex gap-4 items-center text-base">
        <button onClick={handleQtyDecrease} className={btnStyle}>
          -
        </button>
        <div className="">{cartProduct.quantity}</div>
        <button onClick={handleQtyIncrease} className={btnStyle}>
          +
        </button>
      </div>
    </div>
  );
};

export default memo(SetQuantity);

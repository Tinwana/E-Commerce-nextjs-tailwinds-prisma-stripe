"use client";
import { useCart } from "@/hooks";
import { CiShoppingCart } from "react-icons/ci";
import React from "react";
import Link from "next/link";

const CartCounter = () => {
  const { cartTotalQty } = useCart();
  return (
    <Link href="/cart" className="relative cursor-pointer ">
      <div className="text-3xl">
        <CiShoppingCart />
      </div>
      <span className="absolute top-[-10px] right-[-10px] h-6 w-6 text-white bg-teal-600 rounded-full flex items-center justify-center text-sm">
        {cartTotalQty}
      </span>
    </Link>
  );
};

export default CartCounter;

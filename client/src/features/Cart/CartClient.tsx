"use client";
import Link from "next/link";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import ItemContent from "./components/ItemContent";
import { useCart } from "@/hooks";
import { Button } from "@/components/ui";

const CartClient: React.FC = () => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center ">
        <div className="text-2xl">Your Cart is empty</div>
        <Link href="/" className="flex items-center text-slate-500 gap-1 mt-2">
          <MdArrowBack size={24} />
          <span className="">Start shopping</span>
        </Link>
      </div>
    );
  }
  return (
    <section className="">
      <header className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <h5 className="col-span-2 justify-self-start">PRODUCT</h5>
        <h5 className="justify-self-center">PRICE</h5>
        <h5 className="justify-self-center">QUANTITY</h5>
        <h5 className="justify-self-end">TOTAL</h5>
      </header>

      <section className="">
        {cartProducts.map((item) => {
          return <ItemContent item={item} key={item.id} />;
        })}
      </section>
      <section className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4 ">
        <div className="w-[100px]">
          <Button
            label="Clear Cart"
            onClick={() => handleClearCart()}
            small
            outline
          />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span className="">Subtotal</span>
            <span className=""> {cartTotalAmount.toFixed(2)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and shipping calculate at checkout
          </p>
          <Button label="Check Out" onClick={() => {}} />
          <Link
            href="/"
            className="flex items-center text-slate-500 gap-1 mt-2"
          >
            <MdArrowBack size={24} />
            <span className="">Continue shopping</span>
          </Link>
        </div>
      </section>
    </section>
  );
};

export default CartClient;

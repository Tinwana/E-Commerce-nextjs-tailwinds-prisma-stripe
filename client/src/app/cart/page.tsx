import { CartClient } from "@/features/Cart";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "My Cart",
    description: "Welcome to my shop",
  };
}

const CartPage: React.FC = () => {
  return <CartClient />;
};

export default CartPage;

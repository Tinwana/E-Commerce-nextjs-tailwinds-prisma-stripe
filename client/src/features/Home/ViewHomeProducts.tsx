import React, { Suspense } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/features/Home";
import { Skeleton } from "@mui/material";
import Link from "next/link";
const ViewHomeProducts: React.FC = () => {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {products.map((product: any) => {
        return (
          <Link
            href={`/product/detail/${product.id}`}
            className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm"
            key={product.id}
          >
            <ProductCard data={product} />;
          </Link>
        );
      })}
    </section>
  );
};

export default ViewHomeProducts;

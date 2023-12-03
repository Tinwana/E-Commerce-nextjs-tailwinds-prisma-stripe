// "use client";
import React, { Suspense, memo } from "react";
import { formatPrice, truncateText } from "@/utils";
import { Rating, Skeleton } from "@mui/material";
import { Image } from "@/components/ui";

interface ProductCardProps {
  data: any;
}
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const productRatting: number =
    data.reviews?.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length;
  return (
    <article className="flex flex-col items-center w-full gap-1">
      <div className="aspect-square overflow-hidden relative w-full">
        <Suspense
          fallback={<Skeleton variant="rounded" width="100%" height="100%" />}
        >
          <Image
            key={data.name}
            className="w-full h-full object-contain "
            src={data.images[0].image}
            alt={truncateText(data.name)}
            loading="lazy"
            decoding="async"
          />
        </Suspense>
      </div>
      <Suspense
        fallback={
          <Skeleton variant="text" width="fit-content" height="fit-content" />
        }
      >
        <h4 className="mt-4">{truncateText(data.name)}</h4>
      </Suspense>
      <div className="">
        <Rating value={productRatting} readOnly />
      </div>
      <Suspense
        fallback={
          <Skeleton variant="text" width="fit-content" height="fit-content" />
        }
      >
        <span className="">{data?.reviews?.length} reviews</span>
      </Suspense>
      <Suspense
        fallback={
          <Skeleton variant="text" width="fit-content" height="fit-content" />
        }
      >
        <span className="font-semibold">{formatPrice(data.price)}</span>
      </Suspense>
    </article>
  );
};

export default memo(ProductCard);

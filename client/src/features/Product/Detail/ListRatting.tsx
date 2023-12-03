"use client";
import { products } from "@/data/products";
import React from "react";
import moment from "moment";
import { Rating } from "@mui/material";
import { Heading } from "@/components/layout";
import { Avatar } from "@/components/ui";
interface ListingRattingProps {
  productId: string;
}

/* ==========================main================================================================== */

const ListRatting: React.FC<ListingRattingProps> = ({ productId }) => {
  const product = products.filter((item) => item.id === productId)[0];
  return (
    <div className="">
      <Heading title="Product Review" />
      <div className="text-sm mt-2">
        {product.reviews &&
          product.reviews.map((review) => {
            return (
              <div className="max-w-[300px]" key={review.id}>
                <div className="flex gap-2 items-center">
                  <Avatar src={review.user.image} />
                  <p className="font-semibold">{review.user.name}</p>
                  <p className="font-light">
                    {moment(review.createdDate).fromNow()}
                  </p>
                </div>
                <div className="mt-2">
                  <Rating value={review.rating} readOnly />
                  <p className="ml-2">{review.comment}</p>
                  <hr className="my-4" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRatting;

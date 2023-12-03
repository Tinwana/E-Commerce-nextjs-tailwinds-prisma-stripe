"use client";
import { Rating } from "@mui/material";
import React, { memo, useCallback, useEffect, useState } from "react";
import SetColor from "./components/SetColor";
import { products } from "@/data/products";
import { formatPrice } from "@/utils";
import ProductImage from "./components/ProductImage";
import { useCart } from "@/hooks";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import { SetQuantity } from "@/features/components";
import { Button } from "@/components/ui";

interface ProductDetailProps {
  productId: string;
}
/* line component */
const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

/* --------------------------------------------------main component------------------------------------------- */
const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const product = products.filter((item) => item.id === productId)[0];
  const router = useRouter();
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false);
  const [cartProduct, serCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product?.images[0] },
    quantity: 1,
    price: product.price,
  });

  const handleColorSelect = useCallback(
    (value: selectedImgType) => {
      serCartProduct((pre) => {
        return { ...pre, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );
  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity <= 1)
      return serCartProduct((pre) => {
        return { ...pre, quantity: 1 };
      });

    serCartProduct((pre) => {
      return { ...pre, quantity: --pre.quantity };
    });
  }, [cartProduct]);
  const handleQtyIncrease = useCallback(() => {
    serCartProduct((pre) => {
      return { ...pre, quantity: ++pre.quantity };
    });
  }, [cartProduct]);

  const productRatting: number =
    product.reviews?.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  /* -------------------------------------------------------------------------------- */

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* image section */}
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      {/* content section */}
      <section className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700 truncate">
          {product.name}
        </h2>
        <span className="font-bold text-2xl text-black">
          {formatPrice(product.price)}
        </span>
        <div className="flex items-center gap-2">
          <Rating value={productRatting} readOnly />
          <div className="">{product.reviews.length} reviews</div>
        </div>
        <Horizontal />

        <div className="text-justify ">{product.description}</div>
        <Horizontal />

        <div>
          <p className="">
            <span className="font-semibold">CATEGORY:</span>
            {product.category}
          </p>
          <p className="">
            <span className="font-semibold">BRAND:</span>
            {product.brand}
          </p>
          <span className={product.inStock ? "text-teal-400" : "text-rose-400"}>
            {product.inStock ? "In Stock" : "Out Stock"}
          </span>
        </div>
        <Horizontal />

        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-teal-400" size={20} />
              <span className="">Product added to cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="View Cart"
                outline
                onClick={() => {
                  router.push("/cart");
                }}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />
            <Horizontal />

            <SetQuantity
              cartProduct={cartProduct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrease={handleQtyDecrease}
            />
            <Horizontal />

            <div className="max-w-[300px]">
              <Button
                label="Add To Cart"
                onClick={() => handleAddProductToCart(cartProduct)}
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default memo(ProductDetail);

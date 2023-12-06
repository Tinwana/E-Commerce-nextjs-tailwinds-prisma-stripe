"use client";
import fetchData from "@/helpers/fetchData";
import { useCart } from "@/hooks";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckoutClient: FC = () => {
  const router = useRouter();
  const { paymentIntent, handleSetPayMentIntent, cartProducts } = useCart();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    if (cartProducts) {
      setError(false);
      setLoading(true);

      fetchData
        .mutationData({
          url: "/api/create-payment-intent",
          method: "POST",
          body: {
            items: cartProducts,
            payment_intent_id: paymentIntent,
          },
        })
        .then((res) => {
          setLoading(false);
          if (res.status === "error") {
            return router.push("/login");
          }
          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPayMentIntent(data.paymentIntent.id);
        })
        .catch((error: any) => {
          setError(true);
          toast.error("something went wrong", error);
        });
    }
  }, [cartProducts, paymentIntent]);

  return <div className="">CheckoutClient</div>;
};

export default CheckoutClient;

"use client";
import fetchData from "@/helpers/fetchData";
import { useCart } from "@/hooks";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import {
  Appearance,
  StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import { CircularProgress } from "@mui/material";
import { Button } from "@/components/ui";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutClient: FC = () => {
  const router = useRouter();
  const { paymentIntent, handleSetPayMentIntent, cartProducts } = useCart();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string | undefined>("");
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (paymentSuccess) {
      setClientSecret(undefined);
    }
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
          setClientSecret(res.paymentIntent.client_secret);
          handleSetPayMentIntent(res.paymentIntent.id);
        })
        .catch((error: any) => {
          console.log(error);

          setError(true);
          toast.error("something went wrong", error);
        });
    }
  }, [cartProducts, paymentIntent]);
  const appearance: Appearance = {
    theme: "stripe",
    labels: "floating",
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: appearance,
  };

  const handlePaymentSuccess = useCallback((val: boolean) => {
    setPaymentSuccess(val);
  }, []);
  return (
    <section className="w-full flex flex-col items-center justify-center">
      {loading && !clientSecret ? (
        <CircularProgress className="text-center" />
      ) : (
        <>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm
                clientSecret={clientSecret}
                handleSetPaymentSuccess={handlePaymentSuccess}
              />
            </Elements>
          )}
          {error && (
            <div className="text-center text-rose-500">
              Something went wrong!
            </div>
          )}
          {paymentSuccess && (
            <div className="flex items-center flex-col gap-4">
              <div className="text-teal-500 text-center ">Payment Success</div>
              <div className="max-w-[220px] w-full">
                <Button
                  label="View your orders"
                  onClick={() => {
                    router.push("/order");
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default CheckoutClient;

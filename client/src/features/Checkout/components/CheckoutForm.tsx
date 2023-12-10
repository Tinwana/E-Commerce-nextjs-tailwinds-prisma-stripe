"use client";
import { Heading } from "@/components/layout";
import { Button } from "@/components/ui";
import { useCart } from "@/hooks";
import { formatPrice } from "@/utils";
import { CircularProgress } from "@mui/material";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FC, useEffect, useState, FormEvent } from "react";
import toast from "react-hot-toast";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (val: boolean) => void;
}

const CheckoutForm: FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPayMentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) return;
    if (!clientSecret) return;
    handleSetPaymentSuccess(false);
  }, [stripe]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    // const { error } = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: {
    //     return_url: "http://localhost:3000/cart",
    //   },
    // });
    // if (error.type === "card_error" || error.type === "validation_error") {
    //   setMessage(error.message);
    // } else {
    //   setMessage("An unexpected error occurred.");
    // }
    // setIsLoading(false);
    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          setIsLoading(false);
          toast.success("Checkout completed successfully");
          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPayMentIntent(null);
        } else {
          toast.error("An unexpected error occurred.");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form className="" onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading title="Enter your details to complete checkout!" />
      </div>
      <h2 className="font-semibold mt-4 mb-2">Address Information</h2>
      <AddressElement options={{ mode: "shipping" }} />
      <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
      <PaymentElement id="payment-element" options={{ layout: "accordion" }} />
      <div className="py-4 text-center text-slate-700  text-xl font-bold">
        Total: {formattedPrice}
      </div>
      <Button
        label={
          isLoading ? <CircularProgress className="text-center" /> : "Pay Now"
        }
        disable={isLoading || !stripe || !elements}
        type="submit"
        id="submit"
      />
    </form>
  );
};

export default CheckoutForm;

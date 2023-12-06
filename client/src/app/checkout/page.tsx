import { Container, FormWrap } from "@/components/layout";
import { CheckoutClient } from "@/features/Checkout";
import { FC } from "react";

const CheckoutPage: FC = () => {
  return (
    <>
      <div className="p-8">
        <Container>
          <FormWrap>
            <CheckoutClient />
          </FormWrap>
        </Container>
      </div>
    </>
  );
};

export default CheckoutPage;

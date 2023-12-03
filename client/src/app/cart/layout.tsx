import { Container, Heading } from "@/components/layout";
import React from "react";

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="pt-8">
        <Container>
          <Heading title="Shopping Cart" center />
          {children}
        </Container>
      </div>
    </>
  );
};

export default CartLayout;

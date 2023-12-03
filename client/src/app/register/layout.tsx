import { Container, FormWrap, Heading } from "@/components/layout";
import Link from "next/link";
import React from "react";

interface RegisterLayoutProps {
  children: React.ReactNode;
}

const RegisterLayout: React.FC<RegisterLayoutProps> = ({ children }) => {
  return (
    <Container>
      <FormWrap>
        <Heading title="Sign up for E-Shop" center />
        {children}
        <p className="text-sm">
          Already have an account?{" "}
          <Link className="underline text-blue-500" href="/login">
            Log In
          </Link>
        </p>
      </FormWrap>
    </Container>
  );
};

export default RegisterLayout;

import { Container, FormWrap, Heading } from "@/components/layout";
import Link from "next/link";
import React from "react";

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <Container>
      <FormWrap>
        <Heading title="Sign in for E-Shop" center />
        {children}
        <p className="text-sm">
          You don&apos;t have an account?{" "}
          <Link className="underline text-blue-500" href="/register">
            Sign up
          </Link>
        </p>
      </FormWrap>
    </Container>
  );
};

export default LoginLayout;

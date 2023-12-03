import getCurrentUser from "@/actions/getCurrentUser";
import { Container, FormWrap } from "@/components/layout";
import { RegisterForm } from "@/features/Auth/Register";
import React from "react";

export async function generateMetadata() {
  return {
    title: "Create your choose",
    description: "Register page",
  };
}

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = async ({}) => {
  const user = await getCurrentUser.getCurrentUser();
  return <RegisterForm currentUser={user} />;
};

export default RegisterPage;

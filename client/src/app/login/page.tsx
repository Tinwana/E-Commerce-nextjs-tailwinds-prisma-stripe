import getCurrentUser from "@/actions/getCurrentUser";
import { LoginForm } from "@/features/Auth/Login";
import React from "react";

export async function generateMetadata() {
  return {
    title: "Let's go",
    description: "Login page",
  };
}

const LoginPage: React.FC = async () => {
  const user = await getCurrentUser.getCurrentUser();
  return <LoginForm currentUser={user} />;
};

export default LoginPage;

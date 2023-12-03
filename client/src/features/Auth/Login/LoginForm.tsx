"use client";
import { Button, Input } from "@/components/ui";
import { LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/components/layout/Header/type";

interface LoginProps {
  currentUser: SafeUser;
}

const LoginForm: React.FC<LoginProps> = ({ currentUser }) => {
  /* variables */
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /* handlers */
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const signInRes = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (signInRes?.ok) {
        router.push("/");
        router.refresh();
        toast.success("Logged in!");
        setIsLoading(false);
      }
      if (signInRes?.error) {
        toast.error("Can't log in! Something went wrong " + signInRes.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("catch", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, []);

  return (
    <>
      <Button
        outline
        label="Continue with Google"
        icon={AiOutlineGoogle}
        onClick={async () => {
          signIn("google");
        }}
      />
      <div className="w-full">
        {isLoading && <LinearProgress color="inherit" className="w-full" />}
        <hr className="bg-slate-300 w-full h-px" />
      </div>

      <Input
        id="email"
        label="Email"
        disable={isLoading}
        register={register}
        errors={errors}
        required={true}
        type="email"
        name="email"
        isEmail
        placeholder="email"
      />

      <Input
        id="password"
        label="Password"
        disable={isLoading}
        register={register}
        errors={errors}
        required={true}
        type="password"
        name="password"
        placeholder="password"
        minLength={6}
      />

      <Button label="Sign In" type="submit" onClick={handleSubmit(onSubmit)} />
      <p className="text-rose-500 text-sm">
        {errors.email && <span>Invalid Email</span>}{" "}
        {errors.password && (
          <span>{errors.email && "-"} Invalid password!</span>
        )}
      </p>
    </>
  );
};

export default LoginForm;

"use client";
import { Button, Input } from "@/components/ui";
import { registerService } from "@/services/auth";
import { LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/components/layout/Header/type";

interface RegisterProps {
  currentUser: SafeUser;
}

const RegisterForm: React.FC<RegisterProps> = ({ currentUser }) => {
  /* variables */
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  /* handlers */
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const res = await registerService(data);
      if (res.status === "OK") {
        // const registerData = res.data;
        toast.success("Register successfully!");
        const signInRes = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        if (signInRes?.ok) {
          router.push("/");
          router.refresh();
          toast.success("Logged in!");
          setIsLoading(false);
        }
        if (signInRes?.error) {
          toast.error(signInRes.error);
          setIsLoading(false);
        }
      } else {
        toast.error("Can't register! Something went wrong");
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
        label="Sign in with Google"
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
        id="name"
        label="Name"
        disable={isLoading}
        register={register}
        errors={errors}
        required={true}
        name="name"
        placeholder="Bill Gate"
      />

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
        minLength={6}
        placeholder="password"
      />

      <Button label="Sign Up" type="submit" onClick={handleSubmit(onSubmit)} />
      <p className="text-rose-500 text-sm">
        {errors.email && <span>Invalid Email</span>}{" "}
        {errors.password && (
          <span>{errors.email && "-"} Invalid password!</span>
        )}
      </p>
    </>
  );
};

export default RegisterForm;

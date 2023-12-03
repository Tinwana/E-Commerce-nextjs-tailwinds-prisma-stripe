"use client";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  name?: string;
  disable?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  isEmail?: boolean;
}

const Input: React.FC<InputProps> = ({
  errors,
  id,
  label,
  register,
  disable,
  required,
  type,
  className = "",
  placeholder,
  name,
  maxLength,
  minLength,
  isEmail,
}) => {
  if (placeholder === "email") placeholder = "tinwana@gmail.com";
  else if (placeholder === "password") placeholder = "*********";
  else placeholder = placeholder;
  return (
    <div className="w-full relative">
      <input
        autoComplete="on"
        autoSave="on"
        className={` peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed  ${
          errors[id]
            ? "border-rose-400 focus:border-rose-400"
            : "border-slate-300 focus:border-slate-300"
        } ${className}`}
        type={type}
        disabled={disable}
        id={id}
        {...register(id, {
          required: required,
          maxLength: maxLength,
          minLength: minLength,
          pattern: isEmail ? /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ : undefined,
        })}
        placeholder={placeholder}
        name={name}
      />
      <label
        htmlFor={id}
        className={`absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-4 peer-focus:scale-75 peer-focus:-translate-y-4  ${
          errors[id]
            ? "text-rose-500 focus:text-rose-500"
            : "text-slate-400 focus:text-slate-400"
        } `}
      >
        {label}{" "}
      </label>
    </div>
  );
};

export default Input;

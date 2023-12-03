"use client";
import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label?: string | React.ReactElement;
  disable?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  type?: "button" | "submit" | "reset" | undefined;
  icon?: IconType;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  custom,
  disable = false,
  icon: Icon,
  label,
  onClick,
  outline,
  type = "button",
  small,
}) => {
  return (
    <button
      className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-75 transition w-full border-slate-700 flex items-center justify-center gap-2 ${
        outline ? "bg-white text-slate-700" : "bg-slate-700 text-white"
      } ${
        small
          ? "text-sm py-1 px-2 font-light border-[1px]"
          : "text-md px-3 py-4 font-semibold border-2"
      } ${custom ? custom : ""}`}
      disabled={disable}
      onClick={onClick}
      type={type}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;

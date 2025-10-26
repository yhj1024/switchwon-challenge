import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "lg";
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const sizeClasses = {
  sm: "px-3 py-2",
  lg: "px-[0.625rem] py-6 text-[1.25rem]",
};

const variantClasses = {
  primary: "bg-[#1B2334]",
  secondary: "bg-[#3479EB]",
};

export function Button({
  children,
  onClick,
  type = "button",
  size = "lg",
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-[0.75rem] font-semibold leading-[133%] text-white ${sizeClasses[size]} ${variantClasses[variant]} disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {children}
    </button>
  );
}

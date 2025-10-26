import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "lg";
}

const sizeClasses = {
  sm: "h-[2.6875rem] w-[5.875rem] px-3 py-2",
  lg: "h-[4.8125rem] w-[31rem] px-[0.625rem] py-6 text-[1.25rem]",
};

export function Button({
  children,
  onClick,
  type = "button",
  size = "lg",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-[0.75rem] bg-[#1B2334] font-semibold leading-[133%] text-white ${sizeClasses[size]}`}
    >
      {children}
    </button>
  );
}

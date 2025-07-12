import type { FormEvent, ReactElement } from "react";

type Variants = "primary" | "secondary";
type Sizes = "sm" | "md" | "lg"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variants;                         // default = "primary"
  size: Sizes;                              // default = "md"
  text: string;                             // optional if you pass children
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: (
    e?: FormEvent<Element>  // event optional → can omit param
  ) => void | Promise<void>;
}

const variantStyles = new Map<Variants, string>([
  ["primary", "bg-blue-600 text-white hover:bg-blue-800"],
  ["secondary", "bg-blue-500 text-white hover:bg-blue-600"],
]);

const sizeStyles = new Map<Sizes, string>([
  ["sm", "px-3 py-1 text-sm"],
  ["md", "px-4.5 py-1.5 text-base"],
  ["lg", "px-4 py-2 text-lg"]
]);

const defaultStyles = "rounded-md font-light flex items-center gap-2"

export const Button = (props: ButtonProps) => {
  const { variant, size, text, startIcon, endIcon, onClick } = props;

  const variantClass = variantStyles.get(variant) || "";
  const sizeClass = sizeStyles.get(size) || "";

  return (
    <button
      className={`${defaultStyles} ${variantClass} ${sizeClass} `}
      onClick={onClick}
    >
      {startIcon}
      {text}
      {endIcon}
    </button>
  );
};

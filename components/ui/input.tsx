import * as React from "react";

import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          "flex h-10 w-full ring-0 outline-none text-black rounded-[25px] bg-[#fafafa] px-3 py-2 text-sm file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-slate-400",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

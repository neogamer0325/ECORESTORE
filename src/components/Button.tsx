import * as React from "react";
import { cn } from "../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "earth" | "leaf";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-eco-green text-white hover:bg-eco-dark shadow-md hover:shadow-lg active:shadow-sm",
      secondary: "bg-eco-leaf text-eco-dark hover:bg-eco-green hover:text-white shadow-sm hover:shadow-md",
      outline: "border-2 border-eco-green text-eco-green hover:bg-eco-green hover:text-white",
      ghost: "text-eco-green hover:bg-eco-leaf/20",
      earth: "bg-eco-earth text-white hover:bg-eco-dark shadow-md hover:shadow-lg",
      leaf: "bg-eco-leaf/10 text-eco-green hover:bg-eco-leaf/20 border border-eco-leaf/20",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-2.5 text-sm",
      lg: "px-8 py-4 text-base",
      icon: "p-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

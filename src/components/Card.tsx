import * as React from "react";
import { cn } from "../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "flat" | "outline" | "glass" | "brutal";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "elevated", ...props }, ref) => {
    const variants = {
      elevated: "bg-white shadow-md hover:shadow-xl border border-eco-leaf/5",
      flat: "bg-eco-leaf/10 border border-eco-leaf/20",
      outline: "border-2 border-eco-leaf/20 hover:border-eco-green/30",
      glass: "bg-white/70 backdrop-blur-md border border-white/20 shadow-xl",
      brutal: "bg-white border-2 border-eco-dark shadow-[4px_4px_0px_0px_rgba(26,47,22,1)]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl p-6 transition-all duration-300",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TryvoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "dark" | "light" | "orange-accent";
}

const TryvoCard = React.forwardRef<HTMLDivElement, TryvoCardProps>(
  ({ className, variant = "dark", ...props }, ref) => {
    const variants: Record<string, string> = {
      dark: "bg-dark-raised border border-dark-border rounded-[20px] shadow-lg hover:-translate-y-1 hover:border-dark-border-strong transition-all duration-200",
      light: "bg-light-raised border border-light-border rounded-[20px] shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200",
      "orange-accent": "bg-dark-raised border border-dark-border border-t-2 border-t-orange rounded-[20px] shadow-lg transition-all duration-200",
    };

    return <div ref={ref} className={cn(variants[variant], className)} {...props} />;
  }
);
TryvoCard.displayName = "TryvoCard";

export { TryvoCard };

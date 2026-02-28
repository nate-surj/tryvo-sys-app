import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface TryvoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost-dark" | "ghost-light" | "ghost-orange" | "destructive";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  asChild?: boolean;
}

const TryvoButton = React.forwardRef<HTMLButtonElement, TryvoButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-sans font-semibold text-sm rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-dark-base disabled:opacity-50 disabled:pointer-events-none select-none";

    const variants: Record<string, string> = {
      primary: "bg-orange text-white hover:bg-orange-hover hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(232,80,10,0.35)] active:scale-[0.98]",
      "ghost-dark": "bg-transparent border border-white/20 text-white hover:bg-white/5",
      "ghost-light": "bg-transparent border border-dark-border text-dark-base hover:bg-dark-base/5",
      "ghost-orange": "bg-transparent border border-orange text-orange hover:bg-orange-subtle",
      destructive: "bg-error text-white hover:bg-red-600",
    };

    const sizes: Record<string, string> = {
      sm: "h-9 px-5 text-xs",
      md: "h-11 px-7 text-sm",
      lg: "h-14 px-9 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
TryvoButton.displayName = "TryvoButton";

export { TryvoButton };

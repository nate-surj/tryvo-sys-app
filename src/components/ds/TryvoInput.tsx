import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface TryvoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "dark" | "light";
  error?: string;
  success?: boolean;
  label?: string;
  helper?: string;
}

const TryvoInput = React.forwardRef<HTMLInputElement, TryvoInputProps>(
  ({ className, variant = "dark", error, success, label, helper, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    const variants: Record<string, string> = {
      dark: "bg-dark-card border-dark-border-strong text-white placeholder:text-white/30 focus:border-orange focus:shadow-[0_0_0_3px_rgba(232,80,10,0.15)]",
      light: "bg-light-raised border-light-border text-dark-base placeholder:text-dark-base/40 focus:border-orange focus:shadow-[0_0_0_3px_rgba(232,80,10,0.15)]",
    };

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="text-caption font-medium block">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "flex h-14 w-full rounded-xl border px-4 font-sans text-base outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
              variants[variant],
              error && "border-error focus:border-error focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]",
              success && "border-success",
              className
            )}
            {...props}
          />
          {success && !error && (
            <Check className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-success" />
          )}
        </div>
        {error && <p className="text-xs text-error font-sans">{error}</p>}
        {helper && !error && <p className="text-xs text-white/40 font-sans">{helper}</p>}
      </div>
    );
  }
);
TryvoInput.displayName = "TryvoInput";

export { TryvoInput };

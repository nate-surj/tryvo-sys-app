import { LucideIcon } from "lucide-react";
import { TryvoButton } from "./TryvoButton";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel?: string;
  onCta?: () => void;
  className?: string;
}

const EmptyState = ({ icon: Icon, title, description, ctaLabel, onCta, className }: EmptyStateProps) => (
  <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
      <Icon className="h-8 w-8 text-white/30" />
    </div>
    <h3 className="font-display text-lg font-bold text-white">{title}</h3>
    <p className="mt-1 max-w-sm text-sm text-white/50 font-sans">{description}</p>
    {ctaLabel && onCta && (
      <TryvoButton variant="ghost-orange" size="sm" onClick={onCta} className="mt-4">
        {ctaLabel}
      </TryvoButton>
    )}
  </div>
);

export { EmptyState };

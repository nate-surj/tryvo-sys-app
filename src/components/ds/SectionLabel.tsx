import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

const SectionLabel = ({ children, className }: SectionLabelProps) => (
  <div className={cn("flex items-center gap-3", className)}>
    <span className="h-px w-5 bg-orange" />
    <span className="text-label text-orange tracking-[3px]">{children}</span>
  </div>
);

export { SectionLabel };

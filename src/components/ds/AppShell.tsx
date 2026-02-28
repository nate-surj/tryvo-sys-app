import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  variant?: "dark" | "light" | "mixed";
  className?: string;
}

const AppShell = ({ children, variant = "dark", className }: AppShellProps) => {
  const variants: Record<string, string> = {
    dark: "bg-dark-base text-white min-h-screen",
    light: "bg-light-base text-dark-base min-h-screen",
    mixed: "min-h-screen",
  };

  return <div className={cn("font-sans", variants[variant], className)}>{children}</div>;
};

export { AppShell };

import { TryvoButton } from "./TryvoButton";
import { TryvoCard } from "./TryvoCard";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "primary" | "destructive";
  onConfirm: () => void;
  loading?: boolean;
}

const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "primary",
  onConfirm,
  loading,
}: ConfirmDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <TryvoCard variant="dark" className="relative z-10 w-full max-w-md p-8">
        <h3 className="font-display text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/60 font-sans">{description}</p>
        <div className="mt-6 flex gap-3 justify-end">
          <TryvoButton variant="ghost-dark" size="sm" onClick={() => onOpenChange(false)}>
            {cancelLabel}
          </TryvoButton>
          <TryvoButton variant={variant === "destructive" ? "destructive" : "primary"} size="sm" onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </TryvoButton>
        </div>
      </TryvoCard>
    </div>
  );
};

export { ConfirmDialog };

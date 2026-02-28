import { cn } from "@/lib/utils";

type ParcelStatus = "Booked" | "In Transit" | "Arrived" | "Out for Delivery" | "Delivered" | "Issue";

const statusConfig: Record<ParcelStatus, { bg: string; text: string; dot: string }> = {
  Booked: { bg: "bg-status-booked/10", text: "text-status-booked", dot: "bg-status-booked" },
  "In Transit": { bg: "bg-status-transit/10", text: "text-status-transit", dot: "bg-status-transit" },
  Arrived: { bg: "bg-status-arrived/10", text: "text-status-arrived", dot: "bg-status-arrived" },
  "Out for Delivery": { bg: "bg-status-outfordelivery/10", text: "text-status-outfordelivery", dot: "bg-status-outfordelivery" },
  Delivered: { bg: "bg-status-delivered/10", text: "text-status-delivered", dot: "bg-status-delivered" },
  Issue: { bg: "bg-status-issue/10", text: "text-status-issue", dot: "bg-status-issue" },
};

interface StatusChipProps {
  status: ParcelStatus;
  className?: string;
}

const StatusChip = ({ status, className }: StatusChipProps) => {
  const config = statusConfig[status] || statusConfig.Booked;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold font-sans",
        config.bg,
        config.text,
        className
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", config.dot)} />
      {status}
    </span>
  );
};

export { StatusChip };
export type { ParcelStatus };

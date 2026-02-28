import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PackagePlus, QrCode, ArrowRight } from "lucide-react";
import { useClerkStore } from "@/stores/clerkStore";

const statusColor: Record<string, string> = {
  Booked: "hsl(217 91% 60%)",
  "In Transit": "hsl(38 92% 50%)",
  Arrived: "hsl(270 70% 60%)",
  "Out for Delivery": "hsl(21 92% 47%)",
  Delivered: "hsl(142 71% 45%)",
  Issue: "hsl(0 84% 60%)",
};

const ClerkDashboard = () => {
  const store = useClerkStore();
  const stats = store.getStats();
  const events = store.getRecentEvents();

  const statCards = [
    { label: "Booked Today", value: stats.booked, color: "hsl(217 91% 60%)" },
    { label: "In Transit", value: stats.inTransit, color: "hsl(38 92% 50%)" },
    { label: "Arrived (Pending)", value: stats.arrived, color: "hsl(270 70% 60%)" },
    { label: "Delivered", value: stats.delivered, color: "hsl(142 71% 45%)" },
  ];

  const timeAgo = (d: Date) => {
    const mins = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ago`;
  };

  return (
    <div className="space-y-6 max-w-[1200px]">
      {/* Action cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/clerk/new-booking">
          <motion.div
            whileHover={{ y: -4 }}
            className="h-[180px] rounded-[20px] p-7 cursor-pointer relative overflow-hidden transition-colors"
            style={{ background: "hsl(21 92% 47%)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(21 92% 55%)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "hsl(21 92% 47%)")}
          >
            <PackagePlus size={40} className="text-white mb-3" />
            <h3 className="text-[22px] font-display font-extrabold text-white">New Booking</h3>
            <p className="text-sm text-white/70">Register a parcel for delivery</p>
            <ArrowRight size={20} className="absolute bottom-7 right-7 text-white" />
          </motion.div>
        </Link>

        <Link to="/clerk/scan">
          <motion.div
            whileHover={{ y: -4 }}
            className="h-[180px] rounded-[20px] p-7 cursor-pointer relative card-dark"
            style={{ border: "2px solid hsl(142 71% 45% / 0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "hsl(142 71% 45%)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "hsl(142 71% 45% / 0.4)")}
          >
            <QrCode size={40} style={{ color: "hsl(142 71% 45%)" }} className="mb-3" />
            <h3 className="text-[22px] font-display font-extrabold text-foreground">Scan Arrived Parcel</h3>
            <p className="text-sm text-muted-foreground">Vehicle arrived? Scan parcels here</p>
            <ArrowRight size={20} className="absolute bottom-7 right-7" style={{ color: "hsl(142 71% 45%)" }} />
          </motion.div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="card-dark rounded-[14px] p-5 relative overflow-hidden" style={{ borderLeft: `3px solid ${s.color}` }}>
            <p className="text-[28px] font-display font-extrabold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Recent Activity</h3>
        <div className="card-dark rounded-[14px] divide-y divide-border">
          {events.map((ev, i) => (
            <div key={i} className="flex items-center gap-3 h-12 px-4">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: statusColor[ev.status] || statusColor.Booked }} />
              <span className="text-sm text-foreground flex-1 truncate">{ev.description}</span>
              <Link to="/clerk/parcels" className="text-[13px] font-mono text-primary hover:underline flex-shrink-0">{ev.trackingId}</Link>
              <span className="text-xs text-muted-foreground flex-shrink-0 w-16 text-right">{timeAgo(ev.timestamp)}</span>
            </div>
          ))}
        </div>
        <Link to="/clerk/parcels" className="text-sm text-primary hover:underline mt-2 inline-block">View all →</Link>
      </div>
    </div>
  );
};

export default ClerkDashboard;

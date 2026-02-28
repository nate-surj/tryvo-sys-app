import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, MoreHorizontal, Phone, Printer, AlertTriangle, Package } from "lucide-react";
import { useClerkStore, type Parcel } from "@/stores/clerkStore";

const statusFilters = ["All", "Booked", "In Transit", "Arrived", "Out for Delivery", "Delivered", "Issue"] as const;

const statusColors: Record<string, string> = {
  Booked: "217 91% 60%", "In Transit": "38 92% 50%", Arrived: "270 70% 60%",
  "Out for Delivery": "21 92% 47%", Delivered: "142 71% 45%", Issue: "0 84% 60%",
};

const ClerkParcels = () => {
  const store = useClerkStore();
  const parcels = store.getParcels();
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const filtered = parcels.filter((p) => {
    if (filter !== "All" && p.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.trackingId.toLowerCase().includes(q) || p.recipientName.toLowerCase().includes(q);
    }
    return true;
  });

  const counts = statusFilters.reduce((acc, s) => {
    acc[s] = s === "All" ? parcels.length : parcels.filter((p) => p.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  const timeAgo = (d: Date) => {
    const mins = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
    if (mins < 1) return "Now";
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ago`;
  };

  return (
    <div className="space-y-4 max-w-[1200px]">
      <div>
        <h1 className="text-xl font-display font-bold text-foreground">Today's Parcels</h1>
        <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {statusFilters.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === s ? "bg-primary text-white" : "card-dark text-muted-foreground hover:text-foreground"
            }`}
          >
            {s} <span className="ml-1 opacity-70">{counts[s]}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by tracking ID or recipient name"
          className="w-full h-11 pl-10 pr-10 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
        {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X size={16} /></button>}
      </div>

      {/* Table/Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <Package size={40} className="mx-auto text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">No {filter !== "All" ? filter.toLowerCase() : ""} parcels found</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block card-dark rounded-[14px] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Tracking ID", "Recipient", "Route", "Size", "Status", "Updated", ""].map((h) => (
                    <th key={h} className="text-left text-xs text-muted-foreground font-medium px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/5 transition-colors h-[60px]">
                    <td className="px-4">
                      <button onClick={() => setSelectedParcel(p)} className="font-mono text-sm text-primary hover:underline">{p.trackingId}</button>
                    </td>
                    <td className="px-4">
                      <p className="text-sm text-foreground">{p.recipientName}</p>
                      <p className="text-xs text-muted-foreground">{p.destinationCity}</p>
                    </td>
                    <td className="px-4 text-sm text-foreground">{p.originCity.slice(0, 3).toUpperCase()} → {p.destinationCity.slice(0, 3).toUpperCase()}</td>
                    <td className="px-4"><span className="text-xs px-2 py-0.5 rounded-full card-dark">{p.size}</span></td>
                    <td className="px-4"><StatusChip status={p.status} /></td>
                    <td className="px-4 text-xs text-muted-foreground">{timeAgo(p.updatedAt)}</td>
                    <td className="px-4 relative">
                      <button onClick={() => setMenuOpen(menuOpen === p.id ? null : p.id)} className="p-1.5 rounded-lg hover:bg-muted/10">
                        <MoreHorizontal size={16} />
                      </button>
                      {menuOpen === p.id && (
                        <div className="absolute right-4 top-full z-10 card-dark rounded-lg shadow-xl py-1 w-40">
                          <button onClick={() => { setSelectedParcel(p); setMenuOpen(null); }} className="w-full text-left px-3 py-2 text-sm hover:bg-muted/10">View details</button>
                          <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted/10">Print label</button>
                          <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted/10 text-destructive">Report issue</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((p) => (
              <div key={p.id} className="card-dark rounded-xl p-4 space-y-2" onClick={() => setSelectedParcel(p)}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-primary">{p.trackingId}</span>
                  <StatusChip status={p.status} />
                </div>
                <p className="text-sm text-foreground">{p.recipientName} <span className="text-muted-foreground">→ {p.destinationCity}</span></p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full card-dark">{p.size}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{timeAgo(p.updatedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Detail slide-over */}
      <AnimatePresence>
        {selectedParcel && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40" style={{ background: "hsl(0 0% 0% / 0.5)" }} onClick={() => setSelectedParcel(null)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 border-l border-border overflow-y-auto p-6 space-y-6"
              style={{ background: "hsl(0 0% 5%)" }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-lg text-primary font-bold">{selectedParcel.trackingId}</h3>
                <button onClick={() => setSelectedParcel(null)} className="text-muted-foreground hover:text-foreground text-xl">×</button>
              </div>

              <StatusChip status={selectedParcel.status} />

              {/* Timeline */}
              <div className="space-y-0">
                {selectedParcel.events.map((ev, i) => (
                  <div key={ev.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${i === selectedParcel.events.length - 1 ? "bg-primary ring-4 ring-primary/20" : "bg-muted"}`} />
                      {i < selectedParcel.events.length - 1 && <div className="w-0.5 h-8 bg-border" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-foreground">{ev.type}</p>
                      <p className="text-xs text-muted-foreground">{new Date(ev.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Details */}
              <div className="space-y-3">
                {[["Sender", selectedParcel.senderName], ["Sender Phone", selectedParcel.senderPhone], ["Recipient", selectedParcel.recipientName], ["Recipient Phone", selectedParcel.recipientPhone], ["Address", selectedParcel.deliveryAddress], ["Route", `${selectedParcel.originCity} → ${selectedParcel.destinationCity}`], ["Size", selectedParcel.size], ["Category", selectedParcel.category], ["Total", `KSh ${selectedParcel.totalPrice}`], ["Payment", `${selectedParcel.paymentMethod.toUpperCase()} ${selectedParcel.paymentRef ? `· ${selectedParcel.paymentRef}` : ""}`]].map(([label, val]) => (
                  <div key={label as string} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="text-foreground text-right">{val}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <button className="btn-primary w-full h-12 flex items-center justify-center gap-2"><Printer size={16} /> Print Label</button>
                <button className="w-full h-12 rounded-full border border-destructive/30 text-destructive text-sm font-medium hover:bg-destructive/5 transition-colors flex items-center justify-center gap-2">
                  <AlertTriangle size={16} /> Report Issue
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatusChip = ({ status }: { status: string }) => {
  const c = statusColors[status] || "0 0% 50%";
  return (
    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `hsl(${c} / 0.15)`, color: `hsl(${c})` }}>
      {status}
    </span>
  );
};

export default ClerkParcels;

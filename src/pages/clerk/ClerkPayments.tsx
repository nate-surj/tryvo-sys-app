import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Check, X } from "lucide-react";
import { useClerkStore } from "@/stores/clerkStore";
import { toast } from "@/hooks/use-toast";

const ClerkPayments = () => {
  const store = useClerkStore();
  const clerk = store.getClerk();
  const transactions = store.getTransactions();
  const [filter, setFilter] = useState<"all" | "mpesa" | "cash">("all");
  const [showHandover, setShowHandover] = useState(false);
  const [handoverAmount, setHandoverAmount] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [handoverHistory, setHandoverHistory] = useState<{ amount: number; supervisor: string; time: Date }[]>([]);

  const today = transactions.filter((t) => new Date(t.createdAt).toDateString() === new Date().toDateString());
  const filtered = filter === "all" ? today : today.filter((t) => t.method === filter);

  const mpesaTotal = today.filter((t) => t.method === "mpesa" && t.status === "completed").reduce((s, t) => s + t.amount, 0);
  const cashTotal = today.filter((t) => t.method === "cash" && t.status === "completed").reduce((s, t) => s + t.amount, 0);
  const totalCollected = mpesaTotal + cashTotal;
  const expectedTotal = totalCollected; // In real app, would compare to bookings
  const variance = totalCollected - expectedTotal;

  const exportCSV = () => {
    const header = "Time,Booking ID,Amount,Method,Status\n";
    const rows = filtered.map((t) => `${new Date(t.createdAt).toLocaleTimeString()},${t.bookingId},${t.amount},${t.method},${t.status}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tryvo-payments-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "CSV exported" });
  };

  const handleHandover = () => {
    if (!handoverAmount || !supervisorName) return;
    setHandoverHistory((h) => [{ amount: Number(handoverAmount), supervisor: supervisorName, time: new Date() }, ...h]);
    toast({ title: "Cash handover recorded" });
    setShowHandover(false);
    setHandoverAmount("");
    setSupervisorName("");
  };

  return (
    <div className="space-y-5 max-w-[1000px]">
      <div>
        <h1 className="text-xl font-display font-bold text-foreground">Today's Payments</h1>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
          {clerk && ` · Shift started ${new Date(clerk.shiftStart).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`}
        </p>
      </div>

      {/* Summary */}
      <div className="card-dark rounded-[14px] p-5 space-y-3" style={{ borderTop: "3px solid hsl(21 92% 47%)" }}>
        <p className="text-sm text-muted-foreground">Total Collected Today</p>
        <p className="text-3xl font-display font-extrabold text-foreground">KSh {totalCollected.toLocaleString()}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "hsl(142 71% 45%)" }} />
            <span className="text-muted-foreground">M-Pesa:</span>
            <span className="text-foreground font-medium">KSh {mpesaTotal.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">({today.filter((t) => t.method === "mpesa").length})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "hsl(38 92% 50%)" }} />
            <span className="text-muted-foreground">Cash:</span>
            <span className="text-foreground font-medium">KSh {cashTotal.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">({today.filter((t) => t.method === "cash").length})</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Variance:</span>
          <span style={{ color: variance === 0 ? "hsl(142 71% 45%)" : "hsl(0 84% 60%)" }}>
            KSh {variance} {variance === 0 ? "— Balanced ✓" : "⚠️ Gap detected"}
          </span>
        </div>
      </div>

      {/* Filter + export */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(["all", "mpesa", "cash"] as const).map((f) => (
            <button
              key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filter === f ? "bg-primary text-white" : "card-dark text-muted-foreground hover:text-foreground"}`}
            >
              {f === "all" ? "All" : f === "mpesa" ? "M-Pesa" : "Cash"}
            </button>
          ))}
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs card-dark text-muted-foreground hover:text-foreground transition-colors">
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="card-dark rounded-[14px] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Time", "Booking ID", "Amount", "Method", "Status"].map((h) => (
                <th key={h} className="text-left text-xs text-muted-foreground font-medium px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-border/50 hover:bg-muted/5 transition-colors h-12">
                <td className="px-4 text-sm text-muted-foreground">{new Date(t.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</td>
                <td className="px-4 font-mono text-sm text-primary">{t.bookingId}</td>
                <td className="px-4 text-sm text-foreground font-medium">KSh {t.amount.toLocaleString()}</td>
                <td className="px-4">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{
                    background: t.method === "mpesa" ? "hsl(142 71% 45% / 0.15)" : "hsl(38 92% 50% / 0.15)",
                    color: t.method === "mpesa" ? "hsl(142 71% 45%)" : "hsl(38 92% 50%)",
                  }}>
                    {t.method === "mpesa" ? "M-Pesa" : "Cash"}
                  </span>
                </td>
                <td className="px-4">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "hsl(142 71% 45% / 0.15)", color: "hsl(142 71% 45%)" }}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cash handover */}
      <div className="card-dark rounded-[14px] p-5 space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Cash Handover</h3>
        <button onClick={() => setShowHandover(true)} className="btn-primary h-10 px-6 text-sm">Record Cash Handover</button>

        {handoverHistory.length > 0 && (
          <div className="space-y-2 mt-3">
            {handoverHistory.map((h, i) => (
              <div key={i} className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/5">
                <span className="text-foreground">KSh {h.amount.toLocaleString()} → {h.supervisor}</span>
                <span className="text-xs text-muted-foreground">{new Date(h.time).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Handover modal */}
      {showHandover && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "hsl(0 0% 0% / 0.7)" }}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="card-dark rounded-[20px] p-6 w-96 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-bold text-foreground">Record Cash Handover</h3>
              <button onClick={() => setShowHandover(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Amount handed to supervisor</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">KSh</span>
                <input value={handoverAmount} onChange={(e) => setHandoverAmount(e.target.value)} type="number"
                  className="w-full h-12 pl-14 pr-4 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Supervisor name</label>
              <input value={supervisorName} onChange={(e) => setSupervisorName(e.target.value)} placeholder="Full name"
                className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
            </div>
            <button onClick={handleHandover} disabled={!handoverAmount || !supervisorName} className="btn-primary w-full h-12 disabled:opacity-50">
              Confirm Handover
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ClerkPayments;

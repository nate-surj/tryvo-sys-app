import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Package, AlertTriangle, HelpCircle, RotateCcw, MapPin, Wrench, Camera, X } from "lucide-react";
import { useClerkStore, type Issue } from "@/stores/clerkStore";
import { toast } from "@/hooks/use-toast";

const issueTypes = [
  { type: "Damaged" as const, icon: Package, label: "Damaged parcel" },
  { type: "Missing" as const, icon: HelpCircle, label: "Cannot locate parcel" },
  { type: "Wrong Destination" as const, icon: RotateCcw, label: "Scanned to wrong destination" },
  { type: "Not Collecting" as const, icon: MapPin, label: "Recipient not collecting" },
  { type: "Other" as const, icon: Wrench, label: "Other issue" },
];

const ClerkIssues = () => {
  const store = useClerkStore();
  const issues = store.getIssues();
  const clerk = store.getClerk();
  const [filter, setFilter] = useState<"Open" | "Resolved" | "All">("All");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  // Create form
  const [newTrackingId, setNewTrackingId] = useState("");
  const [newType, setNewType] = useState<Issue["type"] | "">("");
  const [newDesc, setNewDesc] = useState("");
  const [newUrgent, setNewUrgent] = useState(false);

  const filtered = issues.filter((i) => filter === "All" || i.status === filter);
  const openCount = issues.filter((i) => i.status === "Open").length;

  const handleCreate = () => {
    if (!newTrackingId || !newType || newDesc.length < 20) return;
    store.addIssue({
      trackingId: newTrackingId.toUpperCase(),
      type: newType as Issue["type"],
      description: newDesc,
      urgent: newUrgent,
      status: "Open",
      reportedBy: clerk?.name || "Clerk",
      photos: [],
    });
    toast({ title: "Issue reported", description: newUrgent ? "Ops team alerted — URGENT" : "Ops team notified" });
    setShowCreate(false);
    setNewTrackingId("");
    setNewType("");
    setNewDesc("");
    setNewUrgent(false);
  };

  const timeAgo = (d: Date) => {
    const mins = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ${mins % 60}m ago`;
  };

  return (
    <div className="space-y-4 max-w-[900px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-display font-bold text-foreground">Issues</h1>
          {openCount > 0 && (
            <span className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-bold">{openCount}</span>
          )}
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary h-10 px-4 text-sm flex items-center gap-2">
          <Plus size={16} /> Report Issue
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["All", "Open", "Resolved"] as const).map((f) => (
          <button
            key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${filter === f ? "bg-primary text-white" : "card-dark text-muted-foreground hover:text-foreground"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Issue list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <AlertTriangle size={32} className="mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground">No {filter.toLowerCase()} issues</p>
          </div>
        ) : (
          filtered.map((iss) => (
            <div
              key={iss.id}
              onClick={() => setSelectedIssue(iss)}
              className="card-dark rounded-xl p-4 cursor-pointer hover:bg-muted/5 transition-colors"
              style={{ borderLeft: iss.status === "Open" ? "3px solid hsl(0 84% 60%)" : "3px solid hsl(142 71% 45%)" }}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-primary">{iss.trackingId}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "hsl(0 84% 60% / 0.15)", color: "hsl(0 84% 60%)" }}>{iss.type}</span>
                    {iss.urgent && <span className="text-xs px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground font-bold">URGENT</span>}
                  </div>
                  <p className="text-sm text-foreground">{iss.description.slice(0, 80)}...</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Reported by {iss.reportedBy}</span>
                    <span style={{ color: iss.status === "Open" && new Date(iss.createdAt).getTime() < Date.now() - 7200000 ? "hsl(0 84% 60%)" : undefined }}>
                      {timeAgo(iss.createdAt)}
                    </span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${iss.status === "Open" ? "bg-destructive/15 text-destructive" : "bg-green-500/15 text-green-500"}`}>
                  {iss.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create issue modal */}
      <AnimatePresence>
        {showCreate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "hsl(0 0% 0% / 0.7)" }}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="card-dark rounded-[20px] p-6 w-[480px] max-w-[95vw] space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-display font-bold text-foreground">Report an Issue</h3>
                <button onClick={() => setShowCreate(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Tracking ID</label>
                <input
                  value={newTrackingId} onChange={(e) => setNewTrackingId(e.target.value.toUpperCase())}
                  placeholder="TRV-XXXX-XXX"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Issue Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {issueTypes.map((it) => (
                    <button
                      key={it.type} onClick={() => setNewType(it.type)}
                      className={`flex items-center gap-2 p-3 rounded-xl border-2 text-left text-sm transition-all ${
                        newType === it.type ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:border-muted"
                      }`}
                    >
                      <it.icon size={16} /> {it.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Description <span className="text-xs text-muted-foreground">(min 20 chars)</span></label>
                <textarea
                  value={newDesc} onChange={(e) => setNewDesc(e.target.value)}
                  rows={4} placeholder="Describe the issue in detail..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setNewUrgent(!newUrgent)}
                  className={`w-10 h-6 rounded-full flex items-center transition-colors cursor-pointer ${newUrgent ? "bg-destructive justify-end" : "bg-muted justify-start"}`}
                >
                  <span className="w-4 h-4 rounded-full bg-white mx-1" />
                </div>
                <span className="text-sm text-foreground">Mark as Urgent</span>
              </label>

              <button
                onClick={handleCreate}
                disabled={!newTrackingId || !newType || newDesc.length < 20}
                className="btn-primary w-full h-14 disabled:opacity-50"
              >
                Submit Issue
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Issue detail slide-over */}
      <AnimatePresence>
        {selectedIssue && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40" style={{ background: "hsl(0 0% 0% / 0.5)" }} onClick={() => setSelectedIssue(null)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 border-l border-border overflow-y-auto p-6 space-y-5"
              style={{ background: "hsl(0 0% 5%)" }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-display font-bold text-foreground">Issue Details</h3>
                <button onClick={() => setSelectedIssue(null)} className="text-muted-foreground hover:text-foreground text-xl">×</button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Tracking ID</span><span className="font-mono text-primary">{selectedIssue.trackingId}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="text-foreground">{selectedIssue.type}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span>{selectedIssue.status}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Reported by</span><span>{selectedIssue.reportedBy}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span>{timeAgo(selectedIssue.createdAt)}</span></div>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Description</p>
                <p className="text-sm text-muted-foreground">{selectedIssue.description}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClerkIssues;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Check, AlertTriangle, Keyboard, WifiOff } from "lucide-react";
import { useClerkStore } from "@/stores/clerkStore";
import { toast } from "@/hooks/use-toast";

const ClerkScan = () => {
  const store = useClerkStore();
  const [scannedCount, setScannedCount] = useState(0);
  const [scanHistory, setScanHistory] = useState<{ id: string; time: Date }[]>([]);
  const [scanResult, setScanResult] = useState<any>(null);
  const [showManual, setShowManual] = useState(false);
  const [manualId, setManualId] = useState("");
  const [scanError, setScanError] = useState(false);
  const [offline, setOffline] = useState(false);

  // Simulate scans via click (since we can't use real camera)
  const simulateScan = () => {
    const parcels = store.getParcels().filter((p) => p.status === "In Transit" || p.status === "Booked");
    if (parcels.length === 0) {
      setScanError(true);
      setTimeout(() => setScanError(false), 2000);
      return;
    }
    const parcel = parcels[Math.floor(Math.random() * parcels.length)];
    handleScanResult(parcel.trackingId);
  };

  const handleScanResult = (trackingId: string) => {
    const parcel = store.getParcelByTracking(trackingId);
    if (!parcel) {
      setScanError(true);
      setTimeout(() => setScanError(false), 2000);
      return;
    }
    setScanResult(parcel);
    setScanError(false);
  };

  const confirmArrival = () => {
    if (!scanResult) return;
    store.updateParcelStatus(scanResult.trackingId, "Arrived");
    setScanHistory((h) => [{ id: scanResult.trackingId, time: new Date() }, ...h]);
    setScannedCount((c) => c + 1);
    toast({ title: "Parcel arrived", description: "Dispatch notified — rider being assigned" });
    setTimeout(() => setScanResult(null), 1500);
  };

  const handleManualLookup = () => {
    const id = manualId.trim().toUpperCase();
    if (!id) return;
    handleScanResult(id);
    setShowManual(false);
    setManualId("");
  };

  const timeStr = (d: Date) => new Date(d).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="max-w-[800px] mx-auto space-y-6">
      {/* Offline banner */}
      {offline && (
        <div className="flex items-center gap-2 p-3 rounded-lg text-sm" style={{ background: "hsl(38 92% 50% / 0.15)", color: "hsl(38 92% 50%)" }}>
          <WifiOff size={16} /> Offline — scans saved locally
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">Scan Arrived Parcels</h1>
          <p className="text-sm text-muted-foreground">Scan each parcel as it arrives from vehicle</p>
        </div>
        <div className="card-dark rounded-xl px-4 py-2">
          <span className="text-sm font-bold text-foreground">{scannedCount}</span>
          <span className="text-xs text-muted-foreground ml-1">scanned this session</span>
        </div>
      </div>

      {/* Camera Viewfinder */}
      <div
        className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all ${scanError ? "animate-shake" : ""}`}
        style={{ background: "hsl(0 0% 8%)", height: "50vh", minHeight: 300 }}
        onClick={simulateScan}
      >
        {/* Corner brackets */}
        <div className="absolute inset-8 pointer-events-none">
          {[["top-0 left-0", "border-t-2 border-l-2"], ["top-0 right-0", "border-t-2 border-r-2"], ["bottom-0 left-0", "border-b-2 border-l-2"], ["bottom-0 right-0", "border-b-2 border-r-2"]].map(([pos, border], i) => (
            <div key={i} className={`absolute ${pos} w-8 h-8 ${border} border-primary rounded-sm`} />
          ))}
        </div>

        {scanError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "hsl(0 84% 60% / 0.15)" }}
          >
            <p className="text-sm font-bold text-destructive">QR code not recognized</p>
          </motion.div>
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
          <QrCode size={48} className="text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">Click here to simulate a QR scan</p>
          <p className="text-xs text-muted-foreground/50">In production, your camera would activate here</p>
        </div>

        {/* Manual entry button */}
        <button
          onClick={(e) => { e.stopPropagation(); setShowManual(true); }}
          className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg text-sm card-dark hover:bg-muted/10 transition-colors"
        >
          <Keyboard size={14} /> Enter manually
        </button>
      </div>

      {/* Scan result panel */}
      <AnimatePresence>
        {scanResult && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="card-dark rounded-[20px] p-6 space-y-4"
            style={{ borderTop: "3px solid hsl(21 92% 47%)" }}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-primary font-bold">{scanResult.trackingId}</span>
              <StatusChip status={scanResult.status} />
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <StatusChip status={scanResult.status} />
              <span>→</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "hsl(142 71% 45% / 0.15)", color: "hsl(142 71% 45%)" }}>
                Arrived at {store.getClerk()?.officeCity || "Office"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Recipient</p>
                <p className="text-foreground font-medium">{scanResult.recipientName} · {scanResult.destinationCity}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Size & Category</p>
                <p className="text-foreground">{scanResult.size} · {scanResult.category}</p>
              </div>
            </div>

            <div className="space-y-2">
              <button onClick={confirmArrival} className="btn-primary w-full h-14 text-base flex items-center justify-center gap-2">
                <Check size={20} /> Confirm Arrival
              </button>
              <button className="w-full h-12 rounded-full border border-primary/30 text-primary text-sm font-medium hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
                <AlertTriangle size={16} /> Report Issue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scan history */}
      {scanHistory.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">This session</p>
          <div className="card-dark rounded-[14px] divide-y divide-border">
            {scanHistory.slice(0, 10).map((s, i) => (
              <div key={i} className="flex items-center justify-between h-10 px-4">
                <span className="text-xs text-muted-foreground">{timeStr(s.time)}</span>
                <span className="font-mono text-sm text-primary">{s.id}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "hsl(142 71% 45% / 0.15)", color: "hsl(142 71% 45%)" }}>Confirmed</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Manual entry modal */}
      {showManual && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "hsl(0 0% 0% / 0.7)" }}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card-dark rounded-[20px] p-8 w-96 space-y-4">
            <h3 className="text-lg font-display font-bold text-foreground">Enter tracking ID manually</h3>
            <input
              value={manualId}
              onChange={(e) => setManualId(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleManualLookup()}
              placeholder="TRV-XXXX-XXX"
              className="w-full h-14 px-4 rounded-xl border border-border bg-card text-foreground font-mono text-lg uppercase focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            <div className="flex gap-2">
              <button onClick={handleManualLookup} className="btn-primary flex-1">Look up parcel</button>
              <button onClick={() => setShowManual(false)} className="btn-dark flex-1">Cancel</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const StatusChip = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    Booked: "217 91% 60%", "In Transit": "38 92% 50%", Arrived: "270 70% 60%",
    "Out for Delivery": "21 92% 47%", Delivered: "142 71% 45%", Issue: "0 84% 60%",
  };
  const c = colors[status] || "0 0% 50%";
  return (
    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `hsl(${c} / 0.15)`, color: `hsl(${c})` }}>
      {status}
    </span>
  );
};

export default ClerkScan;

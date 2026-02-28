import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, PackagePlus, QrCode, ClipboardList,
  AlertTriangle, Receipt, User, LogOut, Bell
} from "lucide-react";
import TryvoLogo from "../TryvoLogo";
import { useClerkStore } from "@/stores/clerkStore";

const navItems = [
  { label: "Home", to: "/clerk/dashboard", icon: LayoutDashboard },
  { label: "New Booking", to: "/clerk/new-booking", icon: PackagePlus, highlight: true },
  { label: "Scan Parcel", to: "/clerk/scan", icon: QrCode },
  { label: "Today's Parcels", to: "/clerk/parcels", icon: ClipboardList },
  { label: "Issues", to: "/clerk/issues", icon: AlertTriangle, badge: true },
  { label: "Payments", to: "/clerk/payments", icon: Receipt },
];

const ClerkLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const store = useClerkStore();
  const clerk = store.getClerk();
  const openIssues = store.getIssues().filter((i) => i.status === "Open").length;
  const [locked, setLocked] = useState(false);
  const [lockPin, setLockPin] = useState("");
  const [lockError, setLockError] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Auto-lock after 30 min inactivity
  useEffect(() => {
    const resetTimer = () => setLastActivity(Date.now());
    const events = ["mousedown", "keydown", "touchstart", "scroll"];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    const interval = setInterval(() => {
      if (Date.now() - lastActivity > 30 * 60 * 1000 && clerk) setLocked(true);
    }, 10000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      clearInterval(interval);
    };
  }, [lastActivity, clerk]);

  useEffect(() => {
    if (!clerk) navigate("/clerk/login");
  }, [clerk, navigate]);

  if (!clerk) return null;

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const shiftDuration = () => {
    const diff = Date.now() - new Date(clerk.shiftStart).getTime();
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    return `${h}h ${m}m`;
  };

  const handleUnlock = () => {
    if (lockPin === "123456") {
      setLocked(false);
      setLockPin("");
      setLockError(false);
      setLastActivity(Date.now());
    } else {
      setLockError(true);
      setLockPin("");
    }
  };

  const handleEndShift = () => {
    store.logout();
    navigate("/clerk/login");
  };

  return (
    <div className="dark flex h-screen overflow-hidden" style={{ background: "hsl(0 0% 5%)", color: "hsl(37 25% 93%)" }}>
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 flex flex-col border-r border-border" style={{ background: "hsl(0 0% 4%)" }}>
        <div className="p-6 space-y-1">
          <TryvoLogo className="h-6 w-auto" light />
          <p className="label-caps text-[11px] mt-2">Clerk Portal</p>
        </div>
        <div className="px-6 pb-4 border-b border-border">
          <p className="text-sm font-bold text-foreground">{clerk.saccoName}</p>
          <p className="text-xs text-muted-foreground">{clerk.officeName}</p>
          <p className="text-xs text-muted-foreground">{clerk.name}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-[11px] text-muted-foreground">Shift: {shiftDuration()}</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 h-12 px-3 rounded-[10px] text-sm font-medium transition-colors relative ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                }`}
                style={active ? { background: "hsl(21 92% 47% / 0.1)", borderLeft: "3px solid hsl(21 92% 47%)" } : {}}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
                {item.badge && openIssues > 0 && (
                  <span className="ml-auto w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[11px] flex items-center justify-center font-bold">
                    {openIssues}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-border space-y-2">
          <button
            onClick={handleEndShift}
            className="w-full flex items-center justify-center gap-2 h-10 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-colors"
          >
            <LogOut size={16} />
            End Shift
          </button>
          <p className="text-[11px] text-center text-muted-foreground/50">v1.0.0</p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-[60px] flex items-center justify-between px-6 border-b border-border flex-shrink-0">
          <p className="text-lg font-display font-bold">{greeting()}, {clerk.name.split(" ")[0]}</p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              {" · "}
              {new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
            </span>
            <button className="relative p-2 rounded-lg hover:bg-muted/10 transition-colors">
              <Bell size={18} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Lock overlay */}
      <AnimatePresence>
        {locked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "hsl(0 0% 4% / 0.95)" }}
          >
            <div className="text-center space-y-6">
              <TryvoLogo className="h-8 w-auto mx-auto" light />
              <p className="text-lg font-display font-bold">Session locked</p>
              <p className="text-sm text-muted-foreground">Enter PIN to continue</p>
              <input
                type="password"
                maxLength={6}
                value={lockPin}
                onChange={(e) => { setLockPin(e.target.value.replace(/\D/g, "")); setLockError(false); }}
                onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                className="w-48 h-14 text-center text-2xl tracking-[8px] rounded-xl border border-border bg-card font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              {lockError && <p className="text-sm text-destructive">Incorrect PIN</p>}
              <button onClick={handleUnlock} className="btn-primary w-48">Unlock</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClerkLayout;

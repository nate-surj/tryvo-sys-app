import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import TryvoLogo from "@/components/TryvoLogo";
import { clerkStore } from "@/stores/clerkStore";
import { toast } from "@/hooks/use-toast";

const ClerkLogin = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate async
    await new Promise((r) => setTimeout(r, 1200));

    const success = clerkStore.login(code, pin);
    setLoading(false);

    if (success) {
      const h = new Date().getHours();
      const greet = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
      const emoji = h < 12 ? "☀️" : h < 17 ? "🌤️" : "🌙";
      toast({ title: `${greet}, Joseph ${emoji}`, description: "Your shift has started." });
      navigate("/clerk/dashboard");
    } else {
      setShake(true);
      setError("Invalid code or PIN. Contact your supervisor.");
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="dark min-h-screen flex items-center justify-center" style={{ background: "hsl(0 0% 4%)" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <TryvoLogo className="h-10 w-auto mx-auto mb-4" light />
        <p className="label-caps text-sm mb-1">Clerk Portal</p>
        <p className="text-sm text-muted-foreground mb-8">2NK SACCO</p>

        <motion.form
          onSubmit={handleSubmit}
          animate={shake ? { x: [0, -12, 12, -8, 8, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="card-dark rounded-[20px] p-10 w-[400px] max-w-[95vw] text-left space-y-6"
        >
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">Sign in to your shift</h2>
            <p className="text-sm text-muted-foreground mt-1">Enter your office code and PIN</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Office Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. 2NK-NBI-01"
              className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            <p className="text-[11px] text-muted-foreground">Provided by your SACCO manager</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Your PIN</label>
            <div className="relative">
              <input
                type={showPin ? "text" : "password"}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                maxLength={6}
                className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground font-mono text-2xl tracking-[8px] focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading || !code || pin.length < 6}
            className="btn-primary w-full h-14 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowForgot(true)}
            className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Forgot PIN?
          </button>
        </motion.form>

        {showForgot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "hsl(0 0% 0% / 0.7)" }}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="card-dark rounded-[20px] p-8 max-w-sm text-center space-y-4"
            >
              <h3 className="text-lg font-display font-bold text-foreground">Forgot PIN?</h3>
              <p className="text-sm text-muted-foreground">
                Contact your SACCO supervisor to reset your PIN. They can issue a new one through the admin portal.
              </p>
              <button onClick={() => setShowForgot(false)} className="btn-primary">Got it</button>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ClerkLogin;

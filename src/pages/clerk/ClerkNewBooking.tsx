import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Loader2, Phone, Copy, Printer, Package, FileText, Shield, AlertTriangle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useClerkStore, type Parcel } from "@/stores/clerkStore";
import { toast } from "@/hooks/use-toast";

const destinations = [
  { city: "Nakuru", hours: 3, saccoFee: 300, tryvoFee: 200 },
  { city: "Eldoret", hours: 5, saccoFee: 380, tryvoFee: 270 },
  { city: "Kisumu", hours: 6, saccoFee: 400, tryvoFee: 300 },
  { city: "Mombasa", hours: 8, saccoFee: 420, tryvoFee: 330 },
  { city: "Nyeri", hours: 2, saccoFee: 270, tryvoFee: 180 },
  { city: "Thika", hours: 1, saccoFee: 200, tryvoFee: 150 },
  { city: "Nanyuki", hours: 3, saccoFee: 320, tryvoFee: 210 },
  { city: "Machakos", hours: 1.5, saccoFee: 220, tryvoFee: 160 },
];

const sizes = [
  { id: "S" as const, label: "Small", weight: "0-2 kg", surcharge: 0 },
  { id: "M" as const, label: "Medium", weight: "2-5 kg", surcharge: 100 },
  { id: "L" as const, label: "Large", weight: "5-15 kg", surcharge: 250 },
  { id: "XL" as const, label: "Extra Large", weight: "15+ kg", surcharge: 500 },
];

const categories = ["General", "Fragile", "High Value", "Documents"] as const;

type BookingState = "form" | "confirmed";

const ClerkNewBooking = () => {
  const store = useClerkStore();
  const clerk = store.getClerk();
  const navigate = useNavigate();

  // Form state
  const [dest, setDest] = useState("");
  const [size, setSize] = useState<"S" | "M" | "L" | "XL" | "">("");
  const [category, setCategory] = useState<typeof categories[number]>("General");
  const [declaredValue, setDeclaredValue] = useState("");
  const [insured, setInsured] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderSms, setSenderSms] = useState(true);
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "cash">("mpesa");
  const [mpesaStatus, setMpesaStatus] = useState<"idle" | "sending" | "waiting" | "success" | "failed">("idle");
  const [mpesaRef, setMpesaRef] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [cashConfirmed, setCashConfirmed] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [bookingState, setBookingState] = useState<BookingState>("form");
  const [confirmedParcel, setConfirmedParcel] = useState<Parcel | null>(null);
  const [autoResetCount, setAutoResetCount] = useState(15);
  const [submitting, setSubmitting] = useState(false);

  const destData = destinations.find((d) => d.city === dest);
  const sizeData = sizes.find((s) => s.id === size);
  const saccoFee = destData?.saccoFee || 0;
  const tryvoFee = destData?.tryvoFee || 0;
  const sizeSurcharge = sizeData?.surcharge || 0;
  const insuranceFee = insured && category === "High Value" ? (Number(declaredValue) > 50000 ? 250 : 100) : 0;
  const total = saccoFee + tryvoFee + sizeSurcharge + insuranceFee;

  const paymentDone = paymentMethod === "mpesa" ? mpesaStatus === "success" : cashConfirmed && Number(cashAmount) >= total;
  const isValid = dest && size && senderName && senderPhone && recipientName && recipientPhone && address && paymentDone;
  const changeDue = paymentMethod === "cash" && Number(cashAmount) > total ? Number(cashAmount) - total : 0;

  // Auto-save
  useEffect(() => {
    if (bookingState !== "form") return;
    const t = setTimeout(() => {
      setSaveStatus("saving");
      const data = { dest, size, category, senderName, senderPhone, recipientName, recipientPhone, address, landmark, paymentMethod };
      localStorage.setItem("clerk_booking_draft", JSON.stringify(data));
      setTimeout(() => setSaveStatus("saved"), 500);
    }, 1000);
    return () => clearTimeout(t);
  }, [dest, size, category, senderName, senderPhone, recipientName, recipientPhone, address, landmark, paymentMethod, bookingState]);

  // Load draft
  useEffect(() => {
    const draft = localStorage.getItem("clerk_booking_draft");
    if (draft) {
      try {
        const d = JSON.parse(draft);
        if (d.dest) setDest(d.dest);
        if (d.size) setSize(d.size);
        if (d.category) setCategory(d.category);
        if (d.senderName) setSenderName(d.senderName);
        if (d.senderPhone) setSenderPhone(d.senderPhone);
        if (d.recipientName) setRecipientName(d.recipientName);
        if (d.recipientPhone) setRecipientPhone(d.recipientPhone);
        if (d.address) setAddress(d.address);
        if (d.landmark) setLandmark(d.landmark);
      } catch {}
    }
  }, []);

  // Auto reset after confirmation
  useEffect(() => {
    if (bookingState !== "confirmed") return;
    if (autoResetCount <= 0) { resetForm(); return; }
    const t = setTimeout(() => setAutoResetCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [bookingState, autoResetCount]);

  const resetForm = () => {
    setDest(""); setSize(""); setCategory("General"); setDeclaredValue("");
    setInsured(false); setSenderName(""); setSenderPhone(""); setRecipientName("");
    setRecipientPhone(""); setAddress(""); setLandmark(""); setPaymentMethod("mpesa");
    setMpesaStatus("idle"); setMpesaRef(""); setCashAmount(""); setCashConfirmed(false);
    setBookingState("form"); setConfirmedParcel(null); setAutoResetCount(15);
    localStorage.removeItem("clerk_booking_draft");
  };

  const handleMpesaSend = async () => {
    setMpesaStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setMpesaStatus("waiting");
    // Simulate payment after 3s
    setTimeout(() => {
      const ref = `QHX${Math.floor(Math.random() * 10000)}ABC`;
      setMpesaRef(ref);
      setMpesaStatus("success");
    }, 3000);
  };

  const handleSubmit = async () => {
    if (!isValid || !size) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    const parcel = store.addParcel({
      senderName, senderPhone: `+254 ${senderPhone}`,
      recipientName, recipientPhone: `+254 ${recipientPhone}`,
      deliveryAddress: address, landmark,
      originCity: clerk?.officeCity || "Nairobi",
      destinationCity: dest,
      size: size as Parcel["size"], category, declaredValue: declaredValue ? Number(declaredValue) : undefined,
      insured, status: "Booked",
      paymentMethod, paymentStatus: "completed",
      paymentRef: mpesaRef || undefined,
      totalPrice: total, saccoFee, tryvoFee, sizeSurcharge, insuranceFee,
    });
    setConfirmedParcel(parcel);
    setBookingState("confirmed");
    setSubmitting(false);
    localStorage.removeItem("clerk_booking_draft");
    toast({ title: "Booking confirmed!", description: `Tracking ID: ${parcel.trackingId}` });
  };

  const SectionLabel = ({ children }: { children: string }) => (
    <p className="label-caps text-xs mb-3">{children}</p>
  );

  const InputField = ({ label, value, onChange, placeholder, type = "text", prefix, required, disabled, rows }: any) => (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}{required && <span className="text-primary ml-1">*</span>}</label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{prefix}</span>}
        {rows ? (
          <textarea
            value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} disabled={disabled}
            className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
          />
        ) : (
          <input
            type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={disabled}
            className={`w-full h-12 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm ${prefix ? "pl-14" : "px-4"}`}
          />
        )}
      </div>
    </div>
  );

  if (bookingState === "confirmed" && confirmedParcel) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1100px]">
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-12">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "hsl(142 71% 45%)" }}>
              <Check size={40} className="text-white" />
            </div>
          </motion.div>
          <h2 className="text-2xl font-display font-bold text-foreground">Booking Confirmed!</h2>
          <button
            onClick={() => { navigator.clipboard.writeText(confirmedParcel.trackingId); toast({ title: "Copied!" }); }}
            className="flex items-center gap-2 text-xl font-mono text-primary hover:underline"
          >
            {confirmedParcel.trackingId} <Copy size={16} />
          </button>
          <p className="text-sm text-muted-foreground">Tap to copy tracking ID</p>
          <button onClick={() => window.print()} className="btn-primary w-64 h-14 flex items-center justify-center gap-2">
            <Printer size={18} /> Print Label
          </button>
          <button onClick={resetForm} className="btn-dark w-64">New Booking</button>
          <p className="text-xs text-muted-foreground">Auto-resetting in {autoResetCount} seconds...</p>
        </div>

        {/* QR / Label */}
        <div className="card-dark rounded-[14px] p-6">
          <ParcelLabel parcel={confirmedParcel} large />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px]">
      <div className="flex items-center justify-between mb-6">
        <Link to="/clerk/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <span className="text-xs text-muted-foreground flex items-center gap-1.5">
          {saveStatus === "saving" && <><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Saving...</>}
          {saveStatus === "saved" && <><Check size={12} className="text-green-500" /> Saved</>}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-3 space-y-5">
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">New Parcel Booking</h1>
            <p className="text-sm text-muted-foreground">Fill in all details to generate booking</p>
          </div>

          {/* Route */}
          <div className="card-dark rounded-[14px] p-5 space-y-4" style={{ borderTop: "3px solid hsl(21 92% 47%)" }}>
            <SectionLabel>ROUTE</SectionLabel>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Origin</label>
              <div className="h-12 px-4 rounded-xl border border-primary/30 bg-primary/5 flex items-center">
                <span className="text-sm text-primary font-medium">{clerk?.officeCity || "Nairobi"} — {clerk?.officeName || "CBD Office"}</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Destination <span className="text-primary">*</span></label>
              <select
                value={dest} onChange={(e) => setDest(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm appearance-none"
              >
                <option value="">Select destination city</option>
                {destinations.map((d) => (
                  <option key={d.city} value={d.city}>{d.city} — ~{d.hours}h transit</option>
                ))}
              </select>
            </div>
          </div>

          {/* Parcel */}
          <div className="card-dark rounded-[14px] p-5 space-y-4">
            <SectionLabel>PARCEL DETAILS</SectionLabel>
            <div className="grid grid-cols-2 gap-3">
              {sizes.map((s) => (
                <button
                  key={s.id} onClick={() => setSize(s.id)}
                  className={`relative flex items-center gap-3 h-20 px-4 rounded-xl border-2 transition-all text-left ${
                    size === s.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-muted"
                  }`}
                >
                  <Package size={20} className={size === s.id ? "text-primary" : "text-muted-foreground"} />
                  <div>
                    <p className="text-sm font-bold text-foreground">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.weight}</p>
                  </div>
                  <span className="ml-auto text-xs text-muted-foreground">{s.surcharge > 0 ? `+KSh ${s.surcharge}` : "—"}</span>
                  {size === s.id && <Check size={14} className="absolute top-2 right-2 text-primary" />}
                </button>
              ))}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Category</label>
              <select
                value={category} onChange={(e) => setCategory(e.target.value as any)}
                className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm appearance-none"
              >
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <AnimatePresence>
              {category === "Fragile" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden">
                  <div className="p-3 rounded-lg border-l-3 flex items-start gap-2" style={{ borderLeft: "3px solid hsl(38 92% 50%)", background: "hsl(38 92% 50% / 0.1)" }}>
                    <AlertTriangle size={16} style={{ color: "hsl(38 92% 50%)" }} className="flex-shrink-0 mt-0.5" />
                    <p className="text-xs" style={{ color: "hsl(38 92% 50%)" }}>Mark parcel clearly as FRAGILE. Rider will be notified.</p>
                  </div>
                </motion.div>
              )}
              {category === "High Value" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden space-y-3">
                  <InputField label="Declared Value" value={declaredValue} onChange={setDeclaredValue} placeholder="50000" prefix="KSh" type="number" required />
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => setInsured(!insured)}
                      className={`w-10 h-6 rounded-full flex items-center transition-colors cursor-pointer ${insured ? "bg-primary justify-end" : "bg-muted justify-start"}`}
                    >
                      <span className="w-4 h-4 rounded-full bg-white mx-1" />
                    </div>
                    <span className="text-sm text-foreground flex items-center gap-1.5">
                      <Shield size={14} className="text-primary" />
                      Add insurance: +KSh {Number(declaredValue) > 50000 ? 250 : 100}
                    </span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sender */}
          <div className="card-dark rounded-[14px] p-5 space-y-4">
            <SectionLabel>SENDER</SectionLabel>
            <InputField label="Sender Name" value={senderName} onChange={setSenderName} placeholder="Full name" required />
            <InputField label="Sender Phone" value={senderPhone} onChange={(v: string) => setSenderPhone(v.replace(/\D/g, "").slice(0, 9))} placeholder="7XX XXX XXX" prefix="+254" required />
          </div>

          {/* Recipient */}
          <div className="card-dark rounded-[14px] p-5 space-y-4">
            <SectionLabel>RECIPIENT</SectionLabel>
            <InputField label="Recipient Name" value={recipientName} onChange={setRecipientName} placeholder="Full name" required />
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Recipient Phone <span className="text-primary">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">+254</span>
                <input
                  value={recipientPhone} onChange={(e) => setRecipientPhone(e.target.value.replace(/\D/g, "").slice(0, 9))} placeholder="7XX XXX XXX"
                  className="w-full h-12 pl-14 pr-10 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                {recipientPhone.length === 9 && <Check size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />}
              </div>
            </div>
            <InputField label="Delivery Address" value={address} onChange={setAddress} placeholder="Street, area, landmark — be specific" rows={3} required />
            <InputField label="Landmark" value={landmark} onChange={setLandmark} placeholder="e.g. Next to Nakuru Town Hall" />
          </div>

          {/* Payment */}
          <div className="card-dark rounded-[14px] p-5 space-y-4">
            <SectionLabel>PAYMENT</SectionLabel>
            <div className="flex gap-2">
              {(["mpesa", "cash"] as const).map((m) => (
                <button
                  key={m} onClick={() => { setPaymentMethod(m); setMpesaStatus("idle"); }}
                  className={`flex-1 h-12 rounded-full text-sm font-bold transition-all ${
                    paymentMethod === m ? "bg-primary text-white" : "card-dark text-foreground hover:bg-muted/10"
                  }`}
                >
                  {m === "mpesa" ? "M-Pesa" : "Cash"}
                </button>
              ))}
            </div>

            {paymentMethod === "mpesa" && (
              <div className="space-y-3">
                {mpesaStatus === "idle" && (
                  <>
                    <InputField label="M-Pesa Number" value={senderPhone} onChange={(v: string) => setSenderPhone(v.replace(/\D/g, "").slice(0, 9))} prefix="+254" placeholder="7XX XXX XXX" />
                    <button
                      onClick={handleMpesaSend}
                      disabled={!senderPhone || senderPhone.length < 9 || total === 0}
                      className="btn-primary w-full h-14 disabled:opacity-50"
                    >
                      Send M-Pesa Request — KSh {total.toLocaleString()}
                    </button>
                  </>
                )}
                {mpesaStatus === "sending" && (
                  <div className="flex items-center justify-center gap-2 h-20">
                    <Loader2 size={20} className="animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Sending request to +254 {senderPhone}...</span>
                  </div>
                )}
                {mpesaStatus === "waiting" && (
                  <div className="card-dark rounded-xl p-5 text-center space-y-3" style={{ border: "1px solid hsl(21 92% 47% / 0.3)" }}>
                    <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center" style={{ background: "hsl(21 92% 47% / 0.1)" }}>
                      <Phone size={20} className="text-primary animate-pulse" />
                    </div>
                    <p className="text-sm font-medium text-foreground">Waiting for payment...</p>
                    <p className="text-xs text-muted-foreground">Request sent to +254 {senderPhone}</p>
                  </div>
                )}
                {mpesaStatus === "success" && (
                  <div className="rounded-xl p-4 space-y-1" style={{ background: "hsl(142 71% 45% / 0.1)", border: "1px solid hsl(142 71% 45% / 0.3)" }}>
                    <p className="text-sm font-medium" style={{ color: "hsl(142 71% 45%)" }}>✓ KSh {total.toLocaleString()} received via M-Pesa</p>
                    <p className="text-xs text-muted-foreground">Ref: {mpesaRef}</p>
                  </div>
                )}
                {mpesaStatus === "failed" && (
                  <div className="space-y-3">
                    <p className="text-sm text-destructive">Payment not received — request timed out</p>
                    <div className="flex gap-2">
                      <button onClick={handleMpesaSend} className="btn-primary flex-1">Retry</button>
                      <button onClick={() => setPaymentMethod("cash")} className="btn-dark flex-1">Switch to Cash</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {paymentMethod === "cash" && (
              <div className="space-y-3">
                <InputField label="Amount Received" value={cashAmount} onChange={setCashAmount} prefix="KSh" type="number" placeholder={total.toString()} />
                {changeDue > 0 && (
                  <p className="text-sm text-primary font-medium">KSh {changeDue.toLocaleString()} change to give back</p>
                )}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox" checked={cashConfirmed} onChange={(e) => setCashConfirmed(e.target.checked)}
                    className="w-5 h-5 rounded border-border accent-primary"
                  />
                  <span className="text-sm text-foreground">Confirm cash received</span>
                </label>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!isValid || submitting}
            className="btn-primary w-full h-14 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? <Loader2 size={20} className="animate-spin" /> : "Create Booking"}
          </button>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-0 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Booking Preview</h3>
            <ParcelLabel
              parcel={{
                trackingId: "TRV-PENDING",
                originCity: clerk?.officeCity || "Nairobi",
                destinationCity: dest || "—",
                senderName: senderName || "—",
                recipientName: recipientName || "—",
                recipientPhone: recipientPhone ? `+254 ${recipientPhone.slice(0, 3)}***${recipientPhone.slice(-2)}` : "—",
                size: size || "—",
                category,
              } as any}
            />
            {/* Price */}
            <div className="card-dark rounded-[14px] p-5 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Mid-mile (SACCO)</span><span className="text-foreground">KSh {saccoFee}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Last-mile delivery</span><span className="text-foreground">KSh {tryvoFee}</span></div>
              {sizeSurcharge > 0 && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Size surcharge</span><span className="text-foreground">KSh {sizeSurcharge}</span></div>}
              {insuranceFee > 0 && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Insurance</span><span className="text-foreground">KSh {insuranceFee}</span></div>}
              <div className="border-t border-border my-2" />
              <div className="flex justify-between"><span className="text-sm font-bold text-foreground">TOTAL</span><span className="text-xl font-display font-bold text-primary">KSh {total.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ParcelLabel = ({ parcel, large }: { parcel: any; large?: boolean }) => (
  <div className="rounded-xl p-6 border-2 border-dashed" style={{ background: "hsl(36 26% 96%)", borderColor: "hsl(36 10% 80%)" }}>
    <div className="flex justify-between items-start mb-4">
      <span className="text-xs font-bold" style={{ color: "hsl(0 0% 10%)" }}>TRYVO</span>
      <span className="text-[10px] text-muted-foreground">{new Date().toLocaleDateString()}</span>
    </div>
    <p className={`font-mono font-bold mb-3 ${large ? "text-2xl" : "text-lg"}`} style={{ color: "hsl(0 0% 10%)" }}>{parcel.trackingId}</p>
    <p className="text-sm font-bold uppercase mb-3" style={{ color: "hsl(0 0% 10%)" }}>
      {parcel.originCity} → {parcel.destinationCity}
    </p>
    <div className="space-y-1 text-xs mb-4" style={{ color: "hsl(0 0% 30%)" }}>
      <p>FROM: {parcel.senderName}</p>
      <p>TO: {parcel.recipientName} {parcel.recipientPhone && `· ${parcel.recipientPhone}`}</p>
    </div>
    <div className="flex gap-2 mb-4">
      {parcel.size && parcel.size !== "—" && (
        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: "hsl(21 92% 47% / 0.1)", color: "hsl(21 92% 47%)" }}>{parcel.size}</span>
      )}
      <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "hsl(0 0% 90%)", color: "hsl(0 0% 30%)" }}>{parcel.category}</span>
    </div>
    <div className="flex justify-center">
      <QRCodeSVG
        value={parcel.trackingId === "TRV-PENDING" ? "TRYVO-PENDING" : `https://tryvo.app/track/${parcel.trackingId}`}
        size={large ? 200 : 120}
        level="M"
        bgColor="hsl(36, 26%, 96%)"
        fgColor="hsl(0, 0%, 10%)"
      />
    </div>
  </div>
);

export default ClerkNewBooking;

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Package, Truck, MapPin, CheckCircle, ScanLine } from "lucide-react";

const mockTimeline = [
  { status: "Booked", time: "18 Oct 2025, 09:14 AM", desc: "Parcel booked at Nairobi CBD Office", icon: Package, done: true },
  { status: "In Transit", time: "18 Oct 2025, 10:30 AM", desc: "Loaded onto intercity vehicle — Route NRB→NKR", icon: Truck, done: true },
  { status: "Arrived", time: "18 Oct 2025, 02:45 PM", desc: "Arrived at Nakuru Main Office — Scanned by clerk", icon: ScanLine, done: true },
  { status: "Out for Delivery", time: "18 Oct 2025, 03:12 PM", desc: "Assigned to rider David K. — ETA 35 mins", icon: MapPin, done: true },
  { status: "Delivered", time: "18 Oct 2025, 03:48 PM", desc: "Delivered to recipient — Confirmed via SMS code", icon: CheckCircle, done: false },
];

const Track = () => {
  const [trackingId, setTrackingId] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) setShowResult(true);
  };

  return (
    <main className="overflow-x-hidden">
      <Navbar />

      <section className="section-dark pt-32 pb-20 md:pt-40 md:pb-28 min-h-screen">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="label-caps">Track Your Parcel</span>
            <h1 className="heading-lg mt-4">
              Your parcel,
              <br />
              <span className="text-brand">always in sight.</span>
            </h1>
            <p className="body-lg mt-4 mb-10" style={{ color: "hsl(40, 5%, 59%)" }}>
              Enter your tracking ID to see real-time updates.
            </p>

            <form onSubmit={handleTrack} className="flex gap-3 max-w-lg mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "hsl(40, 5%, 59%)" }} />
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter tracking ID (e.g. TRV-3143-NKR)"
                  className="w-full rounded-full pl-12 pr-4 py-3.5 text-sm font-body"
                  style={{
                    background: "hsl(0 0% 13%)",
                    border: "1px solid hsl(0 0% 20%)",
                    color: "hsl(37, 25%, 93%)",
                  }}
                />
              </div>
              <button type="submit" className="btn-primary text-sm flex-shrink-0">
                Track
              </button>
            </form>
          </motion.div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto mt-12"
            >
              <div className="card-dark rounded-2xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs" style={{ color: "hsl(40, 5%, 59%)" }}>Tracking ID</p>
                    <p className="text-lg font-display font-bold">{trackingId || "TRV-3143-NKR"}</p>
                  </div>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-brand text-white">In Transit</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <p className="text-xs" style={{ color: "hsl(40, 5%, 59%)" }}>From</p>
                    <p className="font-display font-medium">Nairobi</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "hsl(40, 5%, 59%)" }}>To</p>
                    <p className="font-display font-medium">Nakuru</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "hsl(40, 5%, 59%)" }}>Sent</p>
                    <p className="font-display font-medium">18 Oct 2025</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "hsl(40, 5%, 59%)" }}>ETA</p>
                    <p className="font-display font-medium">18 Oct 2025, 4 PM</p>
                  </div>
                </div>

                <div className="h-px w-full mb-6" style={{ background: "hsl(0 0% 20%)" }} />

                {/* Timeline */}
                <div className="space-y-0">
                  {mockTimeline.map((item, i) => {
                    const Icon = item.icon;
                    const isLast = i === mockTimeline.length - 1;
                    return (
                      <div key={item.status} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? "bg-brand" : ""}`}
                            style={!item.done ? { background: "hsl(0 0% 20%)" } : {}}>
                            <Icon className="w-4 h-4 text-white" strokeWidth={2} />
                          </div>
                          {!isLast && (
                            <div className="w-px flex-1 min-h-[32px]"
                              style={{ background: item.done ? "hsl(21, 92%, 47%)" : "hsl(0 0% 20%)" }} />
                          )}
                        </div>
                        <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
                          <p className="text-sm font-display font-bold">{item.status}</p>
                          <p className="text-xs mt-0.5" style={{ color: "hsl(40, 5%, 59%)" }}>{item.time}</p>
                          <p className="text-xs mt-1" style={{ color: "hsl(40, 5%, 59%)" }}>{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Track;

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const features = [
  "Live location updates",
  "SMS alerts at every milestone",
  "Direct rider contact",
  "Digital proof of delivery",
];

const TrackingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-light py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="label-caps">Tracking</span>
            <h2 className="heading-lg mt-4 mb-8">
              Your parcel,
              <br />
              <span className="text-brand">always in sight.</span>
            </h2>

            <ul className="space-y-4">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 body-md">
                  <span className="w-2 h-2 rounded-full bg-brand flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link to="/track" className="text-brand font-display font-medium mt-8 inline-flex items-center gap-1 hover:gap-2 transition-all duration-200">
              See it in action <span>→</span>
            </Link>
          </motion.div>

          {/* Phone mockup - Home Screen */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center items-center gap-4 md:gap-6"
          >
            {/* Phone 1 - Home */}
            <div
              className="w-[200px] sm:w-[220px] md:w-[240px] rounded-[32px] p-2.5 relative flex-shrink-0"
              style={{
                background: "hsl(0 0% 96%)",
                boxShadow: "0 25px 60px hsl(0 0% 0% / 0.15), 0 0 0 1px hsl(0 0% 88%)",
              }}
            >
              <div className="w-full rounded-[26px] overflow-hidden relative" style={{ background: "hsl(0 0% 100%)" }}>
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 rounded-b-xl" style={{ background: "hsl(0 0% 96%)" }} />

                {/* Screen content */}
                <div className="p-4 pt-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[8px]" style={{ color: "hsl(40 5% 59%)" }}>Delivery to</p>
                      <p className="text-[9px] font-display font-bold" style={{ color: "hsl(0 0% 10%)" }}>Nairobi, Kenya</p>
                    </div>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "hsl(0 0% 93%)" }}>
                      <span className="text-[8px]">🔔</span>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="rounded-full px-3 py-1.5 mb-4 flex items-center gap-1.5" style={{ background: "hsl(0 0% 95%)" }}>
                    <span className="text-[8px]" style={{ color: "hsl(40 5% 59%)" }}>🔍 Search</span>
                  </div>

                  {/* Quick actions */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="rounded-xl p-2.5 text-center" style={{ background: "hsl(0 0% 95%)" }}>
                      <div className="text-lg mb-1">📦</div>
                      <p className="text-[8px] font-display font-medium" style={{ color: "hsl(0 0% 10%)" }}>New Delivery</p>
                    </div>
                    <div className="rounded-xl p-2.5 text-center" style={{ background: "hsl(0 0% 95%)" }}>
                      <div className="text-lg mb-1">🚚</div>
                      <p className="text-[8px] font-display font-medium" style={{ color: "hsl(0 0% 10%)" }}>Track Package</p>
                    </div>
                  </div>

                  {/* Current Shipment */}
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[9px] font-display font-bold" style={{ color: "hsl(0 0% 10%)" }}>Current Shipment</p>
                    <p className="text-[7px] text-brand font-medium">See All</p>
                  </div>

                  <div className="rounded-xl p-2.5 mb-3" style={{ background: "hsl(0 0% 97%)", border: "1px solid hsl(0 0% 92%)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: "hsl(0 0% 92%)" }}>
                          <span className="text-[8px]">📦</span>
                        </div>
                        <div>
                          <p className="text-[8px] font-display font-bold" style={{ color: "hsl(0 0% 10%)" }}>ID: T314315796</p>
                          <p className="text-[6px]" style={{ color: "hsl(40 5% 59%)" }}>Electronics Package</p>
                        </div>
                      </div>
                      <span className="text-[6px] font-medium px-1.5 py-0.5 rounded-full bg-brand text-white">Transit</span>
                    </div>

                    {/* Progress dots */}
                    <div className="flex items-center gap-0.5 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                      <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                      <div className="flex-1 h-px bg-brand opacity-40" style={{ backgroundImage: "repeating-linear-gradient(to right, hsl(21 92% 47%), hsl(21 92% 47%) 2px, transparent 2px, transparent 4px)" }} />
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(0 0% 80%)" }} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[6px]" style={{ color: "hsl(40 5% 59%)" }}>18 Oct 2025</p>
                        <p className="text-[7px] font-display font-medium" style={{ color: "hsl(0 0% 10%)" }}>Nairobi</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[6px]" style={{ color: "hsl(40 5% 59%)" }}>Est. 19 Oct</p>
                        <p className="text-[7px] font-display font-medium" style={{ color: "hsl(0 0% 10%)" }}>Kampala</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent */}
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[9px] font-display font-bold" style={{ color: "hsl(0 0% 10%)" }}>Recent Shipment</p>
                    <p className="text-[7px] text-brand font-medium">See All</p>
                  </div>

                  <div className="rounded-xl p-2 mb-1.5" style={{ background: "hsl(0 0% 97%)", border: "1px solid hsl(0 0% 92%)" }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-md flex items-center justify-center" style={{ background: "hsl(0 0% 92%)" }}>
                          <span className="text-[7px]">📦</span>
                        </div>
                        <div>
                          <p className="text-[7px] font-display font-bold" style={{ color: "hsl(0 0% 10%)" }}>ID: T314315796</p>
                          <p className="text-[5px]" style={{ color: "hsl(40 5% 59%)" }}>Mac Mini M4 Pro</p>
                        </div>
                      </div>
                      <span className="text-[5px] font-medium px-1.5 py-0.5 rounded-full" style={{ background: "hsl(40 90% 90%)", color: "hsl(40 80% 30%)" }}>On Process</span>
                    </div>
                  </div>

                  <div className="rounded-xl p-2" style={{ background: "hsl(0 0% 97%)", border: "1px solid hsl(0 0% 92%)" }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-md flex items-center justify-center" style={{ background: "hsl(0 0% 92%)" }}>
                          <span className="text-[7px]">📦</span>
                        </div>
                        <div>
                          <p className="text-[7px] font-display font-bold" style={{ color: "hsl(0 0% 10%)" }}>ID: K37856307</p>
                          <p className="text-[5px]" style={{ color: "hsl(40 5% 59%)" }}>Cargo Speakers</p>
                        </div>
                      </div>
                      <span className="text-[5px] font-medium px-1.5 py-0.5 rounded-full" style={{ background: "hsl(140 50% 90%)", color: "hsl(140 50% 25%)" }}>Delivered</span>
                    </div>
                  </div>

                  {/* Bottom nav */}
                  <div className="mt-3 rounded-full py-1.5 px-2 flex items-center justify-around" style={{ background: "hsl(0 0% 10%)" }}>
                    {["🏠", "📦", "➕", "📍", "👤"].map((icon, i) => (
                      <div key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${i === 0 ? "bg-brand" : ""}`}>
                        {icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Phone 2 - Tracking */}
            <div
              className="w-[200px] sm:w-[220px] md:w-[240px] rounded-[32px] p-2.5 relative flex-shrink-0 hidden sm:block"
              style={{
                background: "hsl(0 0% 10%)",
                boxShadow: "0 25px 60px hsl(0 0% 0% / 0.3), 0 0 0 1px hsl(0 0% 20%)",
              }}
            >
              <div className="w-full rounded-[26px] overflow-hidden relative" style={{ background: "hsl(0 0% 6%)" }}>
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 rounded-b-xl" style={{ background: "hsl(0 0% 10%)" }} />

                <div className="p-4 pt-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px]" style={{ color: "hsl(37 25% 93%)" }}>←</span>
                    <span className="text-[10px] font-display font-bold" style={{ color: "hsl(37 25% 93%)" }}>Location Tracking</span>
                    <span className="text-[9px]" style={{ color: "hsl(40 5% 59%)" }}>⋮</span>
                  </div>

                  {/* Map area */}
                  <div className="rounded-xl h-32 mb-3 relative overflow-hidden" style={{ background: "hsl(40 20% 92%)" }}>
                    {/* Simplified map lines */}
                    <svg className="w-full h-full" viewBox="0 0 200 120">
                      <rect width="200" height="120" fill="hsl(40, 20%, 92%)" />
                      <line x1="20" y1="30" x2="180" y2="30" stroke="hsl(40, 10%, 85%)" strokeWidth="1" />
                      <line x1="40" y1="10" x2="40" y2="110" stroke="hsl(40, 10%, 85%)" strokeWidth="1" />
                      <line x1="100" y1="10" x2="100" y2="110" stroke="hsl(40, 10%, 85%)" strokeWidth="1" />
                      <line x1="160" y1="10" x2="160" y2="110" stroke="hsl(40, 10%, 85%)" strokeWidth="1" />
                      <line x1="20" y1="60" x2="180" y2="60" stroke="hsl(40, 10%, 85%)" strokeWidth="1" />
                      <line x1="20" y1="90" x2="180" y2="90" stroke="hsl(40, 10%, 85%)" strokeWidth="1" />
                      {/* Route */}
                      <path d="M 40 95 Q 70 60 100 55 Q 130 50 155 25" fill="none" stroke="hsl(0, 0%, 25%)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3" />
                      <circle cx="40" cy="95" r="5" fill="hsl(21, 92%, 47%)" />
                      <circle cx="155" cy="25" r="5" fill="hsl(21, 92%, 47%)" />
                      {/* Pin */}
                      <circle cx="155" cy="25" r="8" fill="none" stroke="hsl(21, 92%, 47%)" strokeWidth="1" opacity="0.4" />
                    </svg>
                  </div>

                  {/* Booking details card */}
                  <div className="rounded-xl p-3" style={{ background: "hsl(0 0% 13%)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-[6px]" style={{ color: "hsl(40 5% 59%)" }}>Booking Id:</p>
                        <p className="text-[9px] font-display font-bold" style={{ color: "hsl(37 25% 93%)" }}>T314315796</p>
                      </div>
                      <span className="text-[6px] font-medium px-2 py-0.5 rounded-full bg-brand text-white">Transit</span>
                    </div>

                    <div className="h-px w-full mb-2" style={{ background: "hsl(0 0% 20%)" }} />

                    <div className="grid grid-cols-2 gap-y-1.5 mb-2">
                      <div>
                        <p className="text-[5px]" style={{ color: "hsl(40 5% 59%)" }}>Created</p>
                        <p className="text-[7px] font-display font-medium" style={{ color: "hsl(37 25% 93%)" }}>18 Oct 2025</p>
                      </div>
                      <div>
                        <p className="text-[5px]" style={{ color: "hsl(40 5% 59%)" }}>Estimated</p>
                        <p className="text-[7px] font-display font-medium" style={{ color: "hsl(37 25% 93%)" }}>19 Oct 2025</p>
                      </div>
                      <div>
                        <p className="text-[5px]" style={{ color: "hsl(40 5% 59%)" }}>From</p>
                        <p className="text-[7px] font-display font-medium" style={{ color: "hsl(37 25% 93%)" }}>Nairobi</p>
                      </div>
                      <div>
                        <p className="text-[5px]" style={{ color: "hsl(40 5% 59%)" }}>To</p>
                        <p className="text-[7px] font-display font-medium" style={{ color: "hsl(37 25% 93%)" }}>Kampala</p>
                      </div>
                      <div>
                        <p className="text-[5px]" style={{ color: "hsl(40 5% 59%)" }}>Customer</p>
                        <p className="text-[7px] font-display font-medium" style={{ color: "hsl(37 25% 93%)" }}>Amina W.</p>
                      </div>
                      <div>
                        <p className="text-[5px]" style={{ color: "hsl(40 5% 59%)" }}>Order Cost</p>
                        <p className="text-[7px] font-display font-medium" style={{ color: "hsl(37 25% 93%)" }}>$45.00</p>
                      </div>
                      <div>
                        <p className="text-[5px]" style={{ color: "hsl(40 5% 59%)" }}>Quantity</p>
                        <p className="text-[7px] font-display font-medium" style={{ color: "hsl(37 25% 93%)" }}>1 Box</p>
                      </div>
                      <div>
                        <p className="text-[5px]" style={{ color: "hsl(40 5% 59%)" }}>Weight</p>
                        <p className="text-[7px] font-display font-medium" style={{ color: "hsl(37 25% 93%)" }}>5 Kg</p>
                      </div>
                    </div>

                    <div className="h-px w-full mb-2" style={{ background: "hsl(0 0% 20%)" }} />

                    {/* Courier */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center text-[8px] font-bold text-white">D</div>
                        <div>
                          <p className="text-[8px] font-display font-bold" style={{ color: "hsl(37 25% 93%)" }}>David K.</p>
                          <p className="text-[6px]" style={{ color: "hsl(40 5% 59%)" }}>Tryvo Rider</p>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center text-[8px]">📞</div>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px]" style={{ background: "hsl(0 0% 20%)" }}>💬</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrackingSection;

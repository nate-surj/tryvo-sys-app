import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Package, Truck, MapPin, ScanLine, Bell, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    num: "01",
    title: "Book & Drop",
    desc: "Sender arrives at any SACCO partner office with their parcel. The clerk enters details, calculates pricing, and generates a QR-coded tracking label — all in under 3 minutes.",
    icon: Package,
    details: ["Recipient name, phone & delivery address", "Auto-calculated pricing breakdown", "M-Pesa or cash payment", "QR code label generated instantly"],
  },
  {
    num: "02",
    title: "Mid-Mile Transit",
    desc: "The parcel travels on the existing intercity transport route — fast, affordable, and deeply trusted by communities. No new vehicles needed.",
    icon: Truck,
    details: ["Loaded onto next available vehicle", "ETA estimated from route schedule", "Zero operational change for SACCOs", "Leveraging existing infrastructure"],
  },
  {
    num: "03",
    title: "Arrival Scan",
    desc: "At the destination SACCO office, the clerk scans the QR code. This triggers automatic SMS notifications and alerts the dispatch system.",
    icon: ScanLine,
    details: ["QR scan updates parcel status", "SMS sent to recipient instantly", "Tryvo dispatch system alerted", "Batch scanning for efficiency"],
  },
  {
    num: "04",
    title: "Last-Mile Dispatch",
    desc: "Tryvo's algorithm identifies the nearest available rider based on proximity, rating, current load, and delivery direction efficiency.",
    icon: Bell,
    details: ["Smart rider matching algorithm", "60-second acceptance window", "Rider confirms pickup via QR scan", "Recipient gets rider details + ETA"],
  },
  {
    num: "05",
    title: "Doorstep Delivery",
    desc: "The rider navigates to the recipient's address, confirms delivery via SMS code or digital signature, and the loop is closed.",
    icon: MapPin,
    details: ["In-app navigation to address", "SMS confirmation code or e-signature", "Digital proof of delivery", "Instant confirmation to sender"],
  },
  {
    num: "06",
    title: "Confirmed & Complete",
    desc: "Everyone gets notified. Rider earnings update immediately. SACCO revenue share is calculated. The parcel journey is complete.",
    icon: CheckCircle,
    details: ["Sender receives final confirmation", "Rider earnings updated instantly", "SACCO revenue share calculated", "Full audit trail preserved"],
  },
];

const HowItWorksPage = () => {
  return (
    <main className="overflow-x-hidden">
      <Navbar />

      <section className="section-dark pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="label-caps">The Process</span>
            <h1 className="heading-lg mt-4 max-w-3xl">
              From station to doorstep,
              <br />
              <span className="text-brand">seamlessly.</span>
            </h1>
            <p className="body-lg mt-6 max-w-2xl" style={{ color: "hsl(40, 5%, 59%)" }}>
              Tryvo connects Africa's intercity transport networks with vetted last-mile riders.
              Here's the full journey of every parcel.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-light py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="grid md:grid-cols-[auto_1fr] gap-8 items-start"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl md:text-5xl font-display font-black text-brand opacity-60">{step.num}</span>
                    <Icon className="w-6 h-6 text-brand" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="heading-md mb-3">{step.title}</h3>
                    <p className="body-md mb-4" style={{ color: "hsl(0, 0%, 10%, 0.7)" }}>{step.desc}</p>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {step.details.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-orange py-20 md:py-24">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl text-center">
          <h2 className="heading-md" style={{ color: "hsl(0, 0%, 10%)" }}>Ready to send your first parcel?</h2>
          <p className="text-lg font-display font-medium mt-3 mb-8" style={{ color: "hsl(0, 0%, 10%, 0.7)" }}>
            Three steps. Zero confusion.
          </p>
          <Link to="/get-started" className="btn-dark text-base">Start Sending</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default HowItWorksPage;

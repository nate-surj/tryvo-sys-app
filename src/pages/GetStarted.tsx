import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Briefcase, Bus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const userTypes = [
  {
    icon: User,
    title: "I want to send a parcel",
    desc: "Individual sender — book a delivery from any Tryvo partner office.",
    action: "Start Sending",
  },
  {
    icon: Briefcase,
    title: "I'm a business",
    desc: "Get reliable inter-city delivery for stock, documents, and critical parts.",
    action: "Business Account",
  },
  {
    icon: Bus,
    title: "I'm a transport operator",
    desc: "Monetize your existing routes with Tryvo's technology platform.",
    action: "Become a Partner",
  },
];

const GetStarted = () => {
  const [selectedType, setSelectedType] = useState<number | null>(null);

  return (
    <main className="overflow-x-hidden">
      <Navbar />

      <section className="section-dark pt-32 pb-20 md:pt-40 md:pb-28 min-h-screen">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="label-caps">Get Started</span>
            <h1 className="heading-lg mt-4">
              How can <span className="text-brand">Tryvo</span> help you?
            </h1>
            <p className="body-lg mt-4" style={{ color: "hsl(40, 5%, 59%)" }}>
              Choose your path to get started.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {userTypes.map((type, i) => {
              const Icon = type.icon;
              const isSelected = selectedType === i;
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => setSelectedType(i)}
                  className={`card-dark rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                    isSelected ? "ring-2 ring-primary" : ""
                  }`}
                  style={isSelected ? { borderTop: "2px solid hsl(21, 92%, 47%)" } : {}}
                >
                  <Icon className="w-8 h-8 text-brand mb-6" strokeWidth={1.5} />
                  <h3 className="text-lg font-display font-bold mb-3">{type.title}</h3>
                  <p className="body-md text-sm mb-6" style={{ color: "hsl(40, 5%, 59%)" }}>
                    {type.desc}
                  </p>
                  <span className="text-brand font-display font-medium text-sm inline-flex items-center gap-1">
                    {type.action} <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.div>
              );
            })}
          </div>

          {selectedType !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-lg mx-auto mt-12"
            >
              <div className="card-dark rounded-2xl p-8">
                <h3 className="text-lg font-display font-bold mb-4">
                  {selectedType === 2 ? "Partner Registration" : "Create Your Account"}
                </h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="text-xs font-display font-medium mb-1.5 block" style={{ color: "hsl(40, 5%, 59%)" }}>Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full rounded-xl px-4 py-3 text-sm font-body"
                      style={{ background: "hsl(0 0% 13%)", border: "1px solid hsl(0 0% 20%)", color: "hsl(37, 25%, 93%)" }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-display font-medium mb-1.5 block" style={{ color: "hsl(40, 5%, 59%)" }}>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+254 7XX XXX XXX"
                      className="w-full rounded-xl px-4 py-3 text-sm font-body"
                      style={{ background: "hsl(0 0% 13%)", border: "1px solid hsl(0 0% 20%)", color: "hsl(37, 25%, 93%)" }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-display font-medium mb-1.5 block" style={{ color: "hsl(40, 5%, 59%)" }}>Email (optional)</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl px-4 py-3 text-sm font-body"
                      style={{ background: "hsl(0 0% 13%)", border: "1px solid hsl(0 0% 20%)", color: "hsl(37, 25%, 93%)" }}
                    />
                  </div>
                  {selectedType === 2 && (
                    <div>
                      <label className="text-xs font-display font-medium mb-1.5 block" style={{ color: "hsl(40, 5%, 59%)" }}>SACCO / Company Name</label>
                      <input
                        type="text"
                        placeholder="Enter your organization name"
                        className="w-full rounded-xl px-4 py-3 text-sm font-body"
                        style={{ background: "hsl(0 0% 13%)", border: "1px solid hsl(0 0% 20%)", color: "hsl(37, 25%, 93%)" }}
                      />
                    </div>
                  )}
                  <button type="submit" className="btn-primary w-full text-base mt-2">
                    {userTypes[selectedType].action}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-sm" style={{ color: "hsl(40, 5%, 59%)" }}>
              Already have a parcel?{" "}
              <Link to="/track" className="text-brand font-medium hover:underline">
                Track it here →
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default GetStarted;

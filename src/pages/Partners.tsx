import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bus, TrendingUp, Shield, Smartphone, Users, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  { icon: TrendingUp, title: "New Revenue", desc: "Earn from every last-mile delivery on your routes — with zero new vehicles or staff." },
  { icon: Smartphone, title: "Simple Tech", desc: "Our clerk portal works on any tablet or browser. Training takes 30 minutes." },
  { icon: Shield, title: "Fewer Disputes", desc: "Digital tracking and proof of delivery eliminate the chaos of paper-based parcels." },
  { icon: BarChart3, title: "Full Visibility", desc: "Real-time data on parcel volumes, revenue, and performance across all your offices." },
  { icon: Users, title: "Trusted Riders", desc: "Tryvo's vetted rider network handles last-mile — you focus on what you do best." },
  { icon: Bus, title: "Zero Change", desc: "No operational changes to your transport service. Tryvo sits on top of what already works." },
];

const stats = [
  { value: "1,200+", label: "Transport Partners" },
  { value: "50+", label: "Cities Active" },
  { value: "0", label: "New Vehicles Needed" },
  { value: "24hrs", label: "Average Onboarding" },
];

const Partners = () => {
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
            <span className="label-caps">Partners</span>
            <h1 className="heading-lg mt-4 max-w-3xl">
              Your routes. Your revenue.
              <br />
              <span className="text-brand">Our technology.</span>
            </h1>
            <p className="body-lg mt-6 max-w-2xl" style={{ color: "hsl(40, 5%, 59%)" }}>
              Tryvo partners with SACCOs and transport operators to turn existing
              intercity routes into a formal, trackable parcel delivery service —
              creating new revenue with zero capital investment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-light py-16 md:py-20">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-black text-brand">{s.value}</div>
                <p className="body-md mt-1 text-sm font-display font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-dark py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="label-caps">Why Partner With Us</span>
            <h2 className="heading-lg mt-4">Everything to gain. Nothing to lose.</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="card-dark rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
                  style={{ borderTop: "2px solid hsl(21, 92%, 47%)" }}
                >
                  <Icon className="w-7 h-7 text-brand mb-5" strokeWidth={1.5} />
                  <h3 className="text-lg font-display font-bold mb-2">{b.title}</h3>
                  <p className="body-md text-sm" style={{ color: "hsl(40, 5%, 59%)" }}>{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works for partners */}
      <section className="section-light py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="label-caps">Getting Started</span>
            <h2 className="heading-lg mt-4">Onboard in 24 hours.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Sign Up", desc: "Share your SACCO details and active routes. We handle the rest." },
              { num: "02", title: "Train", desc: "30-minute clerk training on the Tryvo portal. It's that simple." },
              { num: "03", title: "Earn", desc: "Start earning from every parcel that moves on your routes." },
            ].map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <span className="text-4xl font-display font-black text-brand opacity-60">{s.num}</span>
                <h3 className="text-lg font-display font-bold mt-3 mb-2">{s.title}</h3>
                <p className="body-md text-sm" style={{ color: "hsl(0, 0%, 10%, 0.7)" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-orange py-20 md:py-24">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl text-center">
          <h2 className="heading-md" style={{ color: "hsl(0, 0%, 10%)" }}>Ready to partner with Tryvo?</h2>
          <p className="text-lg font-display font-medium mt-3 mb-8" style={{ color: "hsl(0, 0%, 10%, 0.7)" }}>
            Zero investment. Immediate revenue.
          </p>
          <Link to="/get-started" className="btn-dark text-base">Become a Partner</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Partners;

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Briefcase, Bus, Package, MapPin, Shield, BarChart3, Smartphone, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const solutions = [
  {
    icon: User,
    title: "For Individuals",
    headline: "Send parcels to anyone, anywhere.",
    desc: "Whether you're a social commerce entrepreneur shipping handmade goods or a family member sending care packages across cities — Tryvo makes it simple, trackable, and affordable.",
    features: [
      { icon: Package, text: "Book in under 3 minutes at any partner office" },
      { icon: MapPin, text: "Real-time tracking from station to doorstep" },
      { icon: Shield, text: "SMS updates at every milestone — no app needed" },
      { icon: Clock, text: "Same-day or next-day delivery guaranteed" },
    ],
  },
  {
    icon: Briefcase,
    title: "For Businesses",
    headline: "Reliable inter-city delivery at scale.",
    desc: "SMEs and growing businesses need consistent, affordable delivery to compete. Tryvo gives you a professional logistics partner without the enterprise price tag.",
    features: [
      { icon: BarChart3, text: "Business accounts with bulk booking & invoicing" },
      { icon: Smartphone, text: "API access for e-commerce integration" },
      { icon: Shield, text: "Insurance options for high-value goods" },
      { icon: Clock, text: "Cash on Delivery for your customers" },
    ],
  },
  {
    icon: Bus,
    title: "For Transport Operators",
    headline: "Monetize your routes. Zero investment.",
    desc: "Your SACCOs already move millions of parcels. Tryvo turns that informal parcel business into a formal, trackable, revenue-generating service — with zero new vehicles or staff.",
    features: [
      { icon: BarChart3, text: "New revenue stream from existing operations" },
      { icon: Smartphone, text: "Simple clerk portal — works on any device" },
      { icon: Shield, text: "Reduced disputes with digital tracking" },
      { icon: Clock, text: "Real-time data on your parcel business" },
    ],
  },
];

const Solutions = () => {
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
            <span className="label-caps">Solutions</span>
            <h1 className="heading-lg mt-4 max-w-3xl">
              Built for the way
              <br />
              <span className="text-brand">Africa moves.</span>
            </h1>
            <p className="body-lg mt-6 max-w-2xl" style={{ color: "hsl(40, 5%, 59%)" }}>
              Whether you're an individual sending a package, a business scaling operations,
              or a transport operator looking for new revenue — Tryvo has you covered.
            </p>
          </motion.div>
        </div>
      </section>

      {solutions.map((sol, i) => {
        const Icon = sol.icon;
        const isLight = i % 2 === 0;
        return (
          <section key={sol.title} className={`${isLight ? "section-light" : "section-dark"} py-20 md:py-28`}>
            <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-12 md:gap-20 items-start"
              >
                <div>
                  <Icon className="w-10 h-10 text-brand mb-6" strokeWidth={1.5} />
                  <h2 className="heading-md mb-4">{sol.headline}</h2>
                  <p className="body-lg" style={{ color: isLight ? "hsl(0, 0%, 10%, 0.7)" : "hsl(40, 5%, 59%)" }}>
                    {sol.desc}
                  </p>
                  <Link
                    to="/get-started"
                    className={`${isLight ? "btn-primary" : "btn-primary"} text-base mt-8 inline-flex`}
                  >
                    Get Started
                  </Link>
                </div>
                <div className="grid gap-4">
                  {sol.features.map((f) => {
                    const FIcon = f.icon;
                    return (
                      <div
                        key={f.text}
                        className={`${isLight ? "card-light" : "card-dark"} rounded-xl p-5 flex items-start gap-4 transition-all duration-300 hover:-translate-y-0.5`}
                      >
                        <FIcon className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="body-md text-sm">{f.text}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="section-orange py-20 md:py-24">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl text-center">
          <h2 className="heading-md" style={{ color: "hsl(0, 0%, 10%)" }}>Find the right solution for you.</h2>
          <p className="text-lg font-display font-medium mt-3 mb-8" style={{ color: "hsl(0, 0%, 10%, 0.7)" }}>
            Whether you send one parcel or a thousand.
          </p>
          <Link to="/get-started" className="btn-dark text-base">Start Sending</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Solutions;

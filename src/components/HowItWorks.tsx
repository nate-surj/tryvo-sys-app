import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Package, Truck, MapPin } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Drop",
    desc: "Leave your parcel at any Tryvo partner transport office",
    icon: Package,
  },
  {
    num: "02",
    title: "Ride",
    desc: "It travels the intercity route — fast, existing, affordable",
    icon: Truck,
  },
  {
    num: "03",
    title: "Arrive",
    desc: "A Tryvo rider delivers it door-to-door on the other end",
    icon: MapPin,
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="section-dark py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="label-caps">The Process</span>
          <h2 className="heading-lg mt-4">
            Three steps. <span className="text-brand">Zero confusion.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-16 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-px -translate-y-1/2" style={{ background: "hsl(0 0% 100% / 0.08)" }} />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="card-dark rounded-2xl p-6 md:p-8 relative group cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl md:text-4xl font-display font-black text-brand opacity-60">
                    {step.num}
                  </span>
                  <Icon className="w-5 h-5 md:w-6 md:h-6 opacity-40" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg md:text-xl font-display font-bold mb-3">{step.title}</h3>
                <p className="body-md text-sm md:text-base" style={{ color: "hsl(40, 5%, 59%)" }}>
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

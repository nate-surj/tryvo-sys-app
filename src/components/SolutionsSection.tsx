import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User, Briefcase, Bus } from "lucide-react";
import { Link } from "react-router-dom";

const solutions = [
  {
    icon: User,
    title: "For Individuals",
    desc: "Send parcels to anyone, anywhere, without leaving your neighbourhood",
  },
  {
    icon: Briefcase,
    title: "For Businesses",
    desc: "Reliable inter-city delivery for stock, documents, and critical parts",
  },
  {
    icon: Bus,
    title: "For Transport Operators",
    desc: "Monetize your existing routes with zero new vehicles or staff",
  },
];

const SolutionsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="solutions" className="section-dark py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="label-caps">Solutions</span>
          <h2 className="heading-lg mt-4">
            Built for the way <span className="text-brand">Africa moves.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
          {solutions.map((sol, i) => {
            const Icon = sol.icon;
            return (
              <motion.div
                key={sol.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                className="card-dark rounded-2xl p-6 md:p-8 relative overflow-hidden group cursor-default transition-all duration-300 hover:-translate-y-1"
                style={{ borderTop: "2px solid hsl(21, 92%, 47%)" }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at top, hsl(21 92% 47% / 0.05), transparent 70%)" }} />

                <Icon className="w-7 h-7 md:w-8 md:h-8 text-brand mb-6" strokeWidth={1.5} />
                <h3 className="text-lg md:text-xl font-display font-bold mb-3">{sol.title}</h3>
                <p className="body-md text-sm md:text-base mb-6" style={{ color: "hsl(40, 5%, 59%)" }}>
                  {sol.desc}
                </p>
                <Link to="/solutions" className="text-brand font-display font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                  Learn more <span>→</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;

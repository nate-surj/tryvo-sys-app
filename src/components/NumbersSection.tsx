import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import useCountUp from "@/hooks/useCountUp";

const stats = [
  { value: 50, suffix: "+", label: "Cities Active" },
  { value: 1200, suffix: "+", label: "Transport Partners" },
  { value: 100, suffix: "%", label: "Real-Time Tracking" },
  { value: 100, suffix: "%", label: "Door-to-Door Guaranteed" },
];

const StatItem = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="heading-xl text-brand">
        {count}
        <span>{suffix}</span>
      </div>
      <p className="body-md mt-2 font-display font-medium">{label}</p>
    </div>
  );
};

const NumbersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-light py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8"
        >
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16 body-md"
          style={{ color: "hsl(40, 5%, 59%)" }}
        >
          Built on the transport infrastructure Africa already runs on.
        </motion.p>
      </div>
    </section>
  );
};

export default NumbersSection;

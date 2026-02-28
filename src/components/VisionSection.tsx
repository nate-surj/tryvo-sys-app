import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CityMarquee from "./CityMarquee";

const VisionSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-dark noise-overlay py-24 md:py-40 relative overflow-hidden" ref={ref}>
      {/* Orange ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, hsl(21 92% 47% / 0.12), transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 lg:px-16 max-w-6xl text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="heading-lg max-w-3xl mx-auto"
        >
          East Africa first.
          <br />
          <span className="text-brand">The continent next.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="body-lg mt-6 max-w-2xl mx-auto"
          style={{ color: "hsl(40, 5%, 59%)" }}
        >
          We're laying the infrastructure for how goods move across Africa — one
          city, one partnership, one delivery at a time.
        </motion.p>
      </div>

      <div className="mt-16 relative z-10">
        <CityMarquee large />
      </div>
    </section>
  );
};

export default VisionSection;

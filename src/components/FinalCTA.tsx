import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cta" className="section-orange py-24 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Geometric pattern */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 60" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <path d="M 0 0 L 60 60" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-16 max-w-6xl text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="heading-lg"
          style={{ color: "hsl(0, 0%, 10%)" }}
        >
          Something needs to move?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl font-display font-medium mt-4 mb-10"
          style={{ color: "hsl(0, 0%, 10%, 0.7)" }}
        >
          Tryvo's got it.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/get-started" className="btn-dark text-base">
            Send Your First Parcel
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;

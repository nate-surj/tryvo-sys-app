import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const ProblemSolution = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-light py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="heading-lg">
              The bus stops.
              <br />
              <span className="text-brand">We don't.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="body-lg" style={{ color: "hsl(0, 0%, 10%, 0.7)" }}>
              Intercity transport networks already move goods fast and cheap.
              But they stop at the station. Tryvo picks up where they leave off
              — connecting the station to the door with a vetted last-mile
              rider, every time.
            </p>
          </motion.div>
        </div>

        {/* Route Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20"
        >
          <div className="flex items-center justify-between max-w-4xl mx-auto relative">
            {/* Connection line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-brand rounded-full" />

            {["Station A", "Intercity Bus", "Station B", "Tryvo Rider", "Door"].map(
              (label, i) => (
                <div key={label} className="relative z-10 flex flex-col items-center gap-2">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-display font-bold ${
                      i === 3
                        ? "bg-brand text-white"
                        : "bg-white border-2 shadow-sm"
                    }`}
                    style={i !== 3 ? { borderColor: "hsl(21, 92%, 47%)" } : {}}
                  >
                    {i === 3 ? "T" : i === 4 ? "🏠" : "→"}
                  </div>
                  <span className="text-[10px] sm:text-xs font-display font-medium text-center leading-tight max-w-[60px] sm:max-w-[70px]">
                    {label}
                  </span>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;

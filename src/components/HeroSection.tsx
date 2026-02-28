import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NetworkAnimation from "./NetworkAnimation";
import CityMarquee from "./CityMarquee";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center section-dark overflow-hidden">
      <NetworkAnimation />

      <div className="relative z-10 container mx-auto px-6 lg:px-16 max-w-6xl pt-24 pb-16 flex-1 flex flex-col justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="heading-xl max-w-5xl"
        >
          Every city.
          <br />
          Every door.
          <br />
          <span className="text-brand">One platform.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="body-lg mt-6 max-w-xl"
          style={{ color: "hsl(40, 5%, 59%)" }}
        >
          Tryvo moves parcels from intercity transport hubs straight to
          doorsteps — across Africa, seamlessly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <Link to="/get-started" className="btn-primary text-base">
            Start Sending
          </Link>
          <Link to="/how-it-works" className="btn-ghost text-base">
            How It Works
          </Link>
        </motion.div>
      </div>

      {/* Frosted divider + marquee */}
      <div className="relative z-10">
        <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(0 0% 100% / 0.1), transparent)" }} />
        <div className="py-4">
          <CityMarquee />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

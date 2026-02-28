import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote: "I used to send products with random drivers and pray. With Tryvo, I just drop, track, and my customers get their orders the same day.",
    name: "Amina W.",
    role: "Small business owner",
    city: "Nairobi",
  },
  {
    quote: "We were already running the buses. Tryvo gave us a new revenue stream without buying a single extra vehicle. It's brilliant.",
    name: "Emmanuel O.",
    role: "Transport operator",
    city: "Kampala",
  },
  {
    quote: "My sister sent me a package from Kigali. I got a text when it arrived at the station and another when the rider was at my door. Wild.",
    name: "Fatou D.",
    role: "Recipient",
    city: "Dar es Salaam",
  },
];

const SocialProof = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-light py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg">
            Heard from the people <span className="text-brand">who use it.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="card-light rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="body-md mb-8 leading-relaxed" style={{ color: "hsl(0 0% 10% / 0.8)" }}>
                "{t.quote}"
              </p>
              <div>
                <p className="font-display font-bold text-sm">{t.name}</p>
                <p className="text-xs" style={{ color: "hsl(40, 5%, 59%)" }}>
                  {t.role} · {t.city}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

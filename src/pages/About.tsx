import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CityMarquee from "@/components/CityMarquee";
import { Link } from "react-router-dom";

const milestones = [
  { year: "2024", text: "Tryvo founded — the idea born from watching parcels pile up at SACCO offices" },
  { year: "2025", text: "Pilot launch on Nairobi ↔ Nakuru and Nairobi ↔ Nyeri routes" },
  { year: "2025", text: "First 1,200+ transport partners onboarded across East Africa" },
  { year: "2026", text: "Expansion into Uganda, Tanzania, and Rwanda" },
];

const values = [
  { title: "Movement", desc: "We believe in forward motion — in parcels, in business, in people's lives." },
  { title: "Trust", desc: "Every delivery is a promise. We keep it, every time." },
  { title: "Simplicity", desc: "Complexity is the enemy. Three steps, zero confusion." },
  { title: "Africa-first", desc: "Built on the continent's existing strengths, not imported solutions." },
];

const team = [
  { name: "Product & Engineering", desc: "Building the technology layer Africa's logistics needs." },
  { name: "Operations", desc: "On the ground in every city, ensuring every parcel moves." },
  { name: "Partnerships", desc: "Working with SACCOs and transport operators to grow together." },
];

const About = () => {
  return (
    <main className="overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="section-dark pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="label-caps">About Tryvo</span>
            <h1 className="heading-lg mt-4 max-w-3xl">
              We're building the logistics
              <br />
              <span className="text-brand">infrastructure of Africa.</span>
            </h1>
            <p className="body-lg mt-6 max-w-2xl" style={{ color: "hsl(40, 5%, 59%)" }}>
              Tryvo is a technology platform that solves the last-mile delivery problem
              in Africa by integrating with the continent's existing intercity transport
              networks — primarily SACCOs, bus cooperatives, and matatu operators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-light py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="label-caps">Mission</span>
              <h2 className="heading-md mt-4 mb-4">
                Making moving things across Africa as simple as sending a message.
              </h2>
              <p className="body-md" style={{ color: "hsl(0, 0%, 10%, 0.7)" }}>
                Africa already has a fast, affordable, high-frequency intercity transport
                network. It simply has no technology layer to convert that network into a
                reliable, trackable, door-to-door delivery system. Tryvo is that layer.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="label-caps">Vision</span>
              <h2 className="heading-md mt-4 mb-4">
                The backbone that powers commerce across the continent.
              </h2>
              <p className="body-md" style={{ color: "hsl(0, 0%, 10%, 0.7)" }}>
                To become the logistics infrastructure layer of Africa — the backbone
                that powers commerce, healthcare, agriculture, and everyday life across
                the continent.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-dark py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-caps">Our Values</span>
            <h2 className="heading-lg mt-4">What drives us.</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 mt-12">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-dark rounded-2xl p-8"
              >
                <h3 className="text-lg font-display font-bold text-brand mb-2">{v.title}</h3>
                <p className="body-md text-sm" style={{ color: "hsl(40, 5%, 59%)" }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-light py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="label-caps">Our Journey</span>
            <h2 className="heading-lg mt-4">From idea to infrastructure.</h2>
          </motion.div>

          <div className="space-y-6 max-w-2xl">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-6"
              >
                <span className="text-2xl font-display font-black text-brand flex-shrink-0 w-16">{m.year}</span>
                <p className="body-md" style={{ color: "hsl(0, 0%, 10%, 0.7)" }}>{m.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-dark py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-caps">The Team</span>
            <h2 className="heading-lg mt-4 mb-12">People behind the movement.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {team.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-dark rounded-2xl p-8"
              >
                <h3 className="text-lg font-display font-bold mb-2">{t.name}</h3>
                <p className="body-md text-sm" style={{ color: "hsl(40, 5%, 59%)" }}>{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-orange py-20 md:py-24">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl text-center">
          <h2 className="heading-md" style={{ color: "hsl(0, 0%, 10%)" }}>Want to join the team?</h2>
          <p className="text-lg font-display font-medium mt-3 mb-8" style={{ color: "hsl(0, 0%, 10%, 0.7)" }}>
            We're always looking for bold thinkers.
          </p>
          <Link to="/get-started" className="btn-dark text-base">Get In Touch</Link>
        </div>
      </section>

      <div className="section-dark">
        <CityMarquee large />
      </div>

      <Footer />
    </main>
  );
};

export default About;

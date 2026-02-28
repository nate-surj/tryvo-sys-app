import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import TryvoLogo from "./TryvoLogo";

const navLinks = [
  { label: "How It Works", to: "/how-it-works" },
  { label: "Solutions", to: "/solutions" },
  { label: "Partners", to: "/partners" },
  { label: "About", to: "/about" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "frosted-glass shadow-lg shadow-black/10" : "bg-transparent"
        }`}
      >
        <Link to="/">
          <TryvoLogo className="h-7 w-auto" light />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`text-sm font-medium font-body transition-colors duration-200 ${
                location.pathname === link.to ? "text-brand" : ""
              }`}
              style={location.pathname !== link.to ? { color: "hsl(37, 25%, 93%)" } : {}}
              onMouseEnter={(e) => {
                if (location.pathname !== link.to) e.currentTarget.style.color = "hsl(21, 92%, 47%)";
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== link.to) e.currentTarget.style.color = "hsl(37, 25%, 93%)";
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/get-started" className="btn-primary text-sm hidden md:inline-flex">
            Get Started
          </Link>
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="w-6 h-0.5 rounded-full" style={{ backgroundColor: "hsl(37, 25%, 93%)" }} />
            <span className="w-6 h-0.5 rounded-full" style={{ backgroundColor: "hsl(37, 25%, 93%)" }} />
            <span className="w-4 h-0.5 rounded-full" style={{ backgroundColor: "hsl(37, 25%, 93%)" }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] section-dark flex flex-col items-center justify-center gap-8"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-3xl"
              style={{ color: "hsl(37, 25%, 93%)" }}
              aria-label="Close menu"
            >
              ×
            </button>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.to}
                  className="heading-md"
                  style={{ color: location.pathname === link.to ? "hsl(21, 92%, 47%)" : "hsl(37, 25%, 93%)" }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/track" className="btn-ghost text-lg">
                Track Parcel
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/get-started" className="btn-primary text-lg mt-2">
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

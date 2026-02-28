import { Link } from "react-router-dom";
import TryvoLogo from "./TryvoLogo";

const footerLinks = [
  { label: "How It Works", to: "/how-it-works" },
  { label: "Solutions", to: "/solutions" },
  { label: "Partners", to: "/partners" },
  { label: "About", to: "/about" },
  { label: "Track", to: "/track" },
];

const Footer = () => {
  return (
    <footer className="section-dark py-12">
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <Link to="/">
            <TryvoLogo className="h-6 w-auto" light />
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-body transition-colors duration-200"
                style={{ color: "hsl(40, 5%, 59%)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(37, 25%, 93%)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(40, 5%, 59%)")}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {["Twitter", "LinkedIn", "Instagram"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs font-body transition-colors duration-200"
                style={{ color: "hsl(40, 5%, 59%)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(21, 92%, 47%)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(40, 5%, 59%)")}
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        <div className="h-px w-full" style={{ background: "hsl(0 0% 100% / 0.06)" }} />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
          <p className="text-xs" style={{ color: "hsl(40, 5%, 59%)" }}>
            © 2025 Tryvo — Moving Africa forward.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs" style={{ color: "hsl(40, 5%, 59%)" }}>
              Privacy
            </a>
            <a href="#" className="text-xs" style={{ color: "hsl(40, 5%, 59%)" }}>
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

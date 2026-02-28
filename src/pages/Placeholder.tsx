import { useLocation, Link } from "react-router-dom";
import { AppShell } from "@/components/ds";
import { Construction, ArrowLeft } from "lucide-react";
import { TryvoButton } from "@/components/ds";

const sectionMeta: Record<string, { title: string; description: string }> = {
  "/send": { title: "Send a Parcel", description: "The booking flow is coming soon." },
  "/account": { title: "My Account", description: "Account management is coming soon." },
  "/rider": { title: "Rider App", description: "The rider experience is coming soon." },
  "/ops": { title: "Operations Dashboard", description: "The admin dashboard is coming soon." },
  "/partners/dashboard": { title: "Partner Portal", description: "The partner dashboard is coming soon." },
};

const Placeholder = () => {
  const { pathname } = useLocation();
  const prefix = Object.keys(sectionMeta).find((k) => pathname.startsWith(k)) || pathname;
  const meta = sectionMeta[prefix] || { title: "Coming Soon", description: "This page is under construction." };

  return (
    <AppShell variant="dark">
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-subtle">
          <Construction className="h-10 w-10 text-orange" />
        </div>
        <h1 className="text-heading text-white">{meta.title}</h1>
        <p className="mt-2 text-body-m text-white/50 max-w-md">{meta.description}</p>
        <p className="mt-1 text-caption text-white/30 font-mono">{pathname}</p>
        <Link to="/" className="mt-8">
          <TryvoButton variant="ghost-dark" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </TryvoButton>
        </Link>
      </div>
    </AppShell>
  );
};

export default Placeholder;

import {
  TryvoButton,
  TryvoInput,
  TryvoCard,
  StatusChip,
  SectionLabel,
  PageLoader,
  EmptyState,
  ConfirmDialog,
  AppShell,
} from "@/components/ds";
import type { ParcelStatus } from "@/components/ds";
import { Package, Search, AlertTriangle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const statuses: ParcelStatus[] = ["Booked", "In Transit", "Arrived", "Out for Delivery", "Delivered", "Issue"];

const DesignSystem = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [inputVal, setInputVal] = useState("");

  if (showLoader) {
    setTimeout(() => setShowLoader(false), 2000);
    return <PageLoader />;
  }

  return (
    <AppShell variant="dark">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Header */}
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <h1 className="text-display-m text-white">Design System</h1>
          <p className="text-body-l text-white/50 mt-2">Tryvo component library & design tokens</p>
        </div>

        {/* Typography */}
        <section className="space-y-6">
          <SectionLabel>Typography</SectionLabel>
          <div className="space-y-4">
            <p className="text-display-xl text-white">Display XL — Satoshi 900</p>
            <p className="text-display-l text-white">Display L — Satoshi 900</p>
            <p className="text-display-m text-white">Display M — Satoshi 700</p>
            <p className="text-heading text-white">Heading — Satoshi 700</p>
            <p className="text-subheading text-white">Subheading — Satoshi 500</p>
            <p className="text-body-l text-white/70">Body Large — General Sans 400</p>
            <p className="text-body-m text-white/70">Body Medium — General Sans 400</p>
            <p className="text-label text-orange">LABEL — GENERAL SANS 600</p>
            <p className="text-caption text-white/50">Caption — General Sans 400</p>
            <p className="font-mono text-2xl text-orange">TRV-4829-NKR — JetBrains Mono</p>
          </div>
        </section>

        {/* Colors */}
        <section className="space-y-6">
          <SectionLabel>Colors</SectionLabel>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {[
              { label: "Orange", cls: "bg-orange" },
              { label: "Orange Hover", cls: "bg-orange-hover" },
              { label: "Dark Base", cls: "bg-dark-base border border-white/10" },
              { label: "Dark Raised", cls: "bg-dark-raised border border-white/10" },
              { label: "Dark Card", cls: "bg-dark-card" },
              { label: "Light Base", cls: "bg-light-base" },
              { label: "Success", cls: "bg-success" },
              { label: "Warning", cls: "bg-warning" },
              { label: "Error", cls: "bg-error" },
              { label: "Info", cls: "bg-info" },
            ].map((c) => (
              <div key={c.label} className="space-y-1.5">
                <div className={`h-12 rounded-lg ${c.cls}`} />
                <p className="text-[11px] text-white/50">{c.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <SectionLabel>Buttons</SectionLabel>
          <div className="flex flex-wrap gap-4 items-center">
            <TryvoButton variant="primary" size="sm">Primary SM</TryvoButton>
            <TryvoButton variant="primary" size="md">Primary MD</TryvoButton>
            <TryvoButton variant="primary" size="lg">Primary LG</TryvoButton>
            <TryvoButton variant="primary" loading>Loading</TryvoButton>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <TryvoButton variant="ghost-dark">Ghost Dark</TryvoButton>
            <TryvoButton variant="ghost-orange">Ghost Orange</TryvoButton>
            <TryvoButton variant="ghost-light">Ghost Light</TryvoButton>
            <TryvoButton variant="destructive">Destructive</TryvoButton>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-6">
          <SectionLabel>Inputs</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            <TryvoInput label="Office Code" placeholder="e.g. 2NK-NBI-01" helper="Provided by SACCO manager" variant="dark" />
            <TryvoInput label="PIN" type="password" placeholder="••••••" variant="dark" />
            <TryvoInput label="With Error" placeholder="Type here" error="This field is required" variant="dark" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
            <TryvoInput label="Success" placeholder="Valid input" success variant="dark" value="Grace Achieng" readOnly />
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-6">
          <SectionLabel>Cards</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <TryvoCard variant="dark" className="p-6">
              <p className="text-subheading text-white">Dark Card</p>
              <p className="text-caption text-white/50 mt-1">Default dark variant</p>
            </TryvoCard>
            <TryvoCard variant="light" className="p-6">
              <p className="text-subheading text-dark-base">Light Card</p>
              <p className="text-caption text-dark-base/50 mt-1">Light variant</p>
            </TryvoCard>
            <TryvoCard variant="orange-accent" className="p-6">
              <p className="text-subheading text-white">Orange Accent</p>
              <p className="text-caption text-white/50 mt-1">With orange top border</p>
            </TryvoCard>
          </div>
        </section>

        {/* Status Chips */}
        <section className="space-y-6">
          <SectionLabel>Status Chips</SectionLabel>
          <div className="flex flex-wrap gap-3">
            {statuses.map((s) => (
              <StatusChip key={s} status={s} />
            ))}
          </div>
        </section>

        {/* Empty State */}
        <section className="space-y-6">
          <SectionLabel>Empty State</SectionLabel>
          <TryvoCard variant="dark" className="p-2">
            <EmptyState
              icon={Package}
              title="No parcels yet"
              description="Create your first booking to get started"
              ctaLabel="New Booking"
              onCta={() => {}}
            />
          </TryvoCard>
        </section>

        {/* Confirm Dialog */}
        <section className="space-y-6">
          <SectionLabel>Confirm Dialog</SectionLabel>
          <TryvoButton variant="ghost-orange" onClick={() => setShowConfirm(true)}>
            Open Confirm Dialog
          </TryvoButton>
          <ConfirmDialog
            open={showConfirm}
            onOpenChange={setShowConfirm}
            title="End your shift?"
            description="You will be logged out and your session data will be cleared."
            confirmLabel="End Shift"
            variant="destructive"
            onConfirm={() => setShowConfirm(false)}
          />
        </section>

        {/* Page Loader */}
        <section className="space-y-6">
          <SectionLabel>Page Loader</SectionLabel>
          <TryvoButton variant="ghost-orange" onClick={() => setShowLoader(true)}>
            Show Loader (2s)
          </TryvoButton>
        </section>
      </div>
    </AppShell>
  );
};

export default DesignSystem;

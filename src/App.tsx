import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { PageLoader } from "@/components/ds";

// Eagerly loaded pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy loaded pages
const About = lazy(() => import("./pages/About"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorksPage"));
const Solutions = lazy(() => import("./pages/Solutions"));
const Partners = lazy(() => import("./pages/Partners"));
const Track = lazy(() => import("./pages/Track"));
const GetStarted = lazy(() => import("./pages/GetStarted"));
const DesignSystem = lazy(() => import("./pages/DesignSystem"));

// Clerk Portal
const ClerkLogin = lazy(() => import("./pages/clerk/ClerkLogin"));
const ClerkLayout = lazy(() => import("./components/clerk/ClerkLayout"));
const ClerkDashboard = lazy(() => import("./pages/clerk/ClerkDashboard"));
const ClerkNewBooking = lazy(() => import("./pages/clerk/ClerkNewBooking"));
const ClerkScan = lazy(() => import("./pages/clerk/ClerkScan"));
const ClerkParcels = lazy(() => import("./pages/clerk/ClerkParcels"));
const ClerkIssues = lazy(() => import("./pages/clerk/ClerkIssues"));
const ClerkPayments = lazy(() => import("./pages/clerk/ClerkPayments"));

// Placeholder for future routes
const Placeholder = lazy(() => import("./pages/Placeholder"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/track" element={<Track />} />
            <Route path="/track/:trackingId" element={<Track />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/design-system" element={<DesignSystem />} />

            {/* Sender Booking Flow */}
            <Route path="/send" element={<Placeholder />} />
            <Route path="/send/route" element={<Placeholder />} />
            <Route path="/send/parcel" element={<Placeholder />} />
            <Route path="/send/recipient" element={<Placeholder />} />
            <Route path="/send/verify" element={<Placeholder />} />
            <Route path="/send/payment" element={<Placeholder />} />
            <Route path="/send/confirmation/:trackingId" element={<Placeholder />} />

            {/* Sender Account */}
            <Route path="/account" element={<Placeholder />} />
            <Route path="/account/history" element={<Placeholder />} />
            <Route path="/account/recipients" element={<Placeholder />} />
            <Route path="/account/settings" element={<Placeholder />} />

            {/* Clerk Portal */}
            <Route path="/clerk/login" element={<ClerkLogin />} />
            <Route path="/clerk" element={<ClerkLayout />}>
              <Route path="dashboard" element={<ClerkDashboard />} />
              <Route path="new-booking" element={<ClerkNewBooking />} />
              <Route path="scan" element={<ClerkScan />} />
              <Route path="parcels" element={<ClerkParcels />} />
              <Route path="issues" element={<ClerkIssues />} />
              <Route path="payments" element={<ClerkPayments />} />
            </Route>

            {/* Rider App */}
            <Route path="/rider" element={<Placeholder />} />
            <Route path="/rider/onboarding" element={<Placeholder />} />
            <Route path="/rider/home" element={<Placeholder />} />
            <Route path="/rider/delivery/:id" element={<Placeholder />} />
            <Route path="/rider/earnings" element={<Placeholder />} />
            <Route path="/rider/profile" element={<Placeholder />} />

            {/* Ops Admin */}
            <Route path="/ops" element={<Placeholder />} />
            <Route path="/ops/dashboard" element={<Placeholder />} />
            <Route path="/ops/map" element={<Placeholder />} />
            <Route path="/ops/parcels" element={<Placeholder />} />
            <Route path="/ops/riders" element={<Placeholder />} />
            <Route path="/ops/saccos" element={<Placeholder />} />
            <Route path="/ops/revenue" element={<Placeholder />} />
            <Route path="/ops/issues" element={<Placeholder />} />

            {/* Partner Portal */}
            <Route path="/partners/dashboard" element={<Placeholder />} />
            <Route path="/partners/routes" element={<Placeholder />} />
            <Route path="/partners/offices" element={<Placeholder />} />
            <Route path="/partners/reports" element={<Placeholder />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

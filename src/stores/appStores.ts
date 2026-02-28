import { create } from "zustand";

interface AuthUser {
  id: string;
  name: string;
  role: "sender" | "clerk" | "rider" | "admin";
  token: string;
  meta?: Record<string, unknown>;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

// ── Booking Store ──
interface BookingStep {
  route?: { originCity: string; destinationCity: string };
  parcel?: { size: string; category: string; declaredValue?: number; insured: boolean };
  recipient?: { name: string; phone: string; address: string; landmark?: string };
  payment?: { method: string; completed: boolean; ref?: string };
}

interface BookingState {
  currentBooking: BookingStep;
  setRoute: (route: BookingStep["route"]) => void;
  setParcel: (parcel: BookingStep["parcel"]) => void;
  setRecipient: (recipient: BookingStep["recipient"]) => void;
  setPayment: (payment: BookingStep["payment"]) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  currentBooking: {},
  setRoute: (route) => set((s) => ({ currentBooking: { ...s.currentBooking, route } })),
  setParcel: (parcel) => set((s) => ({ currentBooking: { ...s.currentBooking, parcel } })),
  setRecipient: (recipient) => set((s) => ({ currentBooking: { ...s.currentBooking, recipient } })),
  setPayment: (payment) => set((s) => ({ currentBooking: { ...s.currentBooking, payment } })),
  reset: () => set({ currentBooking: {} }),
}));

// ── Tracking Store ──
interface TrackingState {
  trackingId: string | null;
  parcelData: unknown | null;
  isPolling: boolean;
  setTrackingId: (id: string) => void;
  setParcelData: (data: unknown) => void;
  setPolling: (v: boolean) => void;
  clear: () => void;
}

export const useTrackingStore = create<TrackingState>((set) => ({
  trackingId: null,
  parcelData: null,
  isPolling: false,
  setTrackingId: (id) => set({ trackingId: id }),
  setParcelData: (data) => set({ parcelData: data }),
  setPolling: (v) => set({ isPolling: v }),
  clear: () => set({ trackingId: null, parcelData: null, isPolling: false }),
}));

// ── Notification Store ──
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  add: (n: Omit<Notification, "id" | "read" | "createdAt">) => void;
  markRead: (id: string) => void;
  clearAll: () => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  add: (n) =>
    set((s) => ({
      notifications: [
        { ...n, id: `notif-${Date.now()}`, read: false, createdAt: new Date().toISOString() },
        ...s.notifications,
      ],
    })),
  markRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  clearAll: () => set({ notifications: [] }),
  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));

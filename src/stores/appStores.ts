import { useSyncExternalStore, useCallback } from "react";

// ── Tiny store utility (replaces zustand) ──
function createStore<T>(initialState: T) {
  let state = initialState;
  const listeners = new Set<() => void>();

  const getState = () => state;
  const setState = (partial: Partial<T> | ((prev: T) => Partial<T>)) => {
    const next = typeof partial === "function" ? partial(state) : partial;
    state = { ...state, ...next };
    listeners.forEach((l) => l());
  };
  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  function useStore(): T;
  function useStore<U>(selector: (s: T) => U): U;
  function useStore<U>(selector?: (s: T) => U) {
    const sel = selector ?? ((s: T) => s as unknown as U);
    return useSyncExternalStore(subscribe, () => sel(getState()));
  }

  return { getState, setState, subscribe, useStore };
}

// ── Auth Store ──
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
}

const authStore = createStore<AuthState>({ user: null, isAuthenticated: false });

export function useAuthStore() {
  const state = authStore.useStore();
  const login = useCallback(
    (user: AuthUser) => authStore.setState({ user, isAuthenticated: true }),
    []
  );
  const logout = useCallback(
    () => authStore.setState({ user: null, isAuthenticated: false }),
    []
  );
  return { ...state, login, logout };
}

// ── Booking Store ──
interface BookingStep {
  route?: { originCity: string; destinationCity: string };
  parcel?: { size: string; category: string; declaredValue?: number; insured: boolean };
  recipient?: { name: string; phone: string; address: string; landmark?: string };
  payment?: { method: string; completed: boolean; ref?: string };
}

interface BookingState {
  currentBooking: BookingStep;
}

const bookingStore = createStore<BookingState>({ currentBooking: {} });

export function useBookingStore() {
  const state = bookingStore.useStore();
  const setRoute = useCallback(
    (route: BookingStep["route"]) =>
      bookingStore.setState((s) => ({ currentBooking: { ...s.currentBooking, route } })),
    []
  );
  const setParcel = useCallback(
    (parcel: BookingStep["parcel"]) =>
      bookingStore.setState((s) => ({ currentBooking: { ...s.currentBooking, parcel } })),
    []
  );
  const setRecipient = useCallback(
    (recipient: BookingStep["recipient"]) =>
      bookingStore.setState((s) => ({ currentBooking: { ...s.currentBooking, recipient } })),
    []
  );
  const setPayment = useCallback(
    (payment: BookingStep["payment"]) =>
      bookingStore.setState((s) => ({ currentBooking: { ...s.currentBooking, payment } })),
    []
  );
  const reset = useCallback(() => bookingStore.setState({ currentBooking: {} }), []);
  return { ...state, setRoute, setParcel, setRecipient, setPayment, reset };
}

// ── Tracking Store ──
interface TrackingState {
  trackingId: string | null;
  parcelData: unknown | null;
  isPolling: boolean;
}

const trackingStore = createStore<TrackingState>({
  trackingId: null,
  parcelData: null,
  isPolling: false,
});

export function useTrackingStore() {
  const state = trackingStore.useStore();
  const setTrackingId = useCallback(
    (id: string) => trackingStore.setState({ trackingId: id }),
    []
  );
  const setParcelData = useCallback(
    (data: unknown) => trackingStore.setState({ parcelData: data }),
    []
  );
  const setPolling = useCallback(
    (v: boolean) => trackingStore.setState({ isPolling: v }),
    []
  );
  const clear = useCallback(
    () => trackingStore.setState({ trackingId: null, parcelData: null, isPolling: false }),
    []
  );
  return { ...state, setTrackingId, setParcelData, setPolling, clear };
}

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
}

const notificationStore = createStore<NotificationState>({ notifications: [] });

export function useNotificationStore() {
  const state = notificationStore.useStore();
  const add = useCallback(
    (n: Omit<Notification, "id" | "read" | "createdAt">) =>
      notificationStore.setState((s) => ({
        notifications: [
          { ...n, id: `notif-${Date.now()}`, read: false, createdAt: new Date().toISOString() },
          ...s.notifications,
        ],
      })),
    []
  );
  const markRead = useCallback(
    (id: string) =>
      notificationStore.setState((s) => ({
        notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
      })),
    []
  );
  const clearAll = useCallback(() => notificationStore.setState({ notifications: [] }), []);
  const unreadCount = state.notifications.filter((n) => !n.read).length;
  return { ...state, add, markRead, clearAll, unreadCount };
}

import { useState, useCallback, useEffect } from "react";

// Types
export interface ClerkUser {
  id: string;
  name: string;
  saccoName: string;
  officeName: string;
  officeCity: string;
  officeCode: string;
  shiftStart: Date;
}

export interface Parcel {
  id: string;
  trackingId: string;
  senderName: string;
  senderPhone: string;
  recipientName: string;
  recipientPhone: string;
  deliveryAddress: string;
  landmark: string;
  originCity: string;
  destinationCity: string;
  size: "S" | "M" | "L" | "XL";
  category: "General" | "Fragile" | "High Value" | "Documents";
  declaredValue?: number;
  insured: boolean;
  status: "Booked" | "In Transit" | "Arrived" | "Out for Delivery" | "Delivered" | "Issue";
  paymentMethod: "mpesa" | "cash";
  paymentStatus: "pending" | "completed" | "failed";
  paymentRef?: string;
  totalPrice: number;
  saccoFee: number;
  tryvoFee: number;
  sizeSurcharge: number;
  insuranceFee: number;
  createdAt: Date;
  updatedAt: Date;
  events: ParcelEvent[];
}

export interface ParcelEvent {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  actor: string;
}

export interface Issue {
  id: string;
  trackingId: string;
  type: "Damaged" | "Missing" | "Wrong Destination" | "Not Collecting" | "Other";
  description: string;
  urgent: boolean;
  status: "Open" | "In Progress" | "Resolved";
  reportedBy: string;
  photos: string[];
  createdAt: Date;
  notes: string[];
}

export interface Transaction {
  id: string;
  bookingId: string;
  amount: number;
  method: "mpesa" | "cash";
  status: "completed" | "pending" | "failed";
  ref?: string;
  createdAt: Date;
}

// Mock data
const MOCK_CLERK: ClerkUser = {
  id: "clerk-001",
  name: "Joseph K.",
  saccoName: "2NK SACCO",
  officeName: "Nairobi CBD Office",
  officeCity: "Nairobi",
  officeCode: "2NK-NBI-01",
  shiftStart: new Date(),
};

const generateTrackingId = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const nums = "0123456789";
  const c = () => chars[Math.floor(Math.random() * chars.length)];
  const n = () => nums[Math.floor(Math.random() * nums.length)];
  return `TRV-${n()}${n()}${n()}${n()}-${c()}${c()}${c()}`;
};

const cities = ["Nakuru", "Eldoret", "Kisumu", "Mombasa", "Nyeri", "Thika", "Nanyuki", "Machakos"];
const names = ["Grace A.", "Brian M.", "Sarah W.", "David O.", "Faith N.", "Peter K.", "Mary J.", "John T."];
const statuses: Parcel["status"][] = ["Booked", "In Transit", "Arrived", "Out for Delivery", "Delivered"];

const generateMockParcels = (): Parcel[] => {
  const parcels: Parcel[] = [];
  for (let i = 0; i < 24; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const dest = cities[Math.floor(Math.random() * cities.length)];
    const name = names[Math.floor(Math.random() * names.length)];
    const size = (["S", "M", "L", "XL"] as const)[Math.floor(Math.random() * 4)];
    const surcharges = { S: 0, M: 100, L: 250, XL: 500 };
    const baseFees: Record<string, [number, number]> = {
      Nakuru: [300, 200], Eldoret: [380, 270], Kisumu: [400, 300],
      Mombasa: [420, 330], Nyeri: [270, 180], Thika: [200, 150],
      Nanyuki: [320, 210], Machakos: [220, 160],
    };
    const [saccoFee, tryvoFee] = baseFees[dest] || [300, 200];
    const sizeSurcharge = surcharges[size];
    const total = saccoFee + tryvoFee + sizeSurcharge;
    const hoursAgo = Math.floor(Math.random() * 8);
    const createdAt = new Date(Date.now() - hoursAgo * 3600000);

    parcels.push({
      id: `p-${i}`,
      trackingId: generateTrackingId(),
      senderName: names[Math.floor(Math.random() * names.length)],
      senderPhone: `+254 7${Math.floor(Math.random() * 100000000).toString().padStart(8, "0")}`,
      recipientName: name,
      recipientPhone: `+254 7${Math.floor(Math.random() * 100000000).toString().padStart(8, "0")}`,
      deliveryAddress: `${Math.floor(Math.random() * 200) + 1} Main St, ${dest}`,
      landmark: "Near Town Hall",
      originCity: "Nairobi",
      destinationCity: dest,
      size,
      category: "General",
      declaredValue: undefined,
      insured: false,
      status,
      paymentMethod: Math.random() > 0.4 ? "mpesa" : "cash",
      paymentStatus: "completed",
      paymentRef: Math.random() > 0.4 ? `QHX${Math.floor(Math.random() * 10000)}ABC` : undefined,
      totalPrice: total,
      saccoFee,
      tryvoFee,
      sizeSurcharge,
      insuranceFee: 0,
      createdAt,
      updatedAt: createdAt,
      events: [
        { id: `e-${i}-1`, type: "Booked", description: "Parcel booked at Nairobi CBD Office", timestamp: createdAt, actor: "Joseph K." },
      ],
    });
  }
  return parcels;
};

const generateMockIssues = (parcels: Parcel[]): Issue[] => {
  const issueTypes: Issue["type"][] = ["Damaged", "Missing", "Wrong Destination", "Not Collecting"];
  return [0, 1, 2].map((i) => ({
    id: `iss-${i}`,
    trackingId: parcels[i]?.trackingId || "TRV-0000-AAA",
    type: issueTypes[i % issueTypes.length],
    description: "Parcel arrived with visible damage to outer packaging. Contents may be affected.",
    urgent: i === 0,
    status: i === 2 ? "Resolved" : "Open",
    reportedBy: "Joseph K.",
    photos: [],
    createdAt: new Date(Date.now() - i * 3600000),
    notes: [],
  }));
};

const generateMockTransactions = (parcels: Parcel[]): Transaction[] =>
  parcels.filter((p) => p.paymentStatus === "completed").map((p, i) => ({
    id: `tx-${i}`,
    bookingId: p.trackingId,
    amount: p.totalPrice,
    method: p.paymentMethod,
    status: "completed" as const,
    ref: p.paymentRef,
    createdAt: p.createdAt,
  }));

// Simple global state
let _clerk: ClerkUser | null = null;
let _parcels: Parcel[] = generateMockParcels();
let _issues: Issue[] = generateMockIssues(_parcels);
let _transactions: Transaction[] = generateMockTransactions(_parcels);
let _listeners: (() => void)[] = [];

const notify = () => _listeners.forEach((fn) => fn());

export const clerkStore = {
  subscribe(fn: () => void) {
    _listeners.push(fn);
    return () => { _listeners = _listeners.filter((l) => l !== fn); };
  },
  getClerk: () => _clerk,
  login(code: string, pin: string): boolean {
    if (code.toUpperCase() === "2NK-NBI-01" && pin === "123456") {
      _clerk = { ...MOCK_CLERK, shiftStart: new Date() };
      notify();
      return true;
    }
    return false;
  },
  logout() { _clerk = null; notify(); },
  getParcels: () => _parcels,
  getParcelByTracking: (id: string) => _parcels.find((p) => p.trackingId === id),
  addParcel(parcel: Omit<Parcel, "id" | "trackingId" | "events" | "createdAt" | "updatedAt">) {
    const now = new Date();
    const newParcel: Parcel = {
      ...parcel,
      id: `p-${Date.now()}`,
      trackingId: generateTrackingId(),
      createdAt: now,
      updatedAt: now,
      events: [{ id: `e-${Date.now()}`, type: "Booked", description: `Parcel booked at ${_clerk?.officeName || "Office"}`, timestamp: now, actor: _clerk?.name || "Clerk" }],
    };
    _parcels = [newParcel, ..._parcels];
    _transactions = [{ id: `tx-${Date.now()}`, bookingId: newParcel.trackingId, amount: newParcel.totalPrice, method: newParcel.paymentMethod, status: "completed", ref: newParcel.paymentRef, createdAt: now }, ..._transactions];
    notify();
    return newParcel;
  },
  updateParcelStatus(trackingId: string, status: Parcel["status"]) {
    _parcels = _parcels.map((p) =>
      p.trackingId === trackingId
        ? { ...p, status, updatedAt: new Date(), events: [...p.events, { id: `e-${Date.now()}`, type: status, description: `Status changed to ${status}`, timestamp: new Date(), actor: _clerk?.name || "System" }] }
        : p
    );
    notify();
  },
  getIssues: () => _issues,
  addIssue(issue: Omit<Issue, "id" | "createdAt" | "notes">) {
    const newIssue: Issue = { ...issue, id: `iss-${Date.now()}`, createdAt: new Date(), notes: [] };
    _issues = [newIssue, ..._issues];
    notify();
    return newIssue;
  },
  getTransactions: () => _transactions,
  getStats() {
    const today = _parcels.filter((p) => new Date(p.createdAt).toDateString() === new Date().toDateString());
    return {
      booked: today.filter((p) => p.status === "Booked").length,
      inTransit: today.filter((p) => p.status === "In Transit").length,
      arrived: today.filter((p) => p.status === "Arrived").length,
      delivered: today.filter((p) => p.status === "Delivered").length,
    };
  },
  getRecentEvents() {
    return _parcels
      .flatMap((p) => p.events.map((e) => ({ ...e, trackingId: p.trackingId, status: p.status })))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 8);
  },
};

export function useClerkStore() {
  const [, setTick] = useState(0);
  useEffect(() => clerkStore.subscribe(() => setTick((t) => t + 1)), []);
  return clerkStore;
}

export { generateTrackingId };

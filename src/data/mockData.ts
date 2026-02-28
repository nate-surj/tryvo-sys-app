import { format } from "date-fns";

// ── Types ──
export interface MockSACCO {
  id: string;
  name: string;
  registrationNumber: string;
  headquartersCity: string;
  contactName: string;
  contactPhone: string;
  revenueSharePercent: number;
  status: "active" | "suspended";
  offices: MockSACCOOffice[];
}

export interface MockSACCOOffice {
  id: string;
  saccoId: string;
  city: string;
  address: string;
  phone: string;
  status: "active" | "inactive";
}

export interface MockRoute {
  id: string;
  saccoId: string;
  originCity: string;
  destinationCity: string;
  saccoBaseFee: number;
  tryvoLastMileFee: number;
  estimatedTransitHours: number;
  status: "active";
}

export interface MockRider {
  id: string;
  name: string;
  phone: string;
  city: string;
  vehicleType: "Bodaboda" | "Bicycle" | "Van" | "On Foot";
  rating: number;
  totalDeliveries: number;
  tier: "bronze" | "silver" | "gold" | "elite";
  isAvailable: boolean;
  status: "active" | "suspended";
}

export interface MockParcel {
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
  riderId?: string;
  createdAt: string;
  updatedAt: string;
  events: MockDeliveryEvent[];
}

export interface MockDeliveryEvent {
  id: string;
  parcelId: string;
  eventType: string;
  actorType: "clerk" | "rider" | "system" | "ops";
  actorId: string;
  timestamp: string;
  notes?: string;
}

export interface MockSender {
  id: string;
  name: string;
  phone: string;
  email?: string;
  accountType: "individual" | "business";
  totalDeliveries: number;
}

export interface MockRecipient {
  name: string;
  phone: string;
  address: string;
  city: string;
  landmark: string;
}

// ── Helpers ──
const generateTrackingId = (): string => {
  const n = () => Math.floor(Math.random() * 10);
  const c = () => "ABCDEFGHJKLMNPQRSTUVWXYZ"[Math.floor(Math.random() * 24)];
  return `TRV-${n()}${n()}${n()}${n()}-${c()}${c()}${c()}`;
};

const hoursAgo = (h: number): string => new Date(Date.now() - h * 3600000).toISOString();

// ── SACCOs ──
export const mockSACCOs: MockSACCO[] = [
  { id: "sacco-1", name: "2NK SACCO", registrationNumber: "KE-2NK-001", headquartersCity: "Nairobi", contactName: "David Ochieng", contactPhone: "+254 722 100 200", revenueSharePercent: 60, status: "active", offices: [
    { id: "off-1", saccoId: "sacco-1", city: "Nairobi", address: "Tom Mboya St, CBD", phone: "+254 722 100 201", status: "active" },
    { id: "off-2", saccoId: "sacco-1", city: "Nakuru", address: "Kenyatta Ave, Town Centre", phone: "+254 722 100 202", status: "active" },
    { id: "off-3", saccoId: "sacco-1", city: "Eldoret", address: "Uganda Rd, Bus Park", phone: "+254 722 100 203", status: "active" },
  ]},
  { id: "sacco-2", name: "Mololine Services", registrationNumber: "KE-MOL-002", headquartersCity: "Nakuru", contactName: "Peter Kamau", contactPhone: "+254 733 200 300", revenueSharePercent: 58, status: "active", offices: [
    { id: "off-4", saccoId: "sacco-2", city: "Nairobi", address: "River Rd, Downtown", phone: "+254 733 200 301", status: "active" },
    { id: "off-5", saccoId: "sacco-2", city: "Nakuru", address: "Moi Ave, Central", phone: "+254 733 200 302", status: "active" },
  ]},
  { id: "sacco-3", name: "Easy Coach", registrationNumber: "KE-ECH-003", headquartersCity: "Nairobi", contactName: "Jane Wambui", contactPhone: "+254 711 300 400", revenueSharePercent: 55, status: "active", offices: [
    { id: "off-6", saccoId: "sacco-3", city: "Nairobi", address: "Accra Rd, CBD", phone: "+254 711 300 401", status: "active" },
    { id: "off-7", saccoId: "sacco-3", city: "Kisumu", address: "Oginga Odinga St", phone: "+254 711 300 402", status: "active" },
  ]},
  { id: "sacco-4", name: "Greenline Express", registrationNumber: "KE-GLE-004", headquartersCity: "Mombasa", contactName: "Ahmed Hassan", contactPhone: "+254 720 400 500", revenueSharePercent: 60, status: "active", offices: [
    { id: "off-8", saccoId: "sacco-4", city: "Nairobi", address: "Mfangano St", phone: "+254 720 400 501", status: "active" },
    { id: "off-9", saccoId: "sacco-4", city: "Mombasa", address: "Digo Rd, CBD", phone: "+254 720 400 502", status: "active" },
  ]},
  { id: "sacco-5", name: "Climax Coaches", registrationNumber: "KE-CLX-005", headquartersCity: "Kisumu", contactName: "Otieno Omondi", contactPhone: "+254 710 500 600", revenueSharePercent: 57, status: "active", offices: [
    { id: "off-10", saccoId: "sacco-5", city: "Nairobi", address: "Cross Rd, CBD", phone: "+254 710 500 601", status: "active" },
    { id: "off-11", saccoId: "sacco-5", city: "Kisumu", address: "Jomo Kenyatta Hwy", phone: "+254 710 500 602", status: "active" },
  ]},
];

// ── Routes ──
export const mockRoutes: MockRoute[] = [
  { id: "rt-1", saccoId: "sacco-1", originCity: "Nairobi", destinationCity: "Nakuru", saccoBaseFee: 300, tryvoLastMileFee: 200, estimatedTransitHours: 3, status: "active" },
  { id: "rt-2", saccoId: "sacco-1", originCity: "Nairobi", destinationCity: "Eldoret", saccoBaseFee: 380, tryvoLastMileFee: 270, estimatedTransitHours: 6, status: "active" },
  { id: "rt-3", saccoId: "sacco-3", originCity: "Nairobi", destinationCity: "Kisumu", saccoBaseFee: 400, tryvoLastMileFee: 300, estimatedTransitHours: 7, status: "active" },
  { id: "rt-4", saccoId: "sacco-4", originCity: "Nairobi", destinationCity: "Mombasa", saccoBaseFee: 420, tryvoLastMileFee: 330, estimatedTransitHours: 8, status: "active" },
  { id: "rt-5", saccoId: "sacco-1", originCity: "Nairobi", destinationCity: "Nyeri", saccoBaseFee: 270, tryvoLastMileFee: 180, estimatedTransitHours: 3, status: "active" },
  { id: "rt-6", saccoId: "sacco-2", originCity: "Nairobi", destinationCity: "Thika", saccoBaseFee: 200, tryvoLastMileFee: 150, estimatedTransitHours: 1, status: "active" },
  { id: "rt-7", saccoId: "sacco-1", originCity: "Nairobi", destinationCity: "Nanyuki", saccoBaseFee: 320, tryvoLastMileFee: 210, estimatedTransitHours: 4, status: "active" },
  { id: "rt-8", saccoId: "sacco-5", originCity: "Nairobi", destinationCity: "Machakos", saccoBaseFee: 220, tryvoLastMileFee: 160, estimatedTransitHours: 2, status: "active" },
];

// ── Riders ──
export const mockRiders: MockRider[] = [
  { id: "rider-1", name: "Brian Mwangi", phone: "+254 712 345 678", city: "Nakuru", vehicleType: "Bodaboda", rating: 4.8, totalDeliveries: 342, tier: "gold", isAvailable: true, status: "active" },
  { id: "rider-2", name: "Samuel Kipchoge", phone: "+254 723 456 789", city: "Nakuru", vehicleType: "Bodaboda", rating: 4.5, totalDeliveries: 189, tier: "silver", isAvailable: true, status: "active" },
  { id: "rider-3", name: "Denis Ouma", phone: "+254 734 567 890", city: "Eldoret", vehicleType: "Bodaboda", rating: 4.9, totalDeliveries: 521, tier: "elite", isAvailable: false, status: "active" },
  { id: "rider-4", name: "Kevin Otieno", phone: "+254 745 678 901", city: "Kisumu", vehicleType: "Bodaboda", rating: 4.2, totalDeliveries: 78, tier: "silver", isAvailable: true, status: "active" },
  { id: "rider-5", name: "James Wafula", phone: "+254 756 789 012", city: "Mombasa", vehicleType: "Van", rating: 4.7, totalDeliveries: 256, tier: "gold", isAvailable: true, status: "active" },
  { id: "rider-6", name: "Martin Njoroge", phone: "+254 767 890 123", city: "Nairobi", vehicleType: "Bodaboda", rating: 4.6, totalDeliveries: 145, tier: "silver", isAvailable: true, status: "active" },
  { id: "rider-7", name: "Paul Kibet", phone: "+254 778 901 234", city: "Nyeri", vehicleType: "Bodaboda", rating: 4.3, totalDeliveries: 92, tier: "silver", isAvailable: false, status: "active" },
  { id: "rider-8", name: "Eric Muturi", phone: "+254 789 012 345", city: "Thika", vehicleType: "Bicycle", rating: 4.1, totalDeliveries: 45, tier: "bronze", isAvailable: true, status: "active" },
  { id: "rider-9", name: "Collins Odhiambo", phone: "+254 790 123 456", city: "Kisumu", vehicleType: "Bodaboda", rating: 4.4, totalDeliveries: 167, tier: "silver", isAvailable: true, status: "active" },
  { id: "rider-10", name: "Felix Kamande", phone: "+254 701 234 567", city: "Nakuru", vehicleType: "Van", rating: 4.0, totalDeliveries: 34, tier: "bronze", isAvailable: true, status: "active" },
];

// ── Senders ──
export const mockSenders: MockSender[] = [
  { id: "sender-1", name: "Wanjiku Muthoni", phone: "+254 722 111 222", email: "wanjiku@gmail.com", accountType: "business", totalDeliveries: 87 },
  { id: "sender-2", name: "Amos Kipruto", phone: "+254 733 222 333", accountType: "individual", totalDeliveries: 12 },
  { id: "sender-3", name: "Lucy Akinyi", phone: "+254 711 333 444", email: "lucy.akinyi@yahoo.com", accountType: "individual", totalDeliveries: 34 },
  { id: "sender-4", name: "Hassan Ali", phone: "+254 720 444 555", accountType: "business", totalDeliveries: 156 },
  { id: "sender-5", name: "Sarah Wangari", phone: "+254 710 555 666", email: "sarah.wangari@outlook.com", accountType: "individual", totalDeliveries: 8 },
];

// ── Recipients ──
export const mockRecipients: MockRecipient[] = [
  { name: "Grace Achieng", phone: "+254 712 100 200", address: "45 Oginga Odinga St", city: "Kisumu", landmark: "Near Mega Plaza" },
  { name: "Peter Kimani", phone: "+254 723 200 300", address: "12 Kenyatta Ave", city: "Nakuru", landmark: "Opposite Merica Hotel" },
  { name: "Faith Njeri", phone: "+254 734 300 400", address: "78 Nandi Rd", city: "Eldoret", landmark: "Next to Zion Mall" },
  { name: "David Omondi", phone: "+254 745 400 500", address: "23 Moi Ave", city: "Mombasa", landmark: "Behind Tusks" },
  { name: "Mary Njoki", phone: "+254 756 500 600", address: "56 Kimathi St", city: "Nyeri", landmark: "Near Green Hills Hotel" },
  { name: "John Tanui", phone: "+254 767 600 700", address: "89 Uhuru Hwy", city: "Thika", landmark: "Near Blue Post Hotel" },
  { name: "Rose Chebet", phone: "+254 778 700 800", address: "34 Laikipia Rd", city: "Nanyuki", landmark: "Near Sportsman Arms" },
  { name: "Brian Mutiso", phone: "+254 789 800 900", address: "67 Machakos Town Rd", city: "Machakos", landmark: "Near People's Park" },
];

// ── Parcels (20) ──
const statuses: MockParcel["status"][] = ["Booked", "In Transit", "Arrived", "Out for Delivery", "Delivered", "Issue"];
const sizes: MockParcel["size"][] = ["S", "M", "L", "XL"];
const categories: MockParcel["category"][] = ["General", "Fragile", "High Value", "Documents"];
const surcharges: Record<string, number> = { S: 0, M: 100, L: 250, XL: 500 };

export const mockParcels: MockParcel[] = Array.from({ length: 20 }, (_, i) => {
  const route = mockRoutes[i % mockRoutes.length];
  const recipient = mockRecipients[i % mockRecipients.length];
  const sender = mockSenders[i % mockSenders.length];
  const size = sizes[i % 4];
  const category = categories[i % 4];
  const status = statuses[i % 6];
  const trackingId = generateTrackingId();
  const h = Math.floor(Math.random() * 12);
  const total = route.saccoBaseFee + route.tryvoLastMileFee + surcharges[size];

  return {
    id: `parcel-${i + 1}`,
    trackingId,
    senderName: sender.name,
    senderPhone: sender.phone,
    recipientName: recipient.name,
    recipientPhone: recipient.phone,
    deliveryAddress: recipient.address,
    landmark: recipient.landmark,
    originCity: route.originCity,
    destinationCity: route.destinationCity,
    size,
    category,
    declaredValue: category === "High Value" ? 25000 : undefined,
    insured: category === "High Value",
    status,
    paymentMethod: i % 3 === 0 ? "cash" : "mpesa",
    paymentStatus: "completed",
    paymentRef: i % 3 !== 0 ? `QHX${1000 + i}ABC` : undefined,
    totalPrice: total,
    saccoFee: route.saccoBaseFee,
    tryvoFee: route.tryvoLastMileFee,
    sizeSurcharge: surcharges[size],
    insuranceFee: category === "High Value" ? 100 : 0,
    riderId: status === "Out for Delivery" || status === "Delivered" ? mockRiders[i % mockRiders.length].id : undefined,
    createdAt: hoursAgo(h),
    updatedAt: hoursAgo(Math.max(0, h - 1)),
    events: [
      { id: `ev-${i}-1`, parcelId: `parcel-${i + 1}`, eventType: "Booked", actorType: "clerk", actorId: "clerk-001", timestamp: hoursAgo(h), notes: `Booked at Nairobi CBD Office` },
      ...(["In Transit", "Arrived", "Out for Delivery", "Delivered"].indexOf(status) >= 0 ? [{ id: `ev-${i}-2`, parcelId: `parcel-${i + 1}`, eventType: "In Transit", actorType: "system" as const, actorId: "system", timestamp: hoursAgo(h - 1) }] : []),
      ...(["Arrived", "Out for Delivery", "Delivered"].indexOf(status) >= 0 ? [{ id: `ev-${i}-3`, parcelId: `parcel-${i + 1}`, eventType: "Arrived", actorType: "clerk" as const, actorId: "clerk-002", timestamp: hoursAgo(h - 2) }] : []),
      ...(["Out for Delivery", "Delivered"].indexOf(status) >= 0 ? [{ id: `ev-${i}-4`, parcelId: `parcel-${i + 1}`, eventType: "Out for Delivery", actorType: "rider" as const, actorId: mockRiders[i % mockRiders.length].id, timestamp: hoursAgo(h - 3) }] : []),
      ...(status === "Delivered" ? [{ id: `ev-${i}-5`, parcelId: `parcel-${i + 1}`, eventType: "Delivered", actorType: "rider" as const, actorId: mockRiders[i % mockRiders.length].id, timestamp: hoursAgo(h - 4) }] : []),
    ],
  };
});

// ── Delivery Events (15 recent) ──
export const mockDeliveryEvents: MockDeliveryEvent[] = mockParcels
  .flatMap((p) => p.events)
  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  .slice(0, 15);

export { generateTrackingId };

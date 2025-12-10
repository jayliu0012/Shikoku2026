

export interface FlightSegmentData {
  time: string;
  city: string;
  airport: string;
  terminal: string;
}

export interface FlightInfo {
  type: string;
  date: string;
  departure: FlightSegmentData;
  arrival: FlightSegmentData;
  airline: string;
  flightNumber: string;
  duration: string;
  color: string;
  baggage: {
    carryOn: string;
    checked: string;
  };
}

export interface FlightData {
  outbound: FlightInfo;
  inbound: FlightInfo;
}

export interface TransportDetail {
  mode: string;
  time: string;
}

export interface ItineraryStop {
  time: string;
  name: string;
  durationLabel?: string; // e.g., (停留 00時00分)
  note?: string;
  transport?: TransportDetail;
  mapUrl?: string;
  parkingUrl?: string;
  storageUrl?: string;
  specialUrl?: string;
  category?: string; // e.g., 'flight', 'transport', 'food', 'shopping', 'accommodation'
}

export interface ItineraryDay {
  day: number;
  date: string;
  theme: string;
  color: string;
  highlight: string;
  stops: ItineraryStop[];
}

export interface PackingItem {
  name: string;
  packed: boolean;
}

export interface PackingCategory {
  category: string;
  icon: string;
  items: PackingItem[];
}

export interface PowerBankRule {
  rule: string;
  detail: string;
}

export interface Accommodation {
  name: string;
  dates: string;
  address: string;
  notes: string;
  mapUrl: string;
}

// Global variable declarations for the sandbox environment
declare global {
  var __app_id: string | undefined;
  var __firebase_config: string | undefined;
  var __initial_auth_token: string | undefined;
}
import { MarketAssumptions } from "@/lib/yield";

export type ZoneMetric = {
  id: string;
  district: string;
  city: "Lima" | "Cusco";
  lat: number;
  lng: number;
  adr: number;
  occupancy: number;
  fixedRentM2: number;
  airbnbAdvantage: number;
  listings: number;
  rentals: number;
  regulation: "green" | "yellow" | "red";
  note: string;
};

export const zones: ZoneMetric[] = [
  {
    id: "lim-mir-01",
    district: "Miraflores",
    city: "Lima",
    lat: -12.121,
    lng: -77.03,
    adr: 235,
    occupancy: 0.64,
    fixedRentM2: 43,
    airbnbAdvantage: 0.28,
    listings: 860,
    rentals: 1240,
    regulation: "yellow",
    note: "Demanda fuerte, revisar reglamento interno por edificio."
  },
  {
    id: "lim-bar-01",
    district: "Barranco",
    city: "Lima",
    lat: -12.149,
    lng: -77.021,
    adr: 255,
    occupancy: 0.68,
    fixedRentM2: 40,
    airbnbAdvantage: 0.42,
    listings: 410,
    rentals: 520,
    regulation: "yellow",
    note: "Alta traccion turistica y oferta boutique."
  },
  {
    id: "lim-sis-01",
    district: "San Isidro",
    city: "Lima",
    lat: -12.097,
    lng: -77.036,
    adr: 245,
    occupancy: 0.58,
    fixedRentM2: 46,
    airbnbAdvantage: 0.08,
    listings: 340,
    rentals: 690,
    regulation: "green",
    note: "Mejor para perfiles corporativos y estadias medianas."
  },
  {
    id: "lim-sur-01",
    district: "Surco",
    city: "Lima",
    lat: -12.128,
    lng: -76.991,
    adr: 185,
    occupancy: 0.49,
    fixedRentM2: 37,
    airbnbAdvantage: -0.16,
    listings: 230,
    rentals: 920,
    regulation: "green",
    note: "Renta fija suele ganar por estabilidad y demanda familiar."
  },
  {
    id: "lim-mag-01",
    district: "Magdalena",
    city: "Lima",
    lat: -12.091,
    lng: -77.068,
    adr: 190,
    occupancy: 0.55,
    fixedRentM2: 36,
    airbnbAdvantage: 0.06,
    listings: 180,
    rentals: 460,
    regulation: "green",
    note: "Empate frecuente; decide el costo operativo."
  },
  {
    id: "cus-cen-01",
    district: "Centro Historico",
    city: "Cusco",
    lat: -13.516,
    lng: -71.978,
    adr: 220,
    occupancy: 0.7,
    fixedRentM2: 31,
    airbnbAdvantage: 0.55,
    listings: 1120,
    rentals: 380,
    regulation: "yellow",
    note: "Zona turistica muy sensible a temporada alta."
  }
];

export const seasonality = [
  { month: "Ene", occupancy: 0.61, adr: 224 },
  { month: "Feb", occupancy: 0.58, adr: 218 },
  { month: "Mar", occupancy: 0.56, adr: 214 },
  { month: "Abr", occupancy: 0.6, adr: 228 },
  { month: "May", occupancy: 0.63, adr: 232 },
  { month: "Jun", occupancy: 0.67, adr: 246 },
  { month: "Jul", occupancy: 0.72, adr: 260 },
  { month: "Ago", occupancy: 0.69, adr: 252 },
  { month: "Sep", occupancy: 0.62, adr: 235 },
  { month: "Oct", occupancy: 0.65, adr: 242 },
  { month: "Nov", occupancy: 0.66, adr: 248 },
  { month: "Dic", occupancy: 0.71, adr: 265 }
];

export function assumptionsForDistrict(district: string): MarketAssumptions {
  const zone = zones.find((item) => item.district === district) || zones[0];
  return {
    adr: zone.adr,
    occupancy: zone.occupancy,
    fixedRent: Math.round(zone.fixedRentM2 * 65),
    fixedManagementPct: 0,
    airbnbManagementPct: 0.22,
    platformPct: 0.15,
    taxPct: 0.05,
    avgStayNights: 3.2,
    cleaningFee: 60,
    monthlyServices: 280,
    supplies: 120
  };
}

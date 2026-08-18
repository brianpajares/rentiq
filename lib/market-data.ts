import { MarketAssumptions } from "@/lib/yield";
import zoneMarket from "@/datasets/zone-market.json";
import seasonalityRows from "@/datasets/seasonality.json";
import operatingAssumptions from "@/datasets/operating-assumptions.json";

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
  source: string;
  period: string;
};

export const zones = zoneMarket as ZoneMetric[];

export const seasonality = seasonalityRows;

export const datasetCatalog = {
  driveFolderName: "RentIQ Datasets",
  refreshCadence: operatingAssumptions.refreshCadence,
  calculationModelVersion: operatingAssumptions.calculationModelVersion,
  period: operatingAssumptions.period,
  datasets: [
    {
      id: "zone-market",
      file: "datasets/zone-market.json",
      description: "ADR, ocupacion, renta fija por m2, ventaja Airbnb, oferta y riesgo por zona."
    },
    {
      id: "seasonality",
      file: "datasets/seasonality.json",
      description: "Curva mensual curada de ocupacion y ADR usada en el grafico de estacionalidad."
    },
    {
      id: "operating-assumptions",
      file: "datasets/operating-assumptions.json",
      description: "Supuestos operativos base para comisiones, gestion, limpieza, servicios e impuestos."
    },
    {
      id: "regulatory-risk",
      file: "datasets/regulatory-risk.json",
      description: "Resumen de riesgo regulatorio y operativo por distrito."
    }
  ]
};

export function assumptionsForDistrict(district: string): MarketAssumptions {
  const zone = zones.find((item) => item.district === district) || zones[0];
  return {
    adr: zone.adr,
    occupancy: zone.occupancy,
    fixedRent: Math.round(zone.fixedRentM2 * 65),
    fixedManagementPct: operatingAssumptions.defaults.fixedManagementPct,
    airbnbManagementPct: operatingAssumptions.defaults.airbnbManagementPct,
    platformPct: operatingAssumptions.defaults.platformPct,
    taxPct: operatingAssumptions.defaults.taxPct,
    avgStayNights: operatingAssumptions.defaults.avgStayNights,
    cleaningFee: operatingAssumptions.defaults.cleaningFee,
    monthlyServices: operatingAssumptions.defaults.monthlyServices,
    supplies: operatingAssumptions.defaults.supplies
  };
}

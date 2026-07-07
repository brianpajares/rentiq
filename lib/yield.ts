export type Mode = "fixed" | "airbnb";

export type UnitInput = {
  district: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  areaM2: number;
  furnished: boolean;
  propertyValue: number;
  maintenance: number;
  currentRent?: number;
};

export type MarketAssumptions = {
  adr: number;
  occupancy: number;
  fixedRent: number;
  fixedManagementPct: number;
  airbnbManagementPct: number;
  platformPct: number;
  taxPct: number;
  avgStayNights: number;
  cleaningFee: number;
  monthlyServices: number;
  supplies: number;
};

export type ScenarioResult = {
  grossMonthly: number;
  totalCosts: number;
  netMonthly: number;
  annualYield: number;
  costs: Array<{ label: string; value: number }>;
};

export type YieldResult = {
  fixed: ScenarioResult;
  airbnb: ScenarioResult;
  breakevenOccupancy: number;
  winner: Mode | "tie";
  monthlyDelta: number;
};

const DAYS_PER_MONTH = 30.4;

export function money(value: number) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0
  }).format(value);
}

export function pct(value: number) {
  return `${Math.round(value * 100)}%`;
}

export function estimateFixed(unit: UnitInput, assumptions: MarketAssumptions): ScenarioResult {
  const grossMonthly = unit.currentRent || assumptions.fixedRent;
  const vacancy = grossMonthly / 24;
  const management = grossMonthly * assumptions.fixedManagementPct;
  const tax = grossMonthly * assumptions.taxPct;
  const costs = [
    { label: "Mantenimiento edificio", value: unit.maintenance },
    { label: "Vacancia prorrateada", value: vacancy },
    { label: "Gestion opcional", value: management },
    { label: "Impuesto supuesto", value: tax }
  ];
  const totalCosts = costs.reduce((sum, cost) => sum + cost.value, 0);
  const netMonthly = grossMonthly - totalCosts;

  return {
    grossMonthly,
    totalCosts,
    netMonthly,
    annualYield: (netMonthly * 12) / unit.propertyValue,
    costs
  };
}

export function estimateAirbnb(
  unit: UnitInput,
  assumptions: MarketAssumptions,
  occupancy = assumptions.occupancy
): ScenarioResult {
  const grossMonthly = assumptions.adr * occupancy * DAYS_PER_MONTH;
  const rotations = (occupancy * DAYS_PER_MONTH) / assumptions.avgStayNights;
  const platform = grossMonthly * assumptions.platformPct;
  const cleaning = rotations * assumptions.cleaningFee;
  const management = grossMonthly * assumptions.airbnbManagementPct;
  const tax = grossMonthly * assumptions.taxPct;
  const costs = [
    { label: "Comision plataforma", value: platform },
    { label: "Limpieza por estadia", value: cleaning },
    { label: "Servicios host", value: assumptions.monthlyServices },
    { label: "Mantenimiento edificio", value: unit.maintenance },
    { label: "Insumos y lavanderia", value: assumptions.supplies },
    { label: "Gestion", value: management },
    { label: "Impuesto supuesto", value: tax }
  ];
  const totalCosts = costs.reduce((sum, cost) => sum + cost.value, 0);
  const netMonthly = grossMonthly - totalCosts;

  return {
    grossMonthly,
    totalCosts,
    netMonthly,
    annualYield: (netMonthly * 12) / unit.propertyValue,
    costs
  };
}

export function solveBreakeven(unit: UnitInput, assumptions: MarketAssumptions) {
  const fixedNet = estimateFixed(unit, assumptions).netMonthly;
  let low = 0;
  let high = 1;

  for (let i = 0; i < 40; i += 1) {
    const mid = (low + high) / 2;
    const airbnbNet = estimateAirbnb(unit, assumptions, mid).netMonthly;
    if (airbnbNet >= fixedNet) high = mid;
    else low = mid;
  }

  return high;
}

export function compareYield(unit: UnitInput, assumptions: MarketAssumptions): YieldResult {
  const fixed = estimateFixed(unit, assumptions);
  const airbnb = estimateAirbnb(unit, assumptions);
  const monthlyDelta = airbnb.netMonthly - fixed.netMonthly;
  const deltaRatio = Math.abs(monthlyDelta) / Math.max(fixed.netMonthly, 1);
  const winner = deltaRatio < 0.1 ? "tie" : monthlyDelta > 0 ? "airbnb" : "fixed";

  return {
    fixed,
    airbnb,
    breakevenOccupancy: solveBreakeven(unit, assumptions),
    winner,
    monthlyDelta
  };
}

export const defaultAssumptions: MarketAssumptions = {
  adr: 235,
  occupancy: 0.64,
  fixedRent: 2750,
  fixedManagementPct: 0,
  airbnbManagementPct: 0.22,
  platformPct: 0.15,
  taxPct: 0.05,
  avgStayNights: 3.2,
  cleaningFee: 60,
  monthlyServices: 280,
  supplies: 120
};

export const defaultUnit: UnitInput = {
  district: "Miraflores",
  address: "Av. Jose Pardo, Miraflores",
  bedrooms: 2,
  bathrooms: 2,
  areaM2: 65,
  furnished: true,
  propertyValue: 510000,
  maintenance: 380
};

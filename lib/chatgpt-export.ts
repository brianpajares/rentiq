import type { MarketAssumptions, UnitInput, YieldResult } from "@/lib/yield";
import { money, pct } from "@/lib/yield";

export type ChatGPTPrivacyMode = "private" | "share_link";

export type ChatGPTAnalysisPack = {
  app: "RentIQ";
  export_version: "1.0";
  calculation_model_version: "mvp-demo";
  generated_at: string;
  privacy_mode: ChatGPTPrivacyMode;
  unit: Record<string, string | number | boolean | undefined>;
  assumptions: Record<string, string | number>;
  result: Record<string, string | number>;
  sensitivity: Record<string, string | number>;
  regulatory_risk: Record<string, string>;
  confidence: string;
  requested_output: string[];
  disclaimer: string;
};

export type BuildChatGPTAnalysisPackInput = {
  unit: UnitInput & { city?: string; state?: string };
  assumptions: MarketAssumptions;
  result: YieldResult;
  sensitivity?: Record<string, string | number>;
  regulatoryRisk?: Record<string, string>;
  confidence?: string;
  privacyMode?: ChatGPTPrivacyMode;
  zoneNote?: string;
};

const requestedOutput = [
  "Veredicto ejecutivo.",
  "Tabla comparativa renta fija vs Airbnb.",
  "Explicacion del break-even.",
  "Riesgos criticos.",
  "Recomendacion para inversionista conservador.",
  "Recomendacion para inversionista agresivo.",
  "Recomendaciones para mejorar rentabilidad.",
  "Decision final: comprar, no comprar, mantener renta fija, migrar a Airbnb o analizar mas.",
  "Checklist antes de tomar decision.",
  "Disclaimer: no es asesoria financiera, tributaria ni legal."
];

export function sanitizeUnitForSharing(unit: UnitInput & { city?: string; state?: string }) {
  return {
    zona_distrito: unit.district,
    ciudad: unit.city,
    ubicacion: "Ubicacion referencial compartida por el usuario",
    tipo_unidad: unit.bedrooms === 0 ? "Studio" : "Departamento",
    dormitorios: unit.bedrooms,
    banos: unit.bathrooms,
    area_m2: unit.areaM2,
    valor_inmueble: unit.propertyValue,
    estado: unit.state || "No especificado",
    amoblado: unit.furnished,
    renta_actual: unit.currentRent
  };
}

export function buildChatGPTAnalysisPack(input: BuildChatGPTAnalysisPackInput): ChatGPTAnalysisPack {
  const fixedMargin = input.result.airbnb.netMonthly - input.result.fixed.netMonthly;
  const occupancyMargin = input.assumptions.occupancy - input.result.breakevenOccupancy;
  const winner =
    input.result.winner === "tie"
      ? "Empate tecnico"
      : input.result.winner === "airbnb"
        ? "Airbnb"
        : "Renta fija";

  return {
    app: "RentIQ",
    export_version: "1.0",
    calculation_model_version: "mvp-demo",
    generated_at: new Date().toISOString(),
    privacy_mode: input.privacyMode || "private",
    unit: sanitizeUnitForSharing(input.unit),
    assumptions: {
      adr_airbnb: input.assumptions.adr,
      ocupacion_airbnb: input.assumptions.occupancy,
      renta_fija_estimada: input.assumptions.fixedRent,
      comision_plataforma: input.assumptions.platformPct,
      limpieza_por_estadia: input.assumptions.cleaningFee,
      servicios_mensuales_host: input.assumptions.monthlyServices,
      mantenimiento_mensual: input.unit.maintenance,
      gestion_fija: input.assumptions.fixedManagementPct,
      gestion_airbnb: input.assumptions.airbnbManagementPct,
      impuesto_supuesto: input.assumptions.taxPct,
      estadia_promedio_noches: input.assumptions.avgStayNights,
      insumos_lavanderia: input.assumptions.supplies,
      vacancia_fija: "1 mes cada 24 meses"
    },
    result: {
      bruto_renta_fija: input.result.fixed.grossMonthly,
      costos_renta_fija: input.result.fixed.totalCosts,
      neto_mensual_renta_fija: input.result.fixed.netMonthly,
      yield_anual_neto_renta_fija: input.result.fixed.annualYield,
      bruto_airbnb: input.result.airbnb.grossMonthly,
      costos_airbnb: input.result.airbnb.totalCosts,
      neto_mensual_airbnb: input.result.airbnb.netMonthly,
      yield_anual_neto_airbnb: input.result.airbnb.annualYield,
      diferencia_mensual_airbnb_vs_fija: fixedMargin,
      ganador: winner,
      break_even_ocupacion_airbnb: input.result.breakevenOccupancy,
      margen_vs_ocupacion_estimada: occupancyMargin
    },
    sensitivity: {
      ocupacion_airbnb_menos_10_puntos: Math.max(0, input.assumptions.occupancy - 0.1),
      gestion_airbnb_actual: input.assumptions.airbnbManagementPct,
      renta_fija_actual: input.assumptions.fixedRent,
      escenario_conservador: "Reducir ocupacion Airbnb 10 puntos y aumentar gestion/comisiones.",
      escenario_optimista: "Mantener ocupacion estimada y optimizar ADR/costos operativos.",
      ...input.sensitivity
    },
    regulatory_risk: {
      distrito: input.unit.district,
      estado: "Revisar reglamento interno y normativa municipal antes de operar alquiler temporal.",
      nota_zona: input.zoneNote || "Sin nota adicional.",
      ...input.regulatoryRisk
    },
    confidence: input.confidence || "media",
    requested_output: requestedOutput,
    disclaimer:
      "RentIQ no brinda asesoria financiera, legal ni tributaria. Los resultados son estimaciones basadas en supuestos y deben validarse con data real, reglamento del edificio, normativa municipal y asesoria profesional."
  };
}

export function buildChatGPTMarkdown(pack: ChatGPTAnalysisPack) {
  return `# RentIQ - Paquete de Analisis para ChatGPT

## Instruccion para ChatGPT

Actua como analista senior inmobiliario, financiero y de rentas de corto plazo. Evalua si conviene explotar este departamento como renta fija o Airbnb. Usa unicamente los datos proporcionados por RentIQ. No inventes data. Si falta informacion, indicalo como supuesto o limitacion. Entrega un analisis claro, ejecutivo y accionable para un inversionista.

## Objetivo del analisis

Determinar cual escenario es mas conveniente:

1. Renta fija tradicional.
2. Airbnb / alquiler temporal.

## Metadatos

- App: ${pack.app}
- Version de exportacion: ${pack.export_version}
- Version del modelo de calculo: ${pack.calculation_model_version}
- Generado: ${pack.generated_at}
- Modo de privacidad: ${pack.privacy_mode}

## Datos de la unidad

- Zona/distrito: ${pack.unit.zona_distrito}
- Ciudad: ${pack.unit.ciudad || "No especificada"}
- Ubicacion: ${pack.unit.ubicacion}
- Tipo de unidad: ${pack.unit.tipo_unidad}
- Dormitorios: ${pack.unit.dormitorios}
- Banos: ${pack.unit.banos}
- m2: ${pack.unit.area_m2}
- Valor del inmueble: ${money(Number(pack.unit.valor_inmueble || 0))}
- Estado: ${pack.unit.estado}
- Amoblado: ${pack.unit.amoblado ? "Si" : "No"}
- Renta actual: ${pack.unit.renta_actual ? money(Number(pack.unit.renta_actual)) : "No especificada"}

## Supuestos usados

- ADR Airbnb: ${money(Number(pack.assumptions.adr_airbnb))}
- Ocupacion Airbnb: ${pct(Number(pack.assumptions.ocupacion_airbnb))}
- Renta fija estimada: ${money(Number(pack.assumptions.renta_fija_estimada))}
- Comision plataforma: ${pct(Number(pack.assumptions.comision_plataforma))}
- Limpieza por estadia: ${money(Number(pack.assumptions.limpieza_por_estadia))}
- Servicios mensuales host: ${money(Number(pack.assumptions.servicios_mensuales_host))}
- Mantenimiento mensual: ${money(Number(pack.assumptions.mantenimiento_mensual))}
- Gestion fija: ${pct(Number(pack.assumptions.gestion_fija))}
- Gestion Airbnb: ${pct(Number(pack.assumptions.gestion_airbnb))}
- Impuesto supuesto: ${pct(Number(pack.assumptions.impuesto_supuesto))}
- Estadia promedio: ${pack.assumptions.estadia_promedio_noches} noches
- Insumos/lavanderia: ${money(Number(pack.assumptions.insumos_lavanderia))}
- Vacancia fija: ${pack.assumptions.vacancia_fija}

## Resultado RentIQ

- Ingreso bruto renta fija: ${money(Number(pack.result.bruto_renta_fija))}
- Costos renta fija: ${money(Number(pack.result.costos_renta_fija))}
- Neto mensual renta fija: ${money(Number(pack.result.neto_mensual_renta_fija))}
- Yield anual neto renta fija: ${pct(Number(pack.result.yield_anual_neto_renta_fija))}
- Ingreso bruto Airbnb: ${money(Number(pack.result.bruto_airbnb))}
- Costos Airbnb: ${money(Number(pack.result.costos_airbnb))}
- Neto mensual Airbnb: ${money(Number(pack.result.neto_mensual_airbnb))}
- Yield anual neto Airbnb: ${pct(Number(pack.result.yield_anual_neto_airbnb))}
- Diferencia mensual Airbnb vs fija: ${money(Number(pack.result.diferencia_mensual_airbnb_vs_fija))}
- Ganador: ${pack.result.ganador}
- Break-even de ocupacion: ${pct(Number(pack.result.break_even_ocupacion_airbnb))}
- Margen contra ocupacion estimada: ${pct(Number(pack.result.margen_vs_ocupacion_estimada))}
- Nivel de confianza: ${pack.confidence}

## Sensibilidad

Analiza:

- Que pasa si baja la ocupacion Airbnb a ${pct(Number(pack.sensitivity.ocupacion_airbnb_menos_10_puntos))}.
- Que pasa si sube la comision o gestion.
- Que pasa si la renta fija aumenta o baja.
- Escenario conservador: ${pack.sensitivity.escenario_conservador}
- Escenario optimista: ${pack.sensitivity.escenario_optimista}

## Riesgos

Analiza:

- Riesgo regulatorio municipal: ${pack.regulatory_risk.estado}
- Riesgo de reglamento interno del edificio.
- Riesgo operativo.
- Riesgo de vacancia.
- Riesgo tributario.
- Riesgo por data incompleta.
- Riesgo de sobreestimar ADR u ocupacion.
- Nota de zona: ${pack.regulatory_risk.nota_zona}

## Salida esperada

${pack.requested_output.map((item, index) => `${index + 1}. ${item}`).join("\n")}

## Disclaimer

${pack.disclaimer}
`;
}

export function encodeBase64Url(data: unknown) {
  const json = typeof data === "string" ? data : JSON.stringify(data);
  const base64 =
    typeof Buffer !== "undefined"
      ? Buffer.from(json, "utf8").toString("base64")
      : btoa(unescape(encodeURIComponent(json)));

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function decodeBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const json =
    typeof Buffer !== "undefined"
      ? Buffer.from(padded, "base64").toString("utf8")
      : decodeURIComponent(escape(atob(padded)));

  return JSON.parse(json);
}

export function buildChatGPTFetchUrl(payload: ChatGPTAnalysisPack, origin: string) {
  const encoded = encodeBase64Url(payload);
  const normalizedOrigin = origin.replace(/\/$/g, "");
  return `${normalizedOrigin}/api/chatgpt-export?p=${encoded}`;
}

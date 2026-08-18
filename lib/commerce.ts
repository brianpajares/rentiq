export type PlanId = "free" | "report" | "pro" | "agency";

export type MonetizationPlan = {
  id: PlanId;
  name: string;
  audience: string;
  price: string;
  billing: string;
  description: string;
  cta: string;
  highlighted?: boolean;
  checkoutEnv?: string;
  features: string[];
  limits: string[];
};

export const salesEmail = process.env.NEXT_PUBLIC_SALES_EMAIL || "ventas@rentiq.pe";

export const salesContactUrl = process.env.NEXT_PUBLIC_SALES_CONTACT_URL || `mailto:${salesEmail}`;

const checkoutLinks: Partial<Record<PlanId, string>> = {
  report: process.env.NEXT_PUBLIC_STRIPE_REPORT_LINK || "",
  pro: process.env.NEXT_PUBLIC_STRIPE_PRO_LINK || "",
  agency: process.env.NEXT_PUBLIC_STRIPE_AGENCY_LINK || ""
};

export const monetizationPlans: MonetizationPlan[] = [
  {
    id: "free",
    name: "Free",
    audience: "Propietarios curiosos",
    price: "S/ 0",
    billing: "evaluacion inicial",
    description: "Compara una unidad con datasets curados y decide si vale la pena profundizar.",
    cta: "Probar gratis",
    features: ["Comparador Airbnb vs renta fija", "Mapa por distrito", "Supuestos trazables por periodo"],
    limits: ["Sin PDF descargable", "Sin portafolio", "Sin alertas mensuales"]
  },
  {
    id: "report",
    name: "Reporte",
    audience: "Decision puntual",
    price: "S/ 79",
    billing: "por unidad",
    description: "Reporte ejecutivo para decidir compra, alquiler, cambio a temporal o renegociacion.",
    cta: "Comprar reporte",
    checkoutEnv: "NEXT_PUBLIC_STRIPE_REPORT_LINK",
    highlighted: true,
    features: ["Analisis premium por unidad", "Resumen ejecutivo para compartir", "Checklist regulatorio y operativo", "Sensibilidad conservadora y optimista"],
    limits: ["No incluye cartera multiunidad", "No incluye seguimiento mensual"]
  },
  {
    id: "pro",
    name: "Pro",
    audience: "Inversionistas activos",
    price: "S/ 129",
    billing: "mensual",
    description: "Evaluaciones recurrentes, lectura de zonas y seguimiento mensual de supuestos.",
    cta: "Activar Pro",
    checkoutEnv: "NEXT_PUBLIC_STRIPE_PRO_LINK",
    features: ["Evaluaciones ilimitadas razonables", "Portafolio de unidades", "Alertas mensuales de mercado", "Plantillas para decision de inversion"],
    limits: ["No incluye implementacion operativa", "No reemplaza asesoria legal o tributaria"]
  },
  {
    id: "agency",
    name: "Agentes",
    audience: "Corredores y brokers",
    price: "Desde S/ 349",
    billing: "mensual",
    description: "Herramienta comercial para captar propietarios y sustentar recomendaciones con numeros.",
    cta: "Solicitar evaluacion",
    checkoutEnv: "NEXT_PUBLIC_STRIPE_AGENCY_LINK",
    features: ["Reportes con narrativa comercial", "Uso en captacion de propiedades", "Priorizacion de zonas", "Onboarding guiado del equipo"],
    limits: ["Requiere validacion de marca y proceso comercial", "Integraciones CRM bajo alcance"]
  }
];

export const paidFeatureGates = [
  {
    title: "PDF premium",
    description: "Convierte la evaluacion en un reporte presentable para propietario, socio o banco.",
    plan: "Reporte"
  },
  {
    title: "Portafolio",
    description: "Guarda multiples unidades y compara donde asignar capital primero.",
    plan: "Pro"
  },
  {
    title: "Alertas mensuales",
    description: "Actualiza supuestos de ADR, ocupacion, renta fija y riesgo cuando se refrescan los datasets de Drive.",
    plan: "Pro"
  }
];

export function checkoutHref(plan: MonetizationPlan) {
  if (plan.id === "free") return "/app/nueva";

  const configuredUrl = checkoutLinks[plan.id];
  if (configuredUrl) return configuredUrl;

  const query = new URLSearchParams({
    plan: plan.id,
    source: "pricing"
  });

  return `/contacto?${query.toString()}`;
}

export function planById(planId: string | undefined) {
  return monetizationPlans.find((plan) => plan.id === planId) || monetizationPlans[1];
}

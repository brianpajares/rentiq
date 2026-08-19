import Link from "next/link";
import { ArrowRight, CheckCircle, FileText, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Topbar } from "@/components/Topbar";

const deliverables = [
  "Revision manual de supuestos y resultado RentIQ",
  "Reporte ejecutivo listo para compartir con inversionistas",
  "Checklist regulatorio y de edificio antes de operar Airbnb",
  "Escenario conservador, base y optimista",
  "Recomendacion final segun perfil: conservador, balanceado o agresivo"
];

const packages = [
  {
    name: "Reporte Premium",
    price: "S/ 79",
    description: "Para una unidad especifica antes de comprar o migrar a Airbnb.",
    features: ["1 departamento", "Reporte PDF", "Revision de supuestos", "Veredicto ejecutivo"]
  },
  {
    name: "Decision Call",
    price: "S/ 249",
    description: "Para compradores que quieren validar la decision con acompanamiento.",
    features: ["Reporte premium", "Sesion 45 min", "Preguntas y riesgos", "Plan de siguientes pasos"]
  },
  {
    name: "Pro / Agentes",
    price: "S/ 199/mes",
    description: "Para agentes, brokers o gestores que evaluan varias unidades.",
    features: ["Hasta 10 evaluaciones", "Plantilla con marca", "Comparacion de portafolio", "Soporte prioritario"]
  }
];

export default function PremiumPage() {
  return (
    <main className="shell">
      <Topbar />
      <section className="page premium-hero">
        <div>
          <span className="eyebrow">Servicio premium</span>
          <h1>Convierte tu evaluacion RentIQ en una decision defendible.</h1>
          <p>
            RentIQ te da los numeros. El servicio premium revisa supuestos, riesgos y escenarios para entregarte un
            reporte claro antes de comprar, mantener renta fija o operar Airbnb.
          </p>
          <div className="chatgpt-export__actions">
            <Link className="button primary" href="mailto:brianpajares@users.noreply.github.com?subject=RentIQ%20Premium%20-%20Quiero%20mi%20reporte">
              Solicitar reporte <ArrowRight size={18} />
            </Link>
            <Link className="button secondary" href="/app/nueva">
              Evaluar otra unidad
            </Link>
          </div>
        </div>
        <aside className="card premium-summary">
          <span className="badge neutral">
            <ShieldCheck size={14} /> Sin API de IA
          </span>
          <h2>El analisis humano-premium parte del export de RentIQ.</h2>
          <p className="muted">
            El usuario copia el paquete ChatGPT Export, lo usa en su Project privado y puede solicitar revision premium
            cuando quiere una respuesta accionable y presentable.
          </p>
        </aside>
      </section>

      <section className="page">
        <h2 className="section-title">Que incluye</h2>
        <div className="grid two">
          <article className="card">
            <FileText color="#7C3AED" size={26} />
            <h3>Reporte ejecutivo</h3>
            {deliverables.map((item) => (
              <p className="muted" key={item}>
                <CheckCircle color="#16a34a" size={16} /> {item}
              </p>
            ))}
          </article>
          <article className="card">
            <Sparkles color="#F43F5E" size={26} />
            <h3>Ruta de monetizacion sugerida</h3>
            <p className="muted">
              Mantener el comparador gratuito como captador de leads. El momento de conversion aparece despues del
              resultado: si el usuario quiere PDF, revision de riesgos o decision final, se deriva a Premium.
            </p>
            <p className="muted">
              Esto evita costos de API, valida demanda y cobra por criterio experto, no por tokens.
            </p>
          </article>
        </div>
      </section>

      <section className="page">
        <h2 className="section-title">Planes</h2>
        <div className="grid three">
          {packages.map((pack) => (
            <article className="card" key={pack.name}>
              <span className="eyebrow">{pack.name}</span>
              <div className="big-number">{pack.price}</div>
              <p className="muted">{pack.description}</p>
              {pack.features.map((feature) => (
                <p className="muted" key={feature}>
                  <CheckCircle color="#16a34a" size={16} /> {feature}
                </p>
              ))}
              <Link className="button primary" href="mailto:brianpajares@users.noreply.github.com?subject=RentIQ%20Premium">
                Pedir informacion <Users size={18} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

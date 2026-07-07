import Link from "next/link";
import { ArrowRight, Building2, FileText, Map, ShieldCheck } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { assumptionsForDistrict, zones } from "@/lib/market-data";
import { compareYield, defaultUnit, money, pct } from "@/lib/yield";
import type { LucideIcon } from "lucide-react";

const featureCards: Array<[string, string, LucideIcon]> = [
  ["Comparacion neta", "Costos completos para fijo y Airbnb, no solo ingresos brutos.", Building2],
  ["Mapa de ventaja", "Distritos y zonas donde gana cada modo con una escala divergente.", Map],
  ["Reporte premium", "PDF, narrativa IA y recomendaciones listas para compartir.", FileText],
  ["Regulacion", "Semaforo distrital y checklist de edificio antes de operar temporal.", ShieldCheck]
];

export default function HomePage() {
  const assumptions = assumptionsForDistrict("Miraflores");
  const result = compareYield(defaultUnit, assumptions);

  return (
    <main className="shell">
      <Topbar />
      <section className="page hero">
        <div>
          <span className="eyebrow">Airbnb vs renta fija</span>
          <h1>RentIQ</h1>
          <p>
            Evalua un departamento con numeros netos: renta mensual, costos, yield, ocupacion de equilibrio,
            estacionalidad y riesgo regulatorio por zona.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="button primary" href="/app/nueva">
              Comparar escenarios <ArrowRight size={18} />
            </Link>
            <Link className="button secondary" href="/app/mapa">
              Ver mapa <Map size={18} />
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-label="Departamento moderno en ciudad">
          <div className="visual-panel">
            <span className="badge airbnb">Escenario Miraflores</span>
            <div className="mini-metrics">
              <div className="metric-tile">
                <span>Airbnb neto</span>
                <strong>{money(result.airbnb.netMonthly)}</strong>
              </div>
              <div className="metric-tile">
                <span>Renta fija neta</span>
                <strong>{money(result.fixed.netMonthly)}</strong>
              </div>
              <div className="metric-tile">
                <span>Break-even</span>
                <strong>{pct(result.breakevenOccupancy)}</strong>
              </div>
              <div className="metric-tile">
                <span>Zonas cargadas</span>
                <strong>{zones.length}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="page">
        <h2 className="section-title">Lo que decide la inversion</h2>
        <div className="grid three">
          {featureCards.map(([title, text, Icon]) => (
            <article className="card" key={String(title)}>
              <Icon color="#7C3AED" size={24} />
              <h3>{title}</h3>
              <p className="muted">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import { Check } from "lucide-react";
import { Topbar } from "@/components/Topbar";

const plans = [
  ["Free", "S/ 0", "1 comparacion mensual", "Resultado resumido", "Mapa basico"],
  ["Reporte", "S/ 79", "1 unidad completa", "PDF desbloqueado", "Narrativa IA"],
  ["Pro", "S/ 129/mes", "Evaluaciones ilimitadas", "Portafolio", "Alertas mensuales"]
];

export default function PricingPage() {
  return (
    <main className="shell">
      <Topbar />
      <section className="page">
        <span className="eyebrow">Precios</span>
        <h1 className="section-title">Empieza gratis, paga por profundidad</h1>
        <div className="grid three">
          {plans.map(([name, price, ...features]) => (
            <article className="card" key={name}>
              <h2>{name}</h2>
              <div className="big-number">{price}</div>
              {features.map((feature) => (
                <p className="muted" key={feature}>
                  <Check color="#16a34a" size={16} /> {feature}
                </p>
              ))}
              <Link className="button primary" href="/app/nueva">
                Elegir
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

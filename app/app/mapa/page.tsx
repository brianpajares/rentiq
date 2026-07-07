import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { zones } from "@/lib/market-data";
import { money, pct } from "@/lib/yield";

export default function MarketMapPage() {
  return (
    <main className="shell">
      <Topbar />
      <section className="page">
        <span className="eyebrow">Explorador de mercado</span>
        <h1 className="section-title">Ventaja Airbnb por zona</h1>
        <p className="muted">
          Escala divergente: celeste cuando la renta fija gana, blanco cuando hay empate tecnico y rosa cuando Airbnb
          tiene ventaja neta.
        </p>
        <div className="market-map">
          {zones.map((zone) => {
            const className = zone.airbnbAdvantage > 0.1 ? "positive" : zone.airbnbAdvantage < -0.1 ? "negative" : "neutral";
            return (
              <article className={`zone ${className}`} key={zone.id}>
                <span className={`badge ${zone.airbnbAdvantage > 0.1 ? "airbnb" : zone.airbnbAdvantage < -0.1 ? "fixed" : "neutral"}`}>
                  {zone.airbnbAdvantage > 0.1 ? "Gana Airbnb" : zone.airbnbAdvantage < -0.1 ? "Gana fijo" : "Empate"}
                </span>
                <h2>{zone.district}</h2>
                <div className="cost-row">
                  <span>Ventaja</span>
                  <strong>{pct(zone.airbnbAdvantage)}</strong>
                </div>
                <div className="cost-row">
                  <span>ADR</span>
                  <strong>{money(zone.adr)}</strong>
                </div>
                <div className="cost-row">
                  <span>Listings / avisos</span>
                  <strong>
                    {zone.listings} / {zone.rentals}
                  </strong>
                </div>
                <Link className="button secondary" href={`/app/unidad/demo?district=${zone.district}`}>
                  Evaluar aqui <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

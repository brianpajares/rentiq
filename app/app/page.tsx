import Link from "next/link";
import { Plus } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { zones } from "@/lib/market-data";
import { compareYield, defaultUnit, money } from "@/lib/yield";
import { assumptionsForDistrict } from "@/lib/market-data";

export default function AppHome() {
  const runs = zones.slice(0, 4).map((zone) => {
    const assumptions = assumptionsForDistrict(zone.district);
    const unit = { ...defaultUnit, district: zone.district, address: `${zone.district}, ${zone.city}` };
    return { zone, unit, result: compareYield(unit, assumptions) };
  });

  return (
    <main className="shell">
      <Topbar />
      <section className="page">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center" }}>
          <div>
            <span className="eyebrow">Historial</span>
            <h1 className="section-title">Unidades evaluadas</h1>
          </div>
          <Link className="button primary" href="/app/nueva">
            <Plus size={18} /> Nueva
          </Link>
        </div>
        <div className="grid two">
          {runs.map(({ zone, result }) => (
            <Link className="card" href={`/app/unidad/demo?district=${zone.district}`} key={zone.id}>
              <span className={`badge ${result.winner === "fixed" ? "fixed" : result.winner === "airbnb" ? "airbnb" : "neutral"}`}>
                {result.winner === "tie" ? "Empate tecnico" : result.winner === "airbnb" ? "Gana Airbnb" : "Gana fijo"}
              </span>
              <h2>{zone.district}</h2>
              <p className="muted">2D · 65 m2 · Amoblado</p>
              <div className="grid two">
                <div>
                  <span className="label">Fijo</span>
                  <strong>{money(result.fixed.netMonthly)}</strong>
                </div>
                <div>
                  <span className="label">Airbnb</span>
                  <strong>{money(result.airbnb.netMonthly)}</strong>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

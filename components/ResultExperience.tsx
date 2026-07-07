"use client";

import { useMemo, useState } from "react";
import { Clipboard, Download, RotateCcw, Share2 } from "lucide-react";
import { ScenarioCard } from "@/components/ScenarioCard";
import { SeasonalityChart } from "@/components/SeasonalityChart";
import { assumptionsForDistrict, zones } from "@/lib/market-data";
import { MarketAssumptions, UnitInput, compareYield, defaultUnit, money, pct } from "@/lib/yield";

function numberParam(params: Record<string, string | string[] | undefined>, key: string, fallback: number) {
  const value = params[key];
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function ResultExperience({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const district = String(searchParams.district || "Miraflores");
  const zone = zones.find((item) => item.district === district) || zones[0];
  const baseAssumptions = useMemo(() => assumptionsForDistrict(zone.district), [zone.district]);
  const [assumptions, setAssumptions] = useState<MarketAssumptions>(baseAssumptions);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const unit: UnitInput = {
    ...defaultUnit,
    district: zone.district,
    address: String(searchParams.address || `${zone.district}, ${zone.city}`),
    bedrooms: numberParam(searchParams, "bedrooms", 2),
    bathrooms: numberParam(searchParams, "bathrooms", 2),
    areaM2: numberParam(searchParams, "areaM2", 65),
    propertyValue: numberParam(searchParams, "propertyValue", 510000),
    maintenance: numberParam(searchParams, "maintenance", 380),
    furnished: String(searchParams.furnished || "true") === "true",
    currentRent: numberParam(searchParams, "currentRent", 0) || undefined
  };

  const result = compareYield(unit, assumptions);
  const winnerLabel =
    result.winner === "tie" ? "Empate tecnico" : result.winner === "airbnb" ? "Gana Airbnb" : "Gana renta fija";
  const deltaText = `${money(Math.abs(result.monthlyDelta))}/mes ${result.monthlyDelta >= 0 ? "mas que fijo" : "mas que Airbnb"}`;

  function updateAssumption(key: keyof MarketAssumptions, value: number) {
    setAssumptions((current) => ({ ...current, [key]: value }));
  }

  const chatGptPrompt = `Actua como analista inmobiliario para RentIQ. Analiza esta evaluacion y dame:
1. Veredicto claro.
2. Riesgos principales.
3. Condiciones bajo las cuales cambiaria la decision.
4. Tres recomendaciones accionables.

No prometas rentabilidades y aclara que no es asesoria financiera, legal ni tributaria.

Datos:
- Direccion: ${unit.address}
- Distrito: ${zone.district}, ${zone.city}
- Unidad: ${unit.bedrooms === 0 ? "Studio" : `${unit.bedrooms} dormitorios`}, ${unit.areaM2} m2, ${unit.furnished ? "amoblado" : "sin amoblar"}
- Valor del inmueble: ${money(unit.propertyValue)}
- Mantenimiento mensual: ${money(unit.maintenance)}
- Ganador base: ${winnerLabel}
- Neto renta fija: ${money(result.fixed.netMonthly)}
- Neto Airbnb: ${money(result.airbnb.netMonthly)}
- Diferencia mensual: ${money(Math.abs(result.monthlyDelta))}
- Break-even ocupacion Airbnb: ${pct(result.breakevenOccupancy)}
- Ocupacion estimada zona: ${pct(assumptions.occupancy)}
- ADR Airbnb supuesto: ${money(assumptions.adr)}
- Renta fija supuesta: ${money(assumptions.fixedRent)}
- Gestion Airbnb: ${pct(assumptions.airbnbManagementPct)}
- Comision plataforma: ${pct(assumptions.platformPct)}
- Impuesto supuesto: ${pct(assumptions.taxPct)}
- Nota zona: ${zone.note}`;

  async function copyPromptForChatGpt() {
    await navigator.clipboard.writeText(chatGptPrompt);
    setCopiedPrompt(true);
    window.setTimeout(() => setCopiedPrompt(false), 2200);
  }

  return (
    <div className="result-layout">
      <div className="grid">
        <section className="verdict">
          <span className={`badge ${result.winner === "fixed" ? "fixed" : result.winner === "airbnb" ? "airbnb" : "neutral"}`}>
            {winnerLabel}
          </span>
          <h1>
            {result.winner === "tie"
              ? "La diferencia es menor a 10%; decide por tu perfil operativo."
              : `${winnerLabel} por aproximadamente ${deltaText}.`}
          </h1>
          <p className="muted">
            Base: {unit.bedrooms === 0 ? "Studio" : `${unit.bedrooms}D`} · {unit.areaM2} m2 ·{" "}
            {unit.furnished ? "amoblado" : "sin amoblar"} en {zone.district}. Para que Airbnb gane necesita al menos{" "}
            <strong>{pct(result.breakevenOccupancy)}</strong> de ocupacion.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="button secondary" type="button">
              <Download size={18} /> PDF
            </button>
            <button className="button secondary" type="button">
              <Share2 size={18} /> Compartir
            </button>
          </div>
        </section>

        <section className="grid two">
          <ScenarioCard confidence="media-alta · 24 comparables" mode="fixed" result={result.fixed} title="Renta fija" />
          <ScenarioCard confidence="media · 31 listings activos" mode="airbnb" result={result.airbnb} title="Airbnb" />
        </section>

        <section className="card">
          <span className="eyebrow">Break-even de ocupacion</span>
          <h2>Umbral Airbnb: {pct(result.breakevenOccupancy)}</h2>
          <div className="bullet" aria-label="Ocupacion estimada versus punto de equilibrio">
            <div className="bullet-fill" style={{ width: `${Math.min(100, assumptions.occupancy * 100)}%` }} />
            <span className="bullet-line" style={{ left: `${Math.min(100, result.breakevenOccupancy * 100)}%` }} />
          </div>
          <p className="muted">
            La zona se estima en {pct(assumptions.occupancy)}. Si la barra queda a la derecha de la linea, Airbnb supera
            la renta fija bajo los supuestos actuales.
          </p>
        </section>

        <section className="card">
          <span className="eyebrow">Estacionalidad</span>
          <h2>Ocupacion y ADR esperado por mes</h2>
          <SeasonalityChart />
        </section>

        <section className="card">
          <span className="eyebrow">Simulador</span>
          <h2>Ajusta los supuestos</h2>
          <div className="slider-grid">
            {[
              ["adr", "ADR Airbnb", 120, 420, 5, assumptions.adr],
              ["occupancy", "Ocupacion", 0.25, 0.9, 0.01, assumptions.occupancy],
              ["fixedRent", "Renta fija", 1200, 6500, 50, assumptions.fixedRent],
              ["airbnbManagementPct", "Gestion Airbnb", 0, 0.3, 0.01, assumptions.airbnbManagementPct],
              ["platformPct", "Comision plataforma", 0.08, 0.2, 0.01, assumptions.platformPct],
              ["taxPct", "Impuesto supuesto", 0, 0.12, 0.01, assumptions.taxPct]
            ].map(([key, label, min, max, step, value]) => (
              <label className="field" key={String(key)}>
                <span className="label">
                  {label}: {Number(value) <= 1 ? pct(Number(value)) : money(Number(value))}
                </span>
                <input
                  className="range"
                  max={Number(max)}
                  min={Number(min)}
                  onChange={(event) => updateAssumption(key as keyof MarketAssumptions, Number(event.target.value))}
                  step={Number(step)}
                  type="range"
                  value={Number(value)}
                />
              </label>
            ))}
          </div>
          <button className="button secondary" onClick={() => setAssumptions(baseAssumptions)} style={{ marginTop: 18 }} type="button">
            <RotateCcw size={18} /> Restaurar valores de mercado
          </button>
        </section>

        <section className="card">
          <span className="eyebrow">Narrativa IA</span>
          <h2>Analisis con tu ChatGPT</h2>
          <p className="muted">
            En {zone.district}, Airbnb gana cuando sostienes ocupacion por encima de {pct(result.breakevenOccupancy)} y
            controlas gestion, limpieza y servicios. La renta fija se vuelve mas atractiva si priorizas estabilidad,
            menos horas operativas y menor exposicion al reglamento del edificio.
          </p>
          <button className="button primary" onClick={copyPromptForChatGpt} type="button">
            <Clipboard size={18} /> {copiedPrompt ? "Prompt copiado" : "Copiar prompt para ChatGPT"}
          </button>
          <div className="ai-box">
            <span className="badge neutral">Sin costo API</span>
            <p>{chatGptPrompt}</p>
          </div>
        </section>
      </div>

      <aside className="rail grid">
        <section className="card">
          <span className="eyebrow">Zona</span>
          <h2>{zone.district}</h2>
          <p className="muted">{zone.note}</p>
          <div className="cost-row">
            <span>ADR mediano</span>
            <strong>{money(zone.adr)}</strong>
          </div>
          <div className="cost-row">
            <span>Ocupacion</span>
            <strong>{pct(zone.occupancy)}</strong>
          </div>
          <div className="cost-row">
            <span>Ventaja Airbnb</span>
            <strong>{pct(zone.airbnbAdvantage)}</strong>
          </div>
        </section>
        <section className="card">
          <span className="eyebrow">Regulacion</span>
          <h2>
            {zone.regulation === "green" ? "Riesgo bajo" : zone.regulation === "yellow" ? "Revisar edificio" : "Alto riesgo"}
          </h2>
          <p className="muted">
            Checklist: reglamento interno, acta de junta, zonificacion, reglas de seguridad y autorizacion de subarriendo.
          </p>
        </section>
      </aside>
    </div>
  );
}

import { ScenarioResult, money, pct } from "@/lib/yield";

export function ScenarioCard({
  mode,
  title,
  result,
  confidence
}: {
  mode: "fixed" | "airbnb";
  title: string;
  result: ScenarioResult;
  confidence: string;
}) {
  return (
    <article className={`card scenario ${mode}`}>
      <span className={`badge ${mode}`}>{title}</span>
      <div className="big-number">{money(result.netMonthly)}</div>
      <p className="muted">neto mensual estimado</p>
      <div className="grid two" style={{ margin: "18px 0" }}>
        <div>
          <span className="label">Bruto mensual</span>
          <strong>{money(result.grossMonthly)}</strong>
        </div>
        <div>
          <span className="label">Yield neto anual</span>
          <strong>{pct(result.annualYield)}</strong>
        </div>
      </div>
      {result.costs.map((cost) => (
        <div className="cost-row" key={cost.label}>
          <span className="muted">{cost.label}</span>
          <strong>{money(cost.value)}</strong>
        </div>
      ))}
      <div className="cost-row">
        <span>Costos totales</span>
        <strong>{money(result.totalCosts)}</strong>
      </div>
      <p className="muted">Confianza: {confidence}</p>
    </article>
  );
}

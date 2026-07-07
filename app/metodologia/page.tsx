import { Topbar } from "@/components/Topbar";

export default function MethodologyPage() {
  return (
    <main className="shell">
      <Topbar />
      <section className="page">
        <span className="eyebrow">Metodologia</span>
        <h1 className="section-title">Como calcula RentIQ</h1>
        <div className="grid two">
          <article className="card">
            <h2>Airbnb</h2>
            <p className="muted">
              Ingreso bruto = ADR x ocupacion x 30.4 dias. El neto descuenta comision de plataforma, limpieza por
              rotacion, servicios, mantenimiento, insumos, gestion e impuesto supuesto.
            </p>
          </article>
          <article className="card">
            <h2>Renta fija</h2>
            <p className="muted">
              Ingreso bruto = renta comparable o renta actual del propietario. El neto descuenta mantenimiento,
              vacancia prorrateada, gestion opcional e impuesto supuesto.
            </p>
          </article>
          <article className="card">
            <h2>Break-even</h2>
            <p className="muted">
              Resolvemos la ocupacion donde el neto Airbnb iguala el neto fijo. Ese umbral revela cuanto riesgo
              comercial debes aceptar para que Airbnb tenga sentido.
            </p>
          </article>
          <article className="card">
            <h2>Disclaimer</h2>
            <p className="muted">
              Esta herramienta no es asesoria financiera, legal ni tributaria. Valida normativa municipal, reglamento
              interno y tratamiento tributario con profesionales antes de invertir.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

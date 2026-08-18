import type { Metadata } from "next";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "Terminos | RentIQ",
  description: "Terminos de uso de RentIQ."
};

export default function TermsPage() {
  return (
    <main className="shell">
      <Topbar />
      <section className="page legal-page">
        <span className="eyebrow">Legal</span>
        <h1 className="section-title">Terminos de uso</h1>
        <p>
          RentIQ entrega estimaciones para comparar renta fija y alquiler temporal. Los resultados dependen de datos,
          supuestos y parametros ingresados por el usuario.
        </p>
        <h2>No es asesoria profesional</h2>
        <p>
          La informacion no constituye asesoria financiera, legal, tributaria, inmobiliaria ni de inversion. Antes de
          tomar decisiones, valida el reglamento del edificio, normativa municipal, impuestos y condiciones de mercado
          con profesionales calificados.
        </p>
        <h2>Uso de reportes</h2>
        <p>
          Los reportes pueden usarse como apoyo de decision o conversacion comercial. No garantizan rentabilidad,
          ocupacion, valorizacion, aprobacion normativa ni ingresos futuros.
        </p>
        <h2>Pagos y servicios</h2>
        <p>
          Los planes pagados pueden activarse mediante links de pago o contacto comercial. Las condiciones especificas
          de entrega, alcance y soporte se confirman al momento de compra.
        </p>
      </section>
    </main>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, CircleDollarSign, ShieldCheck, Sparkles } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { checkoutHref, monetizationPlans, salesContactUrl } from "@/lib/commerce";

export const metadata: Metadata = {
  title: "Precios | RentIQ",
  description: "Planes de RentIQ para comparar Airbnb vs renta fija, comprar reportes y activar seguimiento mensual."
};

export default function PricingPage() {
  return (
    <main className="shell">
      <Topbar />
      <section className="page">
        <span className="eyebrow">Precios</span>
        <h1 className="section-title">Monetizacion lista para reportes, Pro y agentes</h1>
        <p className="muted lead">
          RentIQ vende una decision: si una unidad debe quedarse en renta fija, migrar a Airbnb o descartarse. La
          prueba gratis captura interes; los planes pagados desbloquean profundidad, seguimiento y uso comercial.
        </p>

        <div className="grid four pricing-grid">
          {monetizationPlans.map((plan) => (
            <article className={`card pricing-card ${plan.highlighted ? "highlighted" : ""}`} key={plan.id}>
              <div className="plan-head">
                <span className="badge neutral">{plan.audience}</span>
                {plan.highlighted ? <span className="badge airbnb">Mas vendible</span> : null}
              </div>
              <h2>{plan.name}</h2>
              <div className="price-line">
                <strong>{plan.price}</strong>
                <span>{plan.billing}</span>
              </div>
              <p className="muted">{plan.description}</p>
              <Link className={`button ${plan.highlighted ? "primary" : "secondary"}`} href={checkoutHref(plan)}>
                {plan.cta} <ArrowRight size={16} />
              </Link>
              <div className="feature-list">
                {plan.features.map((feature) => (
                  <p key={feature}>
                    <Check color="#16a34a" size={16} /> {feature}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <section className="commercial-band">
          <article>
            <CircleDollarSign size={24} />
            <h2>Checkout configurable</h2>
            <p>
              Usa Stripe Payment Links con variables `NEXT_PUBLIC_STRIPE_REPORT_LINK`, `NEXT_PUBLIC_STRIPE_PRO_LINK`
              y `NEXT_PUBLIC_STRIPE_AGENCY_LINK`. Si no estan configuradas, los CTAs derivan a contacto comercial.
            </p>
          </article>
          <article>
            <Sparkles size={24} />
            <h2>Oferta empaquetada</h2>
            <p>
              El producto cobra por claridad accionable: veredicto, sensibilidad, riesgos, checklist y narrativa para
              tomar o vender una decision inmobiliaria.
            </p>
          </article>
          <article>
            <ShieldCheck size={24} />
            <h2>Base confiable</h2>
            <p>
              Los datasets se versionan en GitHub y se actualizan desde Drive. Cada reporte muestra supuestos,
              periodo y disclaimer financiero/legal.
            </p>
          </article>
        </section>

        <section className="card contact-card" id="contacto">
          <div>
            <span className="eyebrow">Venta asistida</span>
            <h2>Cierra los primeros clientes con contacto directo</h2>
            <p className="muted">
              Antes de automatizar todo, conviene hablar con compradores reales: propietarios, inversionistas y agentes.
              Eso valida precio, objeciones y formato de reporte.
            </p>
          </div>
          <Link className="button primary" href={salesContactUrl}>
            Contactar ventas <ArrowRight size={16} />
          </Link>
        </section>

        <section className="faq-grid">
          {[
            ["Que se cobra primero?", "El reporte por unidad. Es facil de entender, tiene urgencia y no exige login."],
            ["Cuando activar suscripcion?", "Cuando el usuario evalua varias unidades o necesita actualizaciones mensuales."],
            ["Hace falta API de IA?", "No para esta version. El analisis premium se apoya en el paquete exportable para ChatGPT."],
            ["Que falta para cobro 100% automatico?", "Crear Payment Links en Stripe y pegarlos como variables de entorno en Vercel."]
          ].map(([question, answer]) => (
            <article className="card compact-card" key={question}>
              <h3>{question}</h3>
              <p className="muted">{answer}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

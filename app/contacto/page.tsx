import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { planById, salesContactUrl, salesEmail } from "@/lib/commerce";

export const metadata: Metadata = {
  title: "Contacto | RentIQ",
  description: "Contacta a RentIQ para comprar reportes, activar Pro o solicitar una demo para agentes."
};

export default function ContactPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const rawPlan = Array.isArray(searchParams.plan) ? searchParams.plan[0] : searchParams.plan;
  const plan = planById(rawPlan);
  const subject = encodeURIComponent(`RentIQ - interes en plan ${plan.name}`);
  const body = encodeURIComponent(
    `Hola, quiero informacion para activar el plan ${plan.name} (${plan.price} ${plan.billing}).\n\nMi caso:\n- Ciudad/distrito:\n- Tipo de inmueble:\n- Objetivo: comprar / alquilar / migrar a Airbnb / captar propietarios\n`
  );
  const mailto = salesContactUrl.startsWith("mailto:")
    ? `mailto:${salesEmail}?subject=${subject}&body=${body}`
    : salesContactUrl;

  return (
    <main className="shell">
      <Topbar />
      <section className="page contact-layout">
        <div>
          <span className="eyebrow">Contacto comercial</span>
          <h1 className="section-title">Activa RentIQ {plan.name}</h1>
          <p className="muted lead">
            Para los primeros clientes, el cierre asistido es mejor que esconder todo detras de checkout: permite
            entender la objecion, ajustar el reporte y validar el precio real del mercado.
          </p>
          <div className="contact-actions">
            <Link className="button primary" href={mailto}>
              <Mail size={18} /> Escribir a ventas
            </Link>
            <Link className="button secondary" href="/app/nueva">
              Probar con una unidad <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <aside className="card">
          <span className="badge airbnb">Plan seleccionado</span>
          <h2>{plan.name}</h2>
          <div className="price-line">
            <strong>{plan.price}</strong>
            <span>{plan.billing}</span>
          </div>
          <p className="muted">{plan.description}</p>
          <div className="feature-list">
            {plan.features.map((feature) => (
              <p key={feature}>
                <ShieldCheck color="#16a34a" size={16} /> {feature}
              </p>
            ))}
          </div>
        </aside>
      </section>

      <section className="page">
        <div className="commercial-band">
          <article>
            <MessageSquare size={24} />
            <h2>Datos que conviene enviar</h2>
            <p>Distrito, m2, dormitorios, valor del inmueble, renta actual y si el edificio permite alquiler temporal.</p>
          </article>
          <article>
            <ShieldCheck size={24} />
            <h2>Promesa correcta</h2>
            <p>RentIQ estima escenarios y riesgos. No reemplaza tasacion, asesoria tributaria, legal ni financiera.</p>
          </article>
        </div>
      </section>
    </main>
  );
}

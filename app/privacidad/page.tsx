import type { Metadata } from "next";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "Privacidad | RentIQ",
  description: "Politica de privacidad de RentIQ."
};

export default function PrivacyPage() {
  return (
    <main className="shell">
      <Topbar />
      <section className="page legal-page">
        <span className="eyebrow">Privacidad</span>
        <h1 className="section-title">Politica de privacidad</h1>
        <p>
          RentIQ minimiza datos personales. La version actual calcula escenarios en la experiencia web y evita enviar
          informacion sensible a servicios de IA.
        </p>
        <h2>Datos de evaluacion</h2>
        <p>
          Los parametros ingresados se usan para construir una comparacion inmobiliaria. El modo de exportacion a
          ChatGPT genera un prompt o link que el usuario decide copiar y compartir manualmente.
        </p>
        <h2>Google Drive y datasets</h2>
        <p>
          La carpeta de Drive funciona como fuente operativa editable de datasets. La app publica usa copias
          versionadas en GitHub para evitar exponer permisos privados o credenciales de Drive.
        </p>
        <h2>Pagos</h2>
        <p>
          Cuando se activen links de pago externos, el proveedor de pagos procesara la informacion necesaria para la
          transaccion bajo sus propias politicas.
        </p>
      </section>
    </main>
  );
}

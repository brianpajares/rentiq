"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calculator } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { zones } from "@/lib/market-data";

export default function NewRunPage() {
  const router = useRouter();
  const [bedrooms, setBedrooms] = useState(2);

  function submit(formData: FormData) {
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      params.set(key, String(value));
    }
    params.set("bedrooms", String(bedrooms));
    router.push(`/app/unidad/demo?${params.toString()}`);
  }

  return (
    <main className="shell">
      <Topbar />
      <section className="page">
        <form action={submit} className="card form-card">
          <span className="eyebrow">Nueva evaluacion</span>
          <h1 className="section-title">Compara tu departamento</h1>

          <div className="form-section">
            <h2>Ubicacion</h2>
            <div className="field-grid">
              <label className="field">
                <span className="label">Direccion o proyecto</span>
                <input name="address" defaultValue="Av. Jose Pardo 620" required />
              </label>
              <label className="field">
                <span className="label">Distrito</span>
                <select name="district" defaultValue="Miraflores">
                  {zones.map((zone) => (
                    <option key={zone.id} value={zone.district}>
                      {zone.district}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="form-section">
            <h2>Unidad</h2>
            <label className="field">
              <span className="label">Dormitorios</span>
              <div className="segmented">
                {[0, 1, 2, 3, 4].map((value) => (
                  <button
                    className={`segment ${bedrooms === value ? "active" : ""}`}
                    key={value}
                    onClick={() => setBedrooms(value)}
                    type="button"
                  >
                    {value === 0 ? "Studio" : value}
                  </button>
                ))}
              </div>
            </label>
            <div className="field-grid">
              <label className="field">
                <span className="label">Banos</span>
                <input name="bathrooms" defaultValue="2" min="1" step="0.5" type="number" />
              </label>
              <label className="field">
                <span className="label">Area m2</span>
                <input name="areaM2" defaultValue="65" min="25" type="number" />
              </label>
              <label className="field">
                <span className="label">Amoblado</span>
                <select name="furnished" defaultValue="true">
                  <option value="true">Si</option>
                  <option value="false">No</option>
                </select>
              </label>
              <label className="field">
                <span className="label">Piso / vista</span>
                <select name="view" defaultValue="standard">
                  <option value="standard">Estandar</option>
                  <option value="high">Piso alto</option>
                  <option value="premium">Vista premium</option>
                </select>
              </label>
            </div>
          </div>

          <div className="form-section">
            <h2>Valor</h2>
            <div className="field-grid">
              <label className="field">
                <span className="label">Valor del inmueble</span>
                <input name="propertyValue" defaultValue="510000" min="100000" type="number" />
              </label>
              <label className="field">
                <span className="label">Mantenimiento mensual</span>
                <input name="maintenance" defaultValue="380" min="0" type="number" />
              </label>
              <label className="field">
                <span className="label">Renta actual opcional</span>
                <input name="currentRent" min="0" placeholder="Ej. 2800" type="number" />
              </label>
            </div>
          </div>

          <button className="button primary" type="submit">
            <Calculator size={18} /> Comparar escenarios
          </button>
        </form>
      </section>
    </main>
  );
}

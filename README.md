# RentIQ

RentIQ compara dos escenarios de explotacion para un departamento: renta fija versus Airbnb. La app esta construida con Next.js 14, React, TypeScript y Recharts, usando datasets curados de Lima y Cusco administrados en Google Drive y versionados en GitHub para produccion.

## Funcionalidades incluidas

- Landing de producto.
- Formulario de evaluacion de unidad.
- Resultado comparativo lado a lado: renta fija vs Airbnb.
- Motor de calculo puro en `lib/yield.ts`.
- Simulador client-side con sliders para ADR, ocupacion, renta fija, gestion, comision e impuesto.
- Break-even de ocupacion.
- Curvas de estacionalidad con Recharts.
- Mapa exploratorio de ventaja Airbnb por zona.
- Paginas publicas de precios y metodologia.
- Tests basicos de formulas.
- Datasets operativos en `datasets/` con copias editables en Google Drive.
- Capa comercial con planes Free, Reporte, Pro y Agentes.
- CTAs de monetizacion listos para Stripe Payment Links o contacto comercial.
- Paginas basicas de contacto, terminos, privacidad, robots y sitemap.

## Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Recharts
- Lucide React
- Zod preparado como dependencia para validaciones
- MapLibre GL instalado para la fase de mapa real

## Datasets Operativos

La app lee datasets versionados desde:

```text
datasets/
```

Tambien se creo una carpeta en Google Drive llamada:

```text
RentIQ Datasets
```

Esa carpeta contiene copias editables para actualizacion mensual o bajo demanda. En produccion, Vercel usa los datasets del repo para no depender de permisos privados de Drive ni variables de entorno.

Documentacion:

```text
docs/datasets.md
```

## Rutas principales

- `/` landing
- `/app` historial de evaluaciones
- `/app/nueva` formulario
- `/app/unidad/resultado` resultado comparativo
- `/app/mapa` explorador de mercado
- `/precios` planes
- `/metodologia` formulas, datasets y disclaimers

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abrir:

```text
http://localhost:3000
```

## Validacion

```bash
npm run build
npm run lint
npm test
```

Nota: en este entorno de Codex, `npm test` necesito permiso fuera del sandbox porque `tsx/esbuild` inicia un worker.

## Monetizacion

La app esta preparada para vender:

- Reporte por unidad: producto inicial recomendado.
- Pro mensual: para inversionistas que evaluan varias unidades.
- Agentes: plan comercial para corredores y brokers.

Configurar variables opcionales:

```text
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SALES_EMAIL
NEXT_PUBLIC_SALES_CONTACT_URL
NEXT_PUBLIC_STRIPE_REPORT_LINK
NEXT_PUBLIC_STRIPE_PRO_LINK
NEXT_PUBLIC_STRIPE_AGENCY_LINK
```

Si los links de Stripe estan vacios, los botones pagados llevan a `/contacto`.

Playbook:

```text
docs/monetization.md
```

## Arquitectura De Datos En Produccion

```text
Repo GitHub = fuente oficial del producto
Google Drive = fuente editable de datasets mensuales
Vercel = hosting publico de la app
RentIQ web app = calculadora, reporte y flujo comercial
```

Documentos clave:

- `docs/datasets.md`
- `docs/monetization.md`

## Modelo de calculo

El motor vive en `lib/yield.ts`.

### Airbnb

```text
bruto mensual = ADR x ocupacion x 30.4
neto mensual = bruto - plataforma - limpieza - servicios - mantenimiento - insumos - gestion - impuesto
```

### Renta fija

```text
bruto mensual = renta comparable o renta actual
neto mensual = bruto - mantenimiento - vacancia prorrateada - gestion - impuesto
```

### Break-even

RentIQ resuelve la ocupacion donde:

```text
neto_airbnb(ocupacion) = neto_renta_fija
```

## Proximas integraciones

- Supabase Auth y tablas reales del PRD.
- PostGIS/H3 para metricas geograficas.
- API `/api/yield-runs`.
- Stripe para reporte unico y planes Pro/Agente.
- Fuentes reales de mercado con actualizacion mensual.
- PDF premium.
- n8n para ingesta y alertas mensuales.

## Disclaimer

RentIQ no es asesoria financiera, legal ni tributaria. Las cifras son estimaciones y deben validarse con data real, reglamento interno del edificio, normativa municipal y asesoria profesional antes de tomar decisiones de inversion.

# RentIQ

RentIQ compara dos escenarios de explotacion para un departamento: renta fija versus Airbnb. El MVP esta construido con Next.js 14, React, TypeScript y Recharts, usando datos simulados de Lima y Cusco para validar la experiencia antes de conectar Supabase, Stripe y fuentes reales.

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
- ChatGPT Export / Fetch inverso sin usar API de IA.

## Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Recharts
- Lucide React
- Zod preparado como dependencia para validaciones
- MapLibre GL instalado para la fase de mapa real

## Rutas principales

- `/` landing
- `/app` historial demo
- `/app/nueva` formulario
- `/app/unidad/demo` resultado comparativo
- `/app/mapa` explorador de mercado
- `/precios` planes
- `/metodologia` formulas y disclaimers

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

## Flujo ChatGPT Export / Fetch Inverso

RentIQ no usa API de IA. La app genera un paquete estructurado de analisis para que el usuario lo lleve manualmente a ChatGPT Plus/Pro.

Modos disponibles:

- **Modo privado:** boton **Copiar prompt para ChatGPT**. Copia Markdown completo al portapapeles. Recomendado para datos sensibles.
- **Modo rapido:** boton **Copiar link fetch para ChatGPT**. Copia un link `/api/chatgpt-export?p=...` que devuelve Markdown legible. No usa almacenamiento persistente.

Privacidad:

- La direccion exacta no se comparte por defecto.
- El link codifica datos en la URL; para datos sensibles usar el prompt directo.
- No configurar claves de API de IA.
- No instalar SDKs de OpenAI, Anthropic ni similares.
- No hay costo de tokens API.

## Arquitectura Recomendada Sin Costos API

```text
Repo GitHub = fuente oficial del producto
docs/analysis-kit.md = marco de pensamiento
ChatGPT Project o Custom GPT = asistente de analisis
RentIQ web app = calculadora y generador de prompts
```

Documentos clave:

- `docs/analysis-kit.md`
- `docs/chatgpt-assistant.md`

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
- PDF premium.
- n8n para ingesta y alertas mensuales.

## Disclaimer

RentIQ no es asesoria financiera, legal ni tributaria. Las cifras son estimaciones y deben validarse con data real, reglamento interno del edificio, normativa municipal y asesoria profesional antes de tomar decisiones de inversion.

# RentIQ Monetization Playbook

## Oferta Inicial

RentIQ debe monetizar primero con un reporte por unidad. Es el producto mas facil de comprar porque resuelve una decision concreta: mantener renta fija, migrar a Airbnb, comprar, descartar o analizar mas.

## Planes

- Free: comparador demo y mapa para generar confianza.
- Reporte: S/ 79 por unidad, con analisis ejecutivo, riesgos, sensibilidad y checklist.
- Pro: S/ 129 mensual para inversionistas que comparan varias unidades.
- Agentes: desde S/ 349 mensual para brokers que usan RentIQ como herramienta de captacion.

## Activacion De Cobro

La app soporta Stripe Payment Links mediante variables de entorno:

```text
NEXT_PUBLIC_STRIPE_REPORT_LINK
NEXT_PUBLIC_STRIPE_PRO_LINK
NEXT_PUBLIC_STRIPE_AGENCY_LINK
```

Si esas variables estan vacias, los botones pagados llevan a `/contacto`. Esto permite vender manualmente antes de automatizar todo el checkout.

## Flujo Comercial Recomendado

1. El usuario compara una unidad gratis.
2. RentIQ muestra el ganador, break-even y riesgos.
3. El usuario ve el bloque premium en el resultado.
4. El CTA ofrece comprar el reporte.
5. Si Stripe esta configurado, va al checkout.
6. Si Stripe no esta configurado, va a contacto comercial.

## Que Falta Para Escalar

- Crear productos y Payment Links en Stripe.
- Configurar variables en Vercel.
- Agregar autenticacion y portafolio para Pro.
- Agregar generacion real de PDF premium.
- Conectar leads a CRM, Google Sheets, HubSpot o Airtable.
- Automatizar actualizacion mensual de datasets.

## Principio De Margen

No activar analisis por API hasta que exista paywall, limites de uso y control de costos. La version actual mantiene el costo bajo usando export manual hacia ChatGPT Plus/Pro.

# RentIQ No-API Setup Guide

Esta guia explica como usar RentIQ con ChatGPT Plus/Pro sin API, sin `OPENAI_API_KEY` y sin costos adicionales por tokens.

## Arquitectura Final Recomendada

```text
GitHub repo = fuente oficial del producto
Vercel = hosting publico de la app
RentIQ app = calculadora + generador de prompt
Analysis Kit = marco de pensamiento
ChatGPT Project = asistente de analisis usando tu cuenta Plus/Pro
Custom GPT = opcional, cuando quieras empaquetarlo mejor
```

## Documentos Que Debes Tener

### 1. README.md

Archivo:

```text
README.md
```

Uso:

- Explica que es RentIQ.
- Documenta rutas, stack y comandos.
- Declara que el analisis se hace sin API.
- Sirve como pagina principal del repo en GitHub.

### 2. Analysis Kit

Archivo:

```text
docs/analysis-kit.md
```

Uso:

- Define el marco de pensamiento.
- Explica como decidir entre renta fija y Airbnb.
- Define criterios de veredicto, break-even, riesgos y recomendaciones.
- Es el documento principal para que ChatGPT razone bien.

### 3. ChatGPT Assistant Instructions

Archivo:

```text
docs/chatgpt-assistant.md
```

Uso:

- Tiene instrucciones listas para pegar en un ChatGPT Project o Custom GPT.
- Define tono, formato de respuesta y reglas.
- Evita que el asistente sugiera API salvo que lo pidas expresamente.

### 4. PRD Original

Archivo original:

```text
PRD_03_RentIQ_Airbnb_Fixed_Rental_Comparator.md
```

Uso:

- Documento maestro del producto.
- Puedes subirlo al Project de ChatGPT como contexto adicional.
- No es obligatorio para el dia a dia, pero sirve para decisiones de producto.

### 5. Prompt Generado Por La App

Origen:

```text
Boton "Copiar prompt para ChatGPT" dentro de RentIQ
```

Uso:

- Es el documento dinamico de cada evaluacion.
- Contiene numeros, supuestos y resultado.
- Lo pegas en ChatGPT para obtener el analisis.

## Paso A Paso Para Configurar ChatGPT Sin API

### Paso 1: Mantener GitHub Como Fuente Oficial

Repo:

```text
https://github.com/brianpajares/rentiq
```

Este repo debe contener:

```text
README.md
docs/analysis-kit.md
docs/chatgpt-assistant.md
docs/no-api-setup-guide.md
```

Cada cambio importante del producto debe ir al repo.

### Paso 2: Publicar La App En Vercel

1. Entra a:

```text
https://vercel.com/new
```

2. Importa el repo:

```text
brianpajares/rentiq
```

3. Usa esta configuracion:

```text
Framework Preset: Next.js
Build Command: npm run build
Install Command: npm install
Output Directory: default / vacio
Root Directory: default / vacio
```

4. No agregues estas variables:

```text
OPENAI_API_KEY
OPENAI_MODEL
```

No hacen falta porque no usaremos API.

5. Haz deploy.

### Paso 3: Crear Un Project En ChatGPT

En ChatGPT:

1. Ve a Projects.
2. Crea un proyecto llamado:

```text
RentIQ Analyst
```

3. Sube estos archivos:

```text
README.md
docs/analysis-kit.md
docs/chatgpt-assistant.md
docs/no-api-setup-guide.md
```

4. Opcionalmente sube:

```text
PRD_03_RentIQ_Airbnb_Fixed_Rental_Comparator.md
```

### Paso 4: Pegar Instrucciones En El Project

Copia las instrucciones desde:

```text
docs/chatgpt-assistant.md
```

Pega la seccion:

```text
Instrucciones Para El Project O Custom GPT
```

en las instrucciones del Project.

### Paso 5: Usar RentIQ En El Dia A Dia

1. Abre la app RentIQ publicada.
2. Crea una evaluacion.
3. Revisa el resultado.
4. Haz clic en:

```text
Copiar prompt para ChatGPT
```

5. Abre el Project:

```text
RentIQ Analyst
```

6. Pega el prompt.
7. Pide el formato que necesites:

```text
Analiza esta evaluacion para un propietario.
```

```text
Convierte esto en un resumen para inversionista.
```

```text
Redacta un reporte premium para PDF.
```

## Custom GPT Opcional

Crea un Custom GPT solo cuando quieras:

- Compartirlo con tu equipo.
- Tener starters predefinidos.
- Empaquetar el asistente como producto interno.
- Mantener instrucciones fijas mas pulidas.

Para el MVP, el Project es suficiente.

## Reglas Para Evitar Cobros Extra

No hacer:

```text
No crear OPENAI_API_KEY en Vercel
No agregar endpoints /api/openai o /api/analizar
No instalar SDK de OpenAI para produccion
No automatizar analisis dentro de la web todavia
```

Si algun dia se activa API, hacerlo solo con:

- Paywall.
- Limites de uso.
- Presupuesto mensual.
- Logs de consumo.
- Usuarios pagando.

## Checklist Final

Antes de lanzar:

```text
[ ] App publicada en Vercel
[ ] No hay OPENAI_API_KEY en Vercel
[ ] Boton "Copiar prompt para ChatGPT" funciona
[ ] Project "RentIQ Analyst" creado
[ ] README.md subido al Project
[ ] docs/analysis-kit.md subido al Project
[ ] docs/chatgpt-assistant.md subido al Project
[ ] docs/no-api-setup-guide.md subido al Project
[ ] PRD subido como contexto opcional
[ ] Primer prompt de prueba analizado en ChatGPT
```


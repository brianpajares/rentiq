# RentIQ No-API Setup Guide

Esta guia explica como usar RentIQ con ChatGPT Plus/Pro sin API, sin `OPENAI_API_KEY` y sin costos adicionales por tokens.

## Arquitectura Final Recomendada

```text
GitHub repo = fuente oficial del producto
Google Drive = fuente editable de datasets mensuales
Vercel = hosting publico de la app
RentIQ app = calculadora + generador de prompt/link fetch
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

### 4. Dataset Guide

Archivo:

```text
docs/datasets.md
```

Uso:

- Explica que hace cada dataset.
- Define cadencia mensual o bajo demanda.
- Documenta como Drive alimenta el repo y como el repo alimenta Vercel.

### 5. Prompt Generado Por La App

Origen:

```text
Boton "Copiar prompt para ChatGPT" dentro de RentIQ
```

Uso:

- Es el documento dinamico de cada evaluacion.
- Contiene numeros, supuestos y resultado.
- Lo pegas en ChatGPT para obtener el analisis.

### 6. Link Fetch Para ChatGPT

Origen:

```text
Boton "Copiar link fetch para ChatGPT" dentro de RentIQ
```

Uso:

- Genera un link interno `/api/chatgpt-export?p=...`.
- La ruta devuelve `text/markdown`.
- No guarda datos en servidor.
- No llama APIs externas.
- Recomendacion: usarlo solo cuando no haya informacion sensible, porque el payload viaja codificado en la URL.

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
docs/datasets.md
datasets/
```

Cada cambio importante del producto debe ir al repo.

### Paso 2: Mantener Google Drive Como Fuente Editable

Carpeta:

```text
RentIQ Datasets
```

Contiene:

```text
zone-market.json
zone-market.csv
seasonality.json
seasonality.csv
operating-assumptions.json
regulatory-risk.json
README-datasets.md
```

Actualiza estos archivos mensual o bajo demanda. Despues copia la version validada al repo en `datasets/` y despliega desde GitHub.

### Paso 3: Publicar La App En Vercel

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

### Paso 4: Crear Un Project En ChatGPT

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
docs/datasets.md
```

### Paso 5: Pegar Instrucciones En El Project

Copia las instrucciones desde:

```text
docs/chatgpt-assistant.md
```

Pega la seccion:

```text
Instrucciones Para El Project O Custom GPT
```

en las instrucciones del Project.

### Paso 6: Usar RentIQ En El Dia A Dia

1. Abre la app RentIQ publicada.
2. Crea una evaluacion.
3. Revisa el resultado.
4. Haz clic en **Copiar prompt para ChatGPT** si hay data sensible.
5. O haz clic en **Copiar link fetch para ChatGPT** si quieres que ChatGPT lea el Markdown desde la app.
6. Abre el Project `RentIQ Analyst`.
7. Pega el prompt o link.
8. Pide el formato que necesites.

## Reglas Para Evitar Cobros Extra

No hacer:

```text
No crear OPENAI_API_KEY en Vercel
No agregar endpoints /api/openai o /api/analizar
No instalar SDK de OpenAI para produccion
No automatizar analisis dentro de la web todavia
No guardar payloads de ChatGPT Export en base de datos
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
[ ] Boton "Copiar link fetch para ChatGPT" funciona
[ ] Carpeta "RentIQ Datasets" creada en Google Drive
[ ] docs/datasets.md subido a Drive
[ ] Project "RentIQ Analyst" creado
[ ] README.md subido al Project
[ ] docs/analysis-kit.md subido al Project
[ ] docs/chatgpt-assistant.md subido al Project
[ ] docs/no-api-setup-guide.md subido al Project
[ ] Primer prompt de prueba analizado en ChatGPT
```

# RentIQ Datasets

Carpeta Drive creada para operacion:

```text
RentIQ Datasets
```

Uso: mantener copias editables de alta calidad de los datasets que alimentan RentIQ. Para produccion, la app lee los archivos versionados en `datasets/` dentro del repositorio. El flujo recomendado es actualizar Drive, validar cambios, copiar al repo y desplegar.

## Cadencia

```text
Mensual o bajo demanda
```

Actualizar antes si cambia una regla municipal, aparece una fuente mejor o se corrige un supuesto operativo relevante.

## Datasets

### zone-market

Archivos:

```text
datasets/zone-market.json
datasets/zone-market.csv
```

Alimenta: `/app`, `/app/mapa`, `/app/nueva`, `/app/unidad/resultado` y `lib/market-data.ts`.

Uso: define los benchmarks por zona para ADR, ocupacion, renta fija por m2 y ventaja Airbnb.

### seasonality

Archivos:

```text
datasets/seasonality.json
datasets/seasonality.csv
```

Uso: grafico mensual de ocupacion y ADR esperado.

### operating-assumptions

Archivo:

```text
datasets/operating-assumptions.json
```

Uso: comision de plataforma, gestion Airbnb, impuesto supuesto, estadia promedio, limpieza, servicios e insumos.

### regulatory-risk

Archivo:

```text
datasets/regulatory-risk.json
```

Uso: resumen cualitativo por distrito. No reemplaza revision legal, municipal ni de reglamento interno.

## Flujo de actualizacion

1. Actualizar los archivos en Google Drive.
2. Revisar que no incluyan datos personales ni direcciones exactas de propietarios.
3. Exportar o copiar la version validada al repo en `datasets/`.
4. Ejecutar `npm run build`, `npm run lint` y `npm test`.
5. Commit y push a GitHub.
6. Vercel despliega desde `main`.

## Reglas de privacidad

- No guardar nombres, correos, telefonos ni datos personales.
- No usar direcciones exactas en datasets compartidos.
- Redondear coordenadas o usar centroides aproximados.
- Mantener `period` y `source` para saber que version alimenta el modelo.

## Nota de produccion

Drive funciona como fuente editable de operacion y el repo como fuente versionada de produccion. Esta decision evita exponer permisos privados de Drive en la app publica y mantiene el deploy de Vercel simple, auditable y sin variables de entorno obligatorias.

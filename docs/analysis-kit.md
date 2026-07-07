# RentIQ Analysis Kit

Este kit define como analizar una evaluacion RentIQ sin usar API. La app genera los numeros y un prompt completo; el analisis se hace manualmente en ChatGPT Plus/Pro.

## Objetivo

Responder con criterio:

```text
Para este departamento, me conviene renta fija o Airbnb, y bajo que condiciones cambiaria la decision?
```

## Principios

1. Comparar netos, no ingresos brutos.
2. Separar rentabilidad de esfuerzo operativo.
3. Tratar el break-even de ocupacion como el numero central.
4. No prometer rentabilidades.
5. Señalar riesgos regulatorios, de edificio, vacancia, estacionalidad y gestion.
6. Mantener el disclaimer: no es asesoria financiera, legal ni tributaria.

## Inputs Minimos

- Direccion o zona.
- Distrito y ciudad.
- Dormitorios, banos, m2 y amoblado.
- Valor del inmueble.
- Mantenimiento mensual.
- Renta fija estimada o renta actual.
- ADR Airbnb.
- Ocupacion estimada.
- Costos: plataforma, limpieza, servicios, gestion e impuesto supuesto.
- Break-even de ocupacion.
- Neto mensual de cada escenario.
- Yield neto anual.
- Nota o semaforo regulatorio.

## Salida Esperada

Usar esta estructura:

```text
1. Veredicto
2. Lectura de numeros
3. Break-even y margen de seguridad
4. Riesgos principales
5. Condiciones que cambiarian la decision
6. Recomendaciones accionables
7. Disclaimer
```

## Criterios de Decision

### Airbnb Gana

Airbnb puede ser mejor cuando:

- El neto mensual supera a renta fija por mas de 10%.
- La ocupacion estimada esta claramente por encima del break-even.
- El edificio permite alquiler temporal.
- El propietario acepta gestion activa o paga property manager.
- La zona tiene demanda turistica o corporativa sostenida.

### Renta Fija Gana

Renta fija puede ser mejor cuando:

- Airbnb gana por menos de 10%.
- La ocupacion estimada esta cerca o debajo del break-even.
- El edificio tiene reglas ambiguas o restrictivas.
- El propietario prioriza estabilidad y bajo esfuerzo.
- Los costos operativos de Airbnb reducen demasiado el margen.

### Empate Tecnico

Si la diferencia neta es menor a 10%, clasificar como empate tecnico. La decision depende del perfil del propietario:

- Conservador: renta fija.
- Operativo/agresivo: Airbnb, solo si regula bien costos y reglas.
- Multi-unidad/property manager: evaluar portafolio y sinergias operativas.

## Checklist Regulatorio

Preguntar o revisar:

1. El reglamento interno permite alquiler temporal?
2. La junta de propietarios ha restringido Airbnb?
3. Hay reglas de registro de huespedes?
4. Hay restricciones municipales aplicables?
5. El contrato o financiamiento limita subarriendo o uso comercial?

## Prompt Base

```text
Actua como analista inmobiliario para RentIQ. Analiza esta evaluacion y dame:
1. Veredicto claro.
2. Riesgos principales.
3. Condiciones bajo las cuales cambiaria la decision.
4. Tres recomendaciones accionables.

No prometas rentabilidades y aclara que no es asesoria financiera, legal ni tributaria.

Datos:
[pegar prompt generado por RentIQ]
```

## Flujo Sin API

1. Crear evaluacion en RentIQ.
2. Copiar el prompt generado.
3. Abrir ChatGPT Plus/Pro.
4. Pegar el prompt dentro del Project o Custom GPT de RentIQ.
5. Guardar la respuesta en el reporte o en notas internas.


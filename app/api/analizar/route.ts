import { NextResponse } from "next/server";

type AnalyzePayload = {
  address?: string;
  district?: string;
  winner?: string;
  fixedNet?: number;
  airbnbNet?: number;
  breakeven?: number;
  occupancy?: number;
};

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-5.5";

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Falta OPENAI_API_KEY. Configurala en Vercel para activar el analisis IA."
      },
      { status: 400 }
    );
  }

  const payload = (await request.json()) as AnalyzePayload;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content:
            "Eres un analista inmobiliario para RentIQ. Responde en espanol, con criterio practico, sin prometer rentabilidades y recordando que no es asesoria financiera, legal ni tributaria."
        },
        {
          role: "user",
          content: `Analiza esta evaluacion RentIQ y dame: veredicto, riesgos, condiciones para cambiar de decision y 3 recomendaciones accionables.

Datos:
- Direccion: ${payload.address || "No especificada"}
- Distrito: ${payload.district || "No especificado"}
- Ganador base: ${payload.winner || "No definido"}
- Neto renta fija: S/ ${Math.round(payload.fixedNet || 0)}
- Neto Airbnb: S/ ${Math.round(payload.airbnbNet || 0)}
- Break-even ocupacion Airbnb: ${Math.round((payload.breakeven || 0) * 100)}%
- Ocupacion estimada zona: ${Math.round((payload.occupancy || 0) * 100)}%`
        }
      ]
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    return NextResponse.json(
      { error: "OpenAI no pudo generar el analisis.", detail },
      { status: response.status }
    );
  }

  const data = await response.json();
  const text =
    data.output_text ||
    data.output?.flatMap((item: any) => item.content || []).map((part: any) => part.text).join("\n") ||
    "No se recibio texto del modelo.";

  return NextResponse.json({ text, model });
}

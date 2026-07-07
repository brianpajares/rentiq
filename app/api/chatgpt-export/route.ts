import { NextResponse } from "next/server";
import { buildChatGPTMarkdown, decodeBase64Url } from "@/lib/chatgpt-export";

export const dynamic = "force-dynamic";

const MAX_PAYLOAD_LENGTH = 12000;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const payload = url.searchParams.get("p");

  if (!payload) {
    return NextResponse.json({ error: "Falta query param p." }, { status: 400 });
  }

  if (payload.length > MAX_PAYLOAD_LENGTH) {
    return NextResponse.json({ error: "Payload demasiado largo." }, { status: 413 });
  }

  try {
    const pack = decodeBase64Url(payload);

    if (!pack || pack.app !== "RentIQ" || !pack.unit || !pack.result) {
      return NextResponse.json({ error: "Payload invalido." }, { status: 400 });
    }

    const markdown = buildChatGPTMarkdown(pack);

    return new Response(markdown, {
      status: 200,
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        "cache-control": "no-store",
        "x-robots-tag": "noindex"
      }
    });
  } catch {
    return NextResponse.json({ error: "Payload invalido." }, { status: 400 });
  }
}

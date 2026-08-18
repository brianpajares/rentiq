import { NextResponse } from "next/server";
import { buildChatGPTMarkdown, decodeBase64Url } from "@/lib/chatgpt-export";

export const dynamic = "force-dynamic";

const MAX_PAYLOAD_LENGTH = 24000;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const payload = url.searchParams.get("p");

  if (!payload) {
    return errorResponse("Falta query param p.", 400);
  }

  if (payload.length > MAX_PAYLOAD_LENGTH) {
    return errorResponse("Payload demasiado largo.", 413);
  }

  try {
    const pack = decodeBase64Url(payload);

    if (!pack || pack.app !== "RentIQ" || !pack.unit || !pack.result) {
      return errorResponse("Payload invalido.", 400);
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
    return errorResponse("Payload invalido.", 400);
  }
}

function errorResponse(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: {
        "cache-control": "no-store",
        "x-robots-tag": "noindex"
      }
    }
  );
}

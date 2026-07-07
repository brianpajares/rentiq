"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle, Copy, Link, ShieldCheck } from "lucide-react";
import {
  buildChatGPTAnalysisPack,
  buildChatGPTFetchUrl,
  buildChatGPTMarkdown
} from "@/lib/chatgpt-export";
import { copyToClipboard } from "@/lib/clipboard";
import type { MarketAssumptions, UnitInput, YieldResult } from "@/lib/yield";

type ChatGPTExportPanelProps = {
  unit: UnitInput & { city?: string; state?: string };
  assumptions: MarketAssumptions;
  result: YieldResult;
  sensitivity?: Record<string, string | number>;
  regulatoryRisk?: Record<string, string>;
  confidence: string;
  zoneNote?: string;
};

const LINK_WARNING_LIMIT = 7600;

export function ChatGPTExportPanel({
  unit,
  assumptions,
  result,
  sensitivity,
  regulatoryRisk,
  confidence,
  zoneNote
}: ChatGPTExportPanelProps) {
  const [status, setStatus] = useState("");
  const [fallbackContent, setFallbackContent] = useState("");

  const privatePack = useMemo(
    () =>
      buildChatGPTAnalysisPack({
        unit,
        assumptions,
        result,
        sensitivity,
        regulatoryRisk,
        confidence,
        privacyMode: "private",
        zoneNote
      }),
    [assumptions, confidence, regulatoryRisk, result, sensitivity, unit, zoneNote]
  );

  const sharePack = useMemo(
    () =>
      buildChatGPTAnalysisPack({
        unit,
        assumptions,
        result,
        sensitivity,
        regulatoryRisk,
        confidence,
        privacyMode: "share_link",
        zoneNote
      }),
    [assumptions, confidence, regulatoryRisk, result, sensitivity, unit, zoneNote]
  );

  const markdown = useMemo(() => buildChatGPTMarkdown(privatePack), [privatePack]);
  const shareLink = useMemo(() => {
    const origin = typeof window === "undefined" ? "" : window.location.origin;
    return origin ? buildChatGPTFetchUrl(sharePack, origin) : "";
  }, [sharePack]);

  async function handleCopyMarkdown() {
    const copied = await copyToClipboard(markdown);
    setStatus(copied ? "Copiado. Pegalo en ChatGPT." : "No se pudo copiar automaticamente.");
    setFallbackContent(copied ? "" : markdown);
  }

  async function handleCopyLink() {
    const copied = await copyToClipboard(shareLink);
    setStatus(copied ? "Link copiado. Pegalo en ChatGPT." : "No se pudo copiar automaticamente.");
    setFallbackContent(copied ? "" : shareLink);
  }

  const linkIsLong = shareLink.length > LINK_WARNING_LIMIT;

  return (
    <section className="card chatgpt-export">
      <div className="chatgpt-export__header">
        <div>
          <span className="eyebrow">ChatGPT Export / Fetch inverso</span>
          <h2>Analizar con ChatGPT sin API</h2>
        </div>
        <span className="badge neutral">
          <ShieldCheck size={14} /> Sin API - Sin token - Sin costo adicional
        </span>
      </div>

      <p className="muted">
        RentIQ no llama a ninguna API de IA. Puedes copiar el analisis y pegarlo en tu Project de ChatGPT para obtener
        una evaluacion experta con tu cuenta actual.
      </p>

      <div className="chatgpt-export__actions">
        <button className="button primary" onClick={handleCopyMarkdown} type="button">
          <Copy size={18} /> Copiar prompt para ChatGPT
        </button>
        <button className="button secondary" onClick={handleCopyLink} type="button">
          <Link size={18} /> Copiar link fetch para ChatGPT
        </button>
      </div>

      {status ? (
        <p className="chatgpt-export__status">
          <CheckCircle size={16} /> {status}
        </p>
      ) : null}

      <div className="privacy-note">
        <AlertTriangle size={18} />
        <p>
          Para maxima privacidad, usa <strong>Copiar prompt</strong>. El modo link codifica los datos en la URL y puede
          contener informacion de la evaluacion, aunque RentIQ remueve la direccion exacta por defecto.
        </p>
      </div>

      {linkIsLong ? (
        <div className="privacy-note privacy-note--warning">
          <AlertTriangle size={18} />
          <p>El link es largo y podria no ser aceptado por algunos navegadores o chats. Usa el prompt directo.</p>
        </div>
      ) : null}

      {fallbackContent ? (
        <label className="field">
          <span className="label">Contenido seleccionable</span>
          <textarea className="fallback-textarea" readOnly value={fallbackContent} />
        </label>
      ) : null}
    </section>
  );
}

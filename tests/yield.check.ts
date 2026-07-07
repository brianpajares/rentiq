import assert from "node:assert/strict";
import { compareYield, defaultAssumptions, defaultUnit, estimateAirbnb, estimateFixed } from "../lib/yield";
import {
  buildChatGPTAnalysisPack,
  buildChatGPTMarkdown,
  decodeBase64Url,
  encodeBase64Url,
  sanitizeUnitForSharing
} from "../lib/chatgpt-export";

const fixed = estimateFixed(defaultUnit, defaultAssumptions);
assert.equal(Math.round(fixed.grossMonthly), 2750);
assert.equal(Math.round(fixed.netMonthly), 2118);

const airbnb = estimateAirbnb(defaultUnit, defaultAssumptions);
assert.equal(Math.round(airbnb.grossMonthly), 4572);
assert.equal(Math.round(airbnb.netMonthly), 1507);

const result = compareYield(defaultUnit, defaultAssumptions);
const airbnbAtBreakEven = estimateAirbnb(defaultUnit, defaultAssumptions, result.breakevenOccupancy);
assert.ok(Math.abs(airbnbAtBreakEven.netMonthly - fixed.netMonthly) < 1);

const encoded = encodeBase64Url({ hello: "RentIQ", value: 42 });
assert.deepEqual(decodeBase64Url(encoded), { hello: "RentIQ", value: 42 });

const sanitizedUnit = sanitizeUnitForSharing(defaultUnit);
assert.equal(sanitizedUnit.ubicacion, "Ubicacion referencial compartida por el usuario");
assert.equal(JSON.stringify(sanitizedUnit).includes(defaultUnit.address), false);

const pack = buildChatGPTAnalysisPack({
  unit: defaultUnit,
  assumptions: defaultAssumptions,
  result,
  confidence: "media",
  privacyMode: "share_link"
});
const markdown = buildChatGPTMarkdown(pack);
assert.ok(markdown.includes("# RentIQ - Paquete de Analisis para ChatGPT"));
assert.ok(markdown.includes("## Instruccion para ChatGPT"));
assert.ok(markdown.includes("## Resultado RentIQ"));
assert.ok(markdown.includes("## Sensibilidad"));
assert.equal(markdown.includes(defaultUnit.address), false);

console.log("yield and chatgpt export checks ok");

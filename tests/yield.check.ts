import assert from "node:assert/strict";
import { compareYield, defaultAssumptions, defaultUnit, estimateAirbnb, estimateFixed } from "../lib/yield";

const fixed = estimateFixed(defaultUnit, defaultAssumptions);
assert.equal(Math.round(fixed.grossMonthly), 2750);
assert.equal(Math.round(fixed.netMonthly), 2118);

const airbnb = estimateAirbnb(defaultUnit, defaultAssumptions);
assert.equal(Math.round(airbnb.grossMonthly), 4572);
assert.equal(Math.round(airbnb.netMonthly), 1507);

const result = compareYield(defaultUnit, defaultAssumptions);
const airbnbAtBreakEven = estimateAirbnb(defaultUnit, defaultAssumptions, result.breakevenOccupancy);
assert.ok(Math.abs(airbnbAtBreakEven.netMonthly - fixed.netMonthly) < 1);

console.log("yield formulas ok");

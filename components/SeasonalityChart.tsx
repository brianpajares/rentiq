"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { seasonality } from "@/lib/market-data";

export function SeasonalityChart() {
  return (
    <div className="grid two">
      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={seasonality}>
            <CartesianGrid stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `${Math.round(Number(value) * 100)}%`} />
            <Tooltip formatter={(value) => `${Math.round(Number(value) * 100)}%`} />
            <Bar dataKey="occupancy" fill="#F43F5E" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={seasonality}>
            <CartesianGrid stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `S/ ${Number(value).toFixed(0)}`} />
            <Line dataKey="adr" stroke="#7C3AED" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

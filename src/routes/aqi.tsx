import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppShell } from "@/components/AppShell";
import { useApp } from "@/lib/i18n";
import { AQI_BY_CITY, CITIES, aqiBand, aqiTrend } from "@/lib/mock-data";
import { BAND_BG, BAND_STROKE } from "@/lib/tokens";

export const Route = createFileRoute("/aqi")({
  head: () => ({
    meta: [
      { title: "Air Quality Monitor — Aman AI" },
      {
        name: "description",
        content: "Live AQI gauge, health recommendations and a 48-hour air quality trend for cities across Pakistan.",
      },
      { property: "og:title", content: "Air Quality Monitor — Aman AI" },
      { property: "og:description", content: "Colour-coded AQI with health advice and 48-hour trend." },
    ],
  }),
  component: AqiPage,
});

function AqiPage() {
  const { t, lang } = useApp();
  const [city, setCity] = useState("Karachi");
  const aqi = AQI_BY_CITY[city] ?? 100;
  const band = aqiBand(aqi);
  const data = useMemo(() => aqiTrend(aqi), [aqi]);

  return (
    <AppShell title={t("aqiMonitor")} back="/home">
      <label className="block text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {t("selectCity")}
      </label>
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="surface tap mt-2 w-full max-w-sm px-3 py-3 text-base outline-none"
      >
        {CITIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
      <div className="surface flex flex-col items-center justify-center p-6">
        <div
          className={`flex size-40 flex-col items-center justify-center rounded-full ${BAND_BG[band.token]}`}
        >
          <span className="text-5xl font-extrabold">{aqi}</span>
          <span className="text-sm font-semibold uppercase tracking-wide">AQI</span>
        </div>
        <p className="mt-4 text-center text-lg font-bold">
          {lang === "en" ? band.label : band.labelUr}
        </p>
      </div>

      <div className="surface p-4 md:p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t("healthAdvice")}
        </h2>
        <p className="mt-2 leading-relaxed">{lang === "en" ? band.advice : band.adviceUr}</p>
      </div>

      </div>

      <div className="surface mt-4 p-4 lg:p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t("trend")}
        </h2>
        <div className="mt-3 h-52 lg:h-80" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 11 }}
                interval={11}
                stroke="var(--muted-foreground)"
              />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  color: "var(--card-foreground)",
                }}
              />
              <Line
                type="monotone"
                dataKey="aqi"
                stroke={BAND_STROKE[band.token]}
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppShell>
  );
}

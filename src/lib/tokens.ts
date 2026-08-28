export const BAND_BG: Record<"safe" | "caution" | "emergency", string> = {
  safe: "bg-safe text-safe-foreground",
  caution: "bg-caution text-caution-foreground",
  emergency: "bg-emergency text-emergency-foreground",
};

export const BAND_SOFT: Record<"safe" | "caution" | "emergency", string> = {
  safe: "bg-safe/15 text-safe",
  caution: "bg-caution/20 text-caution-foreground",
  emergency: "bg-emergency/15 text-emergency",
};

export const BAND_STROKE: Record<"safe" | "caution" | "emergency", string> = {
  safe: "var(--safe)",
  caution: "var(--caution)",
  emergency: "var(--emergency)",
};
